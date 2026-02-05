import { Configuration, MetricChatApi } from '@architeq/core-api-client';

import { validateConfiguration } from '../../../api/utils';

import { AiChatClient, SendMessageArgs, SubmitFeedbackArgs } from './types';

/**
 * Creates an adapter for the AI Chat API using @architeq/core-api-client.
 *
 * This adapter wraps the generated MetricChatApi and provides a simplified
 * interface for chat operations including sending messages and submitting feedback.
 *
 * @param config - The API Configuration instance containing basePath and other settings
 * @returns An AiChatClient instance with sendMessage and submitFeedback methods
 *
 * @example
 * ```typescript
 * const config = new Configuration({ basePath: 'https://api.example.com' });
 * const client = createAiChatApiClientAdapter(config);
 *
 * const response = await client.sendMessage({
 *   teamId: 'team-1',
 *   boardType: 'sprint',
 *   metricName: 'burndown',
 *   message: 'What is the current sprint velocity?',
 *   history: [],
 * });
 *
 * await client.submitFeedback({
 *   messageId: response.messageId,
 *   value: 'positive',
 *   comment: 'Very helpful!',
 * });
 * ```
 */
export function createAiChatApiClientAdapter(config: Configuration): AiChatClient {
  validateConfiguration(config, 'MetricChatApi');

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
