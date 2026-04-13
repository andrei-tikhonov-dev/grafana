import { ChatMessageResponse } from '@architeq/core-api-client';

export interface AiChatMockConfig {
  preset?: ChatMessageResponse | null;
  general?: ChatMessageResponse[] | null;
}
