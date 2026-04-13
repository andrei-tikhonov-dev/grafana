import {
  type DashboardPanelSettings,
  ChatMessageResponse,
  SendMetricChatMessageBoardTypeEnum,
  SendMetricChatMessageMetricNameEnum,
} from '@architeq/core-api-client';
import React, { useCallback, useMemo } from 'react';

import { config, getTemplateSrv } from '@grafana/runtime';

import { useApi } from '../../api';
import {
  useDashboardPanelSettings,
  type DashboardPanelSettings as HookDashboardPanelSettings,
} from '../../hooks/useDashboardPanelSettings';
import { useGrafanaVariables } from '../../hooks/useGrafanaVariables';
import { createMockAiChatClient } from '../../mock';
import { EPanelType, TAiChatMockOptionsNS } from '../../types';
import { asString } from '../../utils/grafana';
import { safeParseJson } from '../../utils/json';

import { AiChatContextValue } from './AiChatContext';
import { createAiChatApiClientAdapter } from './api/createAiChatApiClientAdapter';
import { EAiChatMode } from './api/types';
import { AiChatDrawer } from './components/AiChatDrawer';
import { useAiServiceClient } from './hooks/useAiServiceClient';
import { usePresetQueries } from './hooks/usePresetQueries';
import { useAiChatStore } from './store/aiChatStore';
import { usePromptEditorStore } from './store/promptEditorStore';
import { createChatScopeId, createCooldownKey, isBannerEligible, recordBannerInteraction } from './utils/cooldown';
import { DEFAULT_FEEDBACK_REASONS, DEFAULT_STRINGS, DEFAULT_THINKING_STAGES } from './utils/defaults';

const EMPTY_PANEL_IDS: string[] = [];
const GRAFANA_VAR_NAMES: string[] = ['team', 'project', 'context'];
const DEFAULT_BOARD_TYPE = SendMetricChatMessageBoardTypeEnum.Daily;

/**
 * Maps hook's PascalCase panel type keys to the API's camelCase property names.
 */
function toApiPanelSettings(settings: HookDashboardPanelSettings | undefined): DashboardPanelSettings | undefined {
  if (!settings) {
    return undefined;
  }
  return {
    burndown: settings[EPanelType.BurndownChart],
    cfd: settings[EPanelType.CumulativeFlowDiagram],
    issueMap: settings[EPanelType.IssueMap],
    plannerBoard: settings[EPanelType.PlannerBoard],
  };
}

export interface UsePanelAiChatConfig {
  panelId: number;
  aiEnabled?: boolean;
  dashboard?: SendMetricChatMessageBoardTypeEnum;
  metric?: SendMetricChatMessageMetricNameEnum;
  mockConfig?: TAiChatMockOptionsNS['aiChatMock'];
  panelIds?: string[];
}

export interface UsePanelAiChatResult {
  drawer: React.ReactNode;
  openGeneral: () => void;
  openWithQuery: (query: string) => void;
}

