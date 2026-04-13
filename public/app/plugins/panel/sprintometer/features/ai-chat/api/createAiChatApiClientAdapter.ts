import { BoardChatApi, Configuration, MetricChatApi } from '@architeq/core-api-client';

import { validateConfiguration } from '../../../api/utils';

import type { AiChatClient, SendBoardMessageArgs, SubmitFeedbackArgs } from './types';

/**
 * Creates an adapter for the AI Chat API using @architeq/core-api-client.
 *
 * Wraps BoardChatApi (v3) for sending messages and MetricChatApi for
 * submitting feedback (the feedback endpoint physically lives in
 * MetricChatApi in the generated client).
 *
 * @param config - The API Configuration instance containing basePath and other settings
 * @returns An AiChatClient instance with sendBoardMessage and submitFeedback methods
 */
export function createAiChatApiClientAdapter(config: Configuration): AiChatClient {
  validateConfiguration(config, 'AiChatClient');

  const metricChatApi = new MetricChatApi(config);
  const boardChatApi = new BoardChatApi(config);

  return {
    sendBoardMessage: async (args: SendBoardMessageArgs, init?: RequestInit) => {
      return boardChatApi.sendBoardChatMessage(args, init);
    },
    submitFeedback: async (args: SubmitFeedbackArgs, init?: RequestInit) => {
      return metricChatApi.submitBoardChatFeedback(args, init);
    },
  };
}
