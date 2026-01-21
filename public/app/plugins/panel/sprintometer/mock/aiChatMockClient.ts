import { ChatMessageResponse, ChatFeedbackResponse } from '@architeq/core-api-client';

import { AiChatClient, SendMessageArgs, SubmitFeedbackArgs } from '../features/ai-chat/api/types';

import { DEFAULT_AUTO_SUMMARY_RESPONSE, DEFAULT_GENERAL_RESPONSES } from './defaultMockResponses';
import { AiChatMockConfig } from './types';

const MOCK_DELAY_MS = 500;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function createMockAiChatClient(config: AiChatMockConfig): AiChatClient {
  let generalMessageIndex = 0;

  const autoSummaryResponse = config.autoSummary ?? DEFAULT_AUTO_SUMMARY_RESPONSE;
  const generalResponses = config.general ?? DEFAULT_GENERAL_RESPONSES;

  const sendMessage = async (args: SendMessageArgs, _init?: RequestInit): Promise<ChatMessageResponse> => {
    await delay(MOCK_DELAY_MS);

    const message = args.chatMessageRequest?.message?.trim().toLowerCase() ?? '';

    // Auto-summary mode: empty message or "Analyze status"
    if (!message || message === 'analyze status') {
      return autoSummaryResponse;
    }

    // General mode: cycle through responses
    if (generalResponses.length === 0) {
      return autoSummaryResponse;
    }

    const response = generalResponses[generalMessageIndex % generalResponses.length];
    generalMessageIndex++;

    return response;
  };

  const submitFeedback = async (_args: SubmitFeedbackArgs, _init?: RequestInit): Promise<ChatFeedbackResponse> => {
    await delay(MOCK_DELAY_MS);
    return { success: true };
  };

  return {
    sendMessage,
    submitFeedback,
  };
}
