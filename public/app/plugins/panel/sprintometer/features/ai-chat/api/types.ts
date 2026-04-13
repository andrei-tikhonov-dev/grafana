import {
  type ChatMessageResponse,
  type ChatFeedbackResponse,
  type ChatHistoryMessage,
  type ChatFeedbackRequestValueEnum,
  type ChatHistoryMessageRoleEnum,
  type SendBoardChatMessageRequest,
  type SubmitBoardChatFeedbackRequest,
  SendMetricChatMessageBoardTypeEnum,
  SendBoardChatMessageBoardTypeEnum,
  SubmitBoardChatFeedbackBoardTypeEnum,
} from '@architeq/core-api-client';

/**
 * API History Message - maps to backend ChatHistoryMessage.
 *
 * Represents a single message in the chat history for API communication.
 */
export type ApiHistoryMessage = ChatHistoryMessage;

/**
 * Client interface for AI chat operations.
 *
 * This interface allows injection of different API implementations,
 * enabling mock clients for testing and development.
 *
 * @example
 * ```typescript
 * // Using the real API client
 * const realClient = createAiChatApiClientAdapter(config);
 *
 * // Using a mock client for testing
 * const mockClient: AiChatClient = {
 *   sendBoardMessage: async () => ({ messageId: '123', content: 'Mock response' }),
 *   submitFeedback: async () => ({ success: true }),
 * };
 * ```
 */
export interface AiChatClient {
  /**
   * Sends a board-level chat message (v3 API, no metricName required).
   *
   * @param args - The board chat request parameters
   * @param init - Optional RequestInit for controlling the fetch request (e.g., AbortSignal)
   * @returns Promise resolving to the chat response with AI-generated content
   */
  sendBoardMessage(args: SendBoardMessageArgs, init?: RequestInit): Promise<ChatMessageResponse>;

  /**
   * Submits user feedback for a specific chat message.
   *
   * @param args - The feedback request parameters
   * @param init - Optional RequestInit for controlling the fetch request
   * @returns Promise resolving to the feedback submission result
   */
  submitFeedback(args: SubmitFeedbackArgs, init?: RequestInit): Promise<ChatFeedbackResponse>;
}

/**
 * Arguments for sending a board-level chat message (v3).
 *
 * Extends the generated SendBoardChatMessageRequest type.
 */
export interface SendBoardMessageArgs extends SendBoardChatMessageRequest {}

/**
 * Arguments for submitting chat feedback.
 *
 * Extends the generated SubmitBoardChatFeedbackRequest type.
 */
export interface SubmitFeedbackArgs extends SubmitBoardChatFeedbackRequest {}

/**
 * Chat operation modes.
 *
 * - `General`: Standard conversational mode for user questions
 * - `Preset`: Preset query mode (opens with a predefined question)
 */
export enum EAiChatMode {
  General = 'general',
  Preset = 'preset',
}

/**
 * Status of a chat message or operation.
 *
 * - `Ok`: Operation completed successfully
 * - `Pending`: Operation is in progress
 * - `Error`: Operation failed with an error
 */
export enum EAiChatStatus {
  Ok = 'ok',
  Pending = 'pending',
  Error = 'error',
}

/**
 * View model for chat messages in UI.
 *
 * Represents the complete state of a message as displayed in the chat interface,
 * including both client-side state and server-received data.
 */
export interface AiChatMessageVM {
  /** Client-side unique identifier for optimistic updates */
  localId: string;

  /** Server-assigned message ID (populated after successful send) */
  messageId?: string;

  /** The role of the message sender (user or assistant) */
  role: ChatHistoryMessageRoleEnum;

  /** The message content (text or markdown) */
  content: string;

  /** Current status of the message */
  status: EAiChatStatus;

  /** Suggested follow-up prompts (for assistant messages) */
  suggestedPrompts?: string[];

  /** Error message if status is Error */
  errorMessage?: string;

  /** User feedback for this message */
  feedback?: {
    /** The feedback value (positive/negative) */
    value: ChatFeedbackRequestValueEnum;
    /** Optional comment explaining the feedback */
    comment: string;
  };
}

/**
 * Localization strings for the AI Chat UI.
 *
 * Contains all user-facing text strings used in the chat interface.
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
  presetFallbackMessage: string;
  copyToClipboard: string;
  feedbackPlaceholder: string;
}

/**
 * Snapshot of the last request for retry functionality.
 *
 * Stores the state needed to retry a failed request.
 */
export interface LastRequest {
  /** The message text that was sent */
  message: string;

  /** Snapshot of chat history at the time of the request */
  historySnapshot: ApiHistoryMessage[];

  /** The type of request (user message or auto-summary) */
  kind: 'user' | 'summary';
}

/**
 * Both enums are generated from the same OpenAPI enum with identical values
 * (daily | planning | review | dora). This helper bridges the nominally-distinct types.
 */
export function toFeedbackBoardType(
  boardType: SendMetricChatMessageBoardTypeEnum
): SubmitBoardChatFeedbackBoardTypeEnum {
  return boardType as unknown as SubmitBoardChatFeedbackBoardTypeEnum;
}

/**
 * Bridges SendBoardChatMessageBoardTypeEnum to SendMetricChatMessageBoardTypeEnum.
 * The v3 board type enum includes `historical`, which the v2 metric enum does not have.
 */
export function toBoardChatBoardType(
  boardType: SendMetricChatMessageBoardTypeEnum | string
): SendBoardChatMessageBoardTypeEnum {
  return boardType as unknown as SendBoardChatMessageBoardTypeEnum;
}
