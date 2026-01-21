import { ChatMessageResponse } from '@architeq/core-api-client';
import { useMemo } from 'react';

import { AiChatClient } from '../features/ai-chat/api/types';
import { createMockAiChatClient, AiChatMockConfig } from '../mock';
import { TPanelOptions } from '../types';

function safeParseJson<T>(jsonString: string | undefined): T | null {
  if (!jsonString || jsonString.trim() === '') {
    return null;
  }
  try {
    return JSON.parse(jsonString) as T;
  } catch {
    return null;
  }
}

export function useMockAiChatClient(options: TPanelOptions): AiChatClient | undefined {
  const mockOptions = options.aiChatMock;
  const useMock = mockOptions?.useMock ?? false;
  const autoSummaryJson = mockOptions?.autoSummary ?? '';
  const generalJson = mockOptions?.general ?? '';

  return useMemo(() => {
    if (!useMock) {
      return undefined;
    }

    const config: AiChatMockConfig = {
      autoSummary: safeParseJson<ChatMessageResponse>(autoSummaryJson),
      general: safeParseJson<ChatMessageResponse[]>(generalJson),
    };

    return createMockAiChatClient(config);
  }, [useMock, autoSummaryJson, generalJson]);
}
