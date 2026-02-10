import {
  ChatMessageResponse,
  SendMetricChatMessageBoardTypeEnum,
  SendMetricChatMessageMetricNameEnum,
} from '@architeq/core-api-client';
import { Sparkles } from 'lucide-react';
import React, { useCallback, useMemo, useState } from 'react';

import { Drawer } from '@grafana/ui';

import { useApi } from '../../api';
import { UiButton, UiMarkdown } from '../../components/ui';
import { useDashboardUid } from '../../hooks/useDashboardUid';
import { useGrafanaVariables } from '../../hooks/useGrafanaVariables';
import { createMockAiChatClient } from '../../mock';
import { TAiChatMockOptionsNS, TAiData } from '../../types';
import { asString } from '../../utils/grafana';
import { safeParseJson } from '../../utils/json';

import { createAiChatApiClientAdapter } from './api/createAiChatApiClientAdapter';
import { EAiChatMode } from './api/types';
import { AIChatDrawerShell } from './components/AIChatDrawerShell';
import { useAiChatStore } from './store/aiChatStore';
import {
  DEFAULT_FEEDBACK_REASONS,
  DEFAULT_START_PROMPTS,
  DEFAULT_STRINGS,
  DEFAULT_THINKING_STAGES,
} from './utils/defaults';
import { createDrawerId } from './utils/ids';

export interface UsePanelAiChatConfig {
  panelId: number;
  aiEnabled?: boolean;
  dashboard?: SendMetricChatMessageBoardTypeEnum;
  metric?: SendMetricChatMessageMetricNameEnum;
  aiData?: TAiData;
  mockConfig?: TAiChatMockOptionsNS['aiChatMock'];
}

export interface UsePanelAiChatResult {
  toggle: React.ReactNode;
  drawer: React.ReactNode;
  openGeneral: () => void;
  openAutoSummary: () => void;
}

export function usePanelAiChat({
  panelId,
  aiEnabled,
  dashboard,
  metric,
  aiData,
  mockConfig,
}: UsePanelAiChatConfig): UsePanelAiChatResult {
  const [isAiDataOpen, setIsAiDataOpen] = useState(false);
  const isEnabled = aiEnabled !== false;
  const apiContext = useApi();
  const dashboardUid = useDashboardUid();
  const grafanaVariables = useGrafanaVariables(['team', 'project', 'context']);
  const { open } = useAiChatStore();

  const drawerId = useMemo(() => createDrawerId(), []);
  const instanceId = dashboardUid ? `${dashboardUid}-${panelId}` : String(panelId);
  const teamId = asString(grafanaVariables.team);
  const project = asString(grafanaVariables.project);
  const metricContext = asString(grafanaVariables.context);

  const client = useMemo(() => {
    if (mockConfig?.useMock) {
      return createMockAiChatClient({
        autoSummary: safeParseJson<ChatMessageResponse>(mockConfig.autoSummary),
        general: safeParseJson<ChatMessageResponse[]>(mockConfig.general),
      });
    }
    return createAiChatApiClientAdapter(apiContext.config);
  }, [mockConfig?.useMock, mockConfig?.autoSummary, mockConfig?.general, apiContext.config]);

  const openGeneral = useCallback(() => {
    open(EAiChatMode.General, drawerId, instanceId);
  }, [open, drawerId, instanceId]);

  const openAutoSummary = useCallback(() => {
    open(EAiChatMode.AutoSummary, drawerId, instanceId);
  }, [open, drawerId, instanceId]);

  let toggle: React.ReactNode = null;
  let drawer: React.ReactNode = null;

  if (isEnabled) {
    drawer = (
      <AIChatDrawerShell
        teamId={teamId}
        project={project}
        dashboard={dashboard}
        metric={metric}
        metricContext={metricContext}
        client={client}
        thinkingStages={DEFAULT_THINKING_STAGES}
        feedbackReasons={DEFAULT_FEEDBACK_REASONS}
        strings={DEFAULT_STRINGS}
        startPrompts={DEFAULT_START_PROMPTS}
        drawerId={drawerId}
        instanceId={instanceId}
      />
    );
    toggle = (
      <UiButton onClick={openAutoSummary} variant="ai">
        <Sparkles />
        AI helper
      </UiButton>
    );
  } else if (aiData?.content) {
    toggle = (
      <UiButton onClick={() => setIsAiDataOpen(true)} variant="default">
        <Sparkles />
        AI data
      </UiButton>
    );
    drawer = isAiDataOpen ? (
      <Drawer title={aiData.title || 'AI Insights'} onClose={() => setIsAiDataOpen(false)}>
        <UiMarkdown content={aiData.content} />
      </Drawer>
    ) : null;
  }

  return { toggle, drawer, openGeneral, openAutoSummary };
}
