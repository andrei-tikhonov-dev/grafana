import { AIChatApi, Configuration } from '@architeq/core-api-client';

import { AiChatClient, SendMessageArgs, SubmitFeedbackArgs } from './types';

/**
 * Create adapter for @architeq/core-api-client
 */
export function createCoreApiClientAdapter(config: Configuration): AiChatClient {
  const api = new AIChatApi(config);

  return {
    sendMessage: async (args: SendMessageArgs, init?: RequestInit) => {
      return api.sendChatMessage(args, init);
    },
    submitFeedback: async (args: SubmitFeedbackArgs, init?: RequestInit) => {
      return api.submitChatFeedback(args, init);
    },
  };
}
