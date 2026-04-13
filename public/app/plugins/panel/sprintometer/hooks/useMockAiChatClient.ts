import { ChatMessageResponse } from '@architeq/core-api-client';
import { useMemo } from 'react';

import { AiChatClient } from '../features/ai-chat/api/types';
import { createMockAiChatClient, AiChatMockConfig } from '../mock';
import { TPanelOptions } from '../types';
import { safeParseJson } from '../utils/json';

export function useMockAiChatClient(options: TPanelOptions): AiChatClient | undefined {
  const mockOptions = options.aiChatMock;
  const useMock = mockOptions?.useMock ?? false;
  const presetJson = mockOptions?.preset ?? '';
  const generalJson = mockOptions?.general ?? '';

  return useMemo(() => {
    if (!useMock) {
      return undefined;
    }

    const config: AiChatMockConfig = {
      preset: safeParseJson<ChatMessageResponse>(presetJson),
      general: safeParseJson<ChatMessageResponse[]>(generalJson),
    };

    return createMockAiChatClient(config);
  }, [useMock, presetJson, generalJson]);
}