export function usePanelAiChat({
  panelId,
  aiEnabled,
  dashboard,
  metric,
  mockConfig,
  panelIds,
}: UsePanelAiChatConfig): UsePanelAiChatResult {
  const isEnabled = aiEnabled !== false;
  const apiContext = useApi();
  const grafanaVariables = useGrafanaVariables(GRAFANA_VAR_NAMES);
  const open = useAiChatStore((s) => s.open);
  const setPendingQuery = useAiChatStore((s) => s.setPendingQuery);

  const teamId = asString(grafanaVariables.team);
  const project = asString(grafanaVariables.project);
  const metricContext = asString(grafanaVariables.context);
  const userId = String(config.bootData?.user?.id ?? '');
  const boardType = dashboard ?? DEFAULT_BOARD_TYPE;

  // instanceId = shared scope for message history (same across panels with same scope)
  const instanceId = useMemo(
    () => createChatScopeId(userId, teamId, boardType, project),
    [userId, teamId, boardType, project]
  );
  // panelInstanceId = unique per panel, prevents multiple drawers from opening
  const panelInstanceId = useMemo(() => `${instanceId}:${panelId}`, [instanceId, panelId]);

  const periodFrom = getTemplateSrv().replace('${__from:date:iso}');
  const periodTo = getTemplateSrv().replace('${__to:date:iso}');

  const hookPanelSettings = useDashboardPanelSettings();
  const dashboardPanelSettings = useMemo(() => toApiPanelSettings(hookPanelSettings), [hookPanelSettings]);

  const client = useMemo(() => {
    if (mockConfig?.useMock) {
      return createMockAiChatClient({
        preset: safeParseJson<ChatMessageResponse>(mockConfig.preset),
        general: safeParseJson<ChatMessageResponse[]>(mockConfig.general),
      });
    }
    return createAiChatApiClientAdapter(apiContext.config);
  }, [mockConfig?.useMock, mockConfig?.preset, mockConfig?.general, apiContext.config]);

  const aiServiceClient = useAiServiceClient(apiContext.aiBasePath ?? '');
  const aiServiceCtx = useMemo(() => ({ teamId, boardType, userId }), [teamId, boardType, userId]);
  const presetQueries = usePresetQueries(aiServiceClient, aiServiceCtx, panelIds ?? EMPTY_PANEL_IDS);
  const promptConfig = usePromptEditorStore((s) => s.promptConfig);

  const incrementCooldownOnNewChat = useCallback(() => {
    const isNewChat = !useAiChatStore.getState().chats[instanceId];
    if (!isNewChat) {
      return;
    }
    const cooldownKey = createCooldownKey(userId, teamId, boardType, project);
    // Only increment while cooldown is active (count < threshold).
    // Once threshold is reached, banner becomes eligible — stop counting.
    if (!isBannerEligible(cooldownKey)) {
      recordBannerInteraction(cooldownKey);
    }
  }, [instanceId, userId, teamId, boardType, project]);

  const openGeneral = useCallback(() => {
    if (!isEnabled) {
      return;
    }
    incrementCooldownOnNewChat();
    open(EAiChatMode.General, panelInstanceId, instanceId);
  }, [isEnabled, open, panelInstanceId, instanceId, incrementCooldownOnNewChat]);

  const openWithQuery = useCallback(
    (query: string) => {
      if (!isEnabled) {
        return;
      }
      incrementCooldownOnNewChat();
      open(EAiChatMode.Preset, panelInstanceId, instanceId, query);
    },
    [isEnabled, open, panelInstanceId, instanceId, incrementCooldownOnNewChat]
  );

  const isOpen = useAiChatStore((s) => s.activeInstanceId === panelInstanceId);
  const close = useAiChatStore((s) => s.close);

  const contextValue = useMemo<AiChatContextValue>(
    () => ({
      instanceId,
      client,
      aiServiceClient,
      promptConfig,
      strings: DEFAULT_STRINGS,
      thinkingStages: DEFAULT_THINKING_STAGES,
      feedbackReasons: DEFAULT_FEEDBACK_REASONS,
      startPrompts: presetQueries.data,
      teamId,
      project,
      userId,
      boardType,
      dashboard,
      metric,
      metricContext,
      from: periodFrom,
      to: periodTo,
      panelIds,
      dashboardPanelSettings,
    }),
    [
      instanceId,
      client,
      aiServiceClient,
      promptConfig,
      presetQueries.data,
      teamId,
      project,
      userId,
      boardType,
      dashboard,
      metric,
      metricContext,
      periodFrom,
      periodTo,
      panelIds,
      dashboardPanelSettings,
    ]
  );

  const drawer =
    isEnabled && isOpen ? (
      <AiChatDrawer
        contextValue={contextValue}
        instanceId={instanceId}
        presetQueries={presetQueries.data}
        onPresetSelect={setPendingQuery}
        onClose={close}
      />
    ) : null;

  return { drawer, openGeneral, openWithQuery };
}
