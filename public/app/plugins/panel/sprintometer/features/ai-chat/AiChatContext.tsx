import { type DashboardPanelSettings, SendMetricChatMessageBoardTypeEnum } from '@architeq/core-api-client';
import { createContext, useContext } from 'react';

import type { AiServiceClient } from './api/aiServiceClient';
import type { PromptConfig } from './api/aiServiceTypes';
import type { AiChatClient, AiChatStrings } from './api/types';

export interface AiChatContextValue {
  instanceId: string;
  client: AiChatClient;
  aiServiceClient: AiServiceClient;
  promptConfig: PromptConfig | null;
  strings: AiChatStrings;
  thinkingStages: string[];
  feedbackReasons: { up: string[]; down: string[] };
  startPrompts: string[];
  teamId: string;
  project: string;
  userId: string;
  boardType: string;
  dashboard?: SendMetricChatMessageBoardTypeEnum;
  metricContext?: string;
  from?: Date;
  to?: Date;
  panelIds?: string[];
  dashboardPanelSettings?: DashboardPanelSettings;
}

const AiChatContext = createContext<AiChatContextValue | null>(null);

export const AiChatProvider = AiChatContext.Provider;

export function useAiChatContext(): AiChatContextValue {
  const ctx = useContext(AiChatContext);
  if (!ctx) {
    throw new Error('useAiChatContext must be used within AiChatProvider');
  }
  return ctx;
}
