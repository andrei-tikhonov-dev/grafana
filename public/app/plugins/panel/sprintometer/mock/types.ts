import { ChatMessageResponse } from '@architeq/core-api-client';

export interface AiChatMockConfig {
  autoSummary?: ChatMessageResponse | null;
  general?: ChatMessageResponse[] | null;
}
