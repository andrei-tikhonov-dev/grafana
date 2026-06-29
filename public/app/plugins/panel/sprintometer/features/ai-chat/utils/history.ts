import { EAiChatStatus, type ApiHistoryMessage, type AiChatMessageVM } from '../api/types';

/**
 * Build API history from view model messages
 * Only includes messages with status 'ok' (excludes pending/error)
 */
export function buildApiHistory(messages: AiChatMessageVM[]): ApiHistoryMessage[] {
  return messages
    .filter((msg) => msg.status === EAiChatStatus.Ok)
    .map((msg) => ({
      id: msg.messageId || msg.localId,
      role: msg.role,
      content: msg.content,
    }));
}
