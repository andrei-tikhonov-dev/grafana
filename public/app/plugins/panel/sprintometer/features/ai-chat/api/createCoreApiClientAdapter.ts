import { MetricChatApi, Configuration } from '@architeq/core-api-client';

import { AiChatClient, SendMessageArgs, SubmitFeedbackArgs } from './types';

/**
 * Create adapter for @architeq/core-api-client
 */
export function createCoreApiClientAdapter(config: Configuration): AiChatClient {
  const api = new MetricChatApi(config);

  return {
    sendMessage: async (args: SendMessageArgs, init?: RequestInit) => {
      return api.sendMetricChatMessage(args, init);
    },
    submitFeedback: async (args: SubmitFeedbackArgs, init?: RequestInit) => {
      return api.submitBoardChatFeedback(args, init);
    },
  };
}
