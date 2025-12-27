import type {
  ChatMessageResponse,
  ChatFeedbackResponse,
  ChatHistoryMessage,
  ChatFeedbackRequestValueEnum,
  ChatHistoryMessageRoleEnum,
  SendMetricChatMessageRequest,
  SubmitBoardChatFeedbackRequest,
} from '@architeq/core-api-client';

/**
 * API History Message - maps to backend ChatHistoryMessage
 */
export type ApiHistoryMessage = ChatHistoryMessage;

/**
 * Client interface for AI chat operations
 * Allows injection of different API implementations
 */
export interface AiChatClient {
  sendMessage(args: SendMessageArgs, init?: RequestInit): Promise<ChatMessageResponse>;
  submitFeedback(args: SubmitFeedbackArgs, init?: RequestInit): Promise<ChatFeedbackResponse>;
}

export interface SendMessageArgs extends SendMetricChatMessageRequest {}

export interface SubmitFeedbackArgs extends SubmitBoardChatFeedbackRequest {}

/**
 * Enums for AI Chat
 */
export enum EAiChatMode {
  General = 'general',
  AutoSummary = 'autoSummary',
}

export enum EAiChatStatus {
  Ok = 'ok',
  Pending = 'pending',
  Error = 'error',
}

/**
 * View model for chat messages in UI
 */
export interface AiChatMessageVM {
  localId: string; // Client-side ID
  messageId?: string; // Server ID (if received)
  role: ChatHistoryMessageRoleEnum;
  content: string;
  status: EAiChatStatus;
  suggestedPrompts?: string[];
  errorMessage?: string;
  feedback?: {
    value: ChatFeedbackRequestValueEnum;
    comment: string;
  };
}

/**
 * UI Strings for localization
 */
export interface AiChatStrings {
  drawerTitle: string;
  startTitle: string;
  startSubtitle: string;
  inputPlaceholder: string;
  send: string;
  cancel: string;
  retry: string;
  other: string;
  submit: string;
  thumbsUp: string;
  thumbsDown: string;
  feedbackTitleUp: string;
  feedbackTitleDown: string;
  feedbackHintOther: string;
  error404: string;
  error503: string;
  errorDefault: string;
  disclaimer: string;
  autoSummaryMessage: string;
}

/**
 * Last request snapshot for retry
 */
export interface LastRequest {
  message: string;
  historySnapshot: ApiHistoryMessage[];
  kind: 'user' | 'summary';
}
