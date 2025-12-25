import React, { useMemo } from 'react';

import { useApi } from '../../api';

import { createCoreApiClientAdapter } from './api/createCoreApiClientAdapter';
import { AiChatClient, AiChatStrings, EAiChatMode } from './api/types';
import { AIChatDrawerShell } from './components/AIChatDrawerShell';
import { useAiChatStore } from './store/aiChatStore';
import { DEFAULT_FEEDBACK_REASONS, DEFAULT_STRINGS, DEFAULT_THINKING_STAGES } from './utils/defaults';

export interface UseAiChatDrawerConfig {
  teamId: string;
  project: string;
  client?: AiChatClient;
  startScreen: {
    title: string;
    subtitle: string;
    prompts: string[];
  };
  thinkingStages?: string[];
  feedbackReasons?: {
    up?: string[];
    down?: string[];
  };
  strings?: Partial<AiChatStrings>;
}

export interface UseAiChatDrawerResult {
  openGeneral: () => void;
  openAutoSummary: () => void;
  drawer: React.ReactNode;
}

export function useAiChatDrawer(config: UseAiChatDrawerConfig): UseAiChatDrawerResult {
  const apiContext = useApi();
  const { open } = useAiChatStore();
  const drawerId = useMemo(() => Math.random().toString(36).substring(7), []);

  // Create or use provided client
  const client = useMemo(() => {
    if (config.client) {
      return config.client;
    }
    return createCoreApiClientAdapter(apiContext.config);
  }, [config.client, apiContext.config]);

  // Merge strings with defaults
  const strings: AiChatStrings = useMemo(
    () => ({
      ...DEFAULT_STRINGS,
      ...config.strings,
    }),
    [config.strings]
  );

  // Merge thinking stages with defaults
  const thinkingStages = useMemo(() => config.thinkingStages || DEFAULT_THINKING_STAGES, [config.thinkingStages]);

  // Merge feedback reasons with defaults
  const feedbackReasons = useMemo(
    () => ({
      up: config.feedbackReasons?.up || DEFAULT_FEEDBACK_REASONS.up,
      down: config.feedbackReasons?.down || DEFAULT_FEEDBACK_REASONS.down,
    }),
    [config.feedbackReasons]
  );

  // Handlers
  const openGeneral = () => {
    open(EAiChatMode.General, drawerId);
  };

  const openAutoSummary = () => {
    open(EAiChatMode.AutoSummary, drawerId);
  };

  // Drawer node
  const drawer = (
    <AIChatDrawerShell
      teamId={config.teamId}
      project={config.project}
      client={client}
      thinkingStages={thinkingStages}
      feedbackReasons={feedbackReasons}
      strings={strings}
      startPrompts={config.startScreen.prompts}
      drawerId={drawerId}
    />
  );

  return {
    openGeneral,
    openAutoSummary,
    drawer,
  };
}
