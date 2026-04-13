import { ChatMessageResponse, ChatFeedbackResponse } from '@architeq/core-api-client';

import { AiChatClient, SendBoardMessageArgs, SubmitFeedbackArgs } from '../features/ai-chat/api/types';

import { DEFAULT_PRESET_RESPONSE, DEFAULT_GENERAL_RESPONSES } from './defaultMockResponses';
import { AiChatMockConfig } from './types';

const MOCK_DELAY_MS = 500;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function createMockAiChatClient(config: AiChatMockConfig): AiChatClient {
  let generalMessageIndex = 0;

  const presetResponse = config.preset ?? DEFAULT_PRESET_RESPONSE;
  const generalResponses = config.general ?? DEFAULT_GENERAL_RESPONSES;

  const submitFeedback = async (_args: SubmitFeedbackArgs, _init?: RequestInit): Promise<ChatFeedbackResponse> => {
    await delay(MOCK_DELAY_MS);
    return { success: true };
  };

  const sendBoardMessage = async (args: SendBoardMessageArgs, _init?: RequestInit): Promise<ChatMessageResponse> => {
    await delay(MOCK_DELAY_MS);

    const message = args.boardChatMessageRequest?.message?.trim().toLowerCase() ?? '';

    if (!message || message === 'analyze status') {
      return presetResponse;
    }

    if (generalResponses.length === 0) {
      return presetResponse;
    }

    const response = generalResponses[generalMessageIndex % generalResponses.length];
    generalMessageIndex++;

    return response;
  };

  return {
    sendBoardMessage,
    submitFeedback,
  };
}
