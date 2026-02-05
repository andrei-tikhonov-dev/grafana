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
 *   sendMessage: async () => ({ messageId: '123', content: 'Mock response' }),
 *   submitFeedback: async () => ({ success: true }),
 * };
 * ```
 */
export interface AiChatClient {
  /**
   * Sends a chat message and receives an AI-generated response.
   *
   * @param args - The message request parameters including history
   * @param init - Optional RequestInit for controlling the fetch request (e.g., AbortSignal)
   * @returns Promise resolving to the chat response with AI-generated content
   */
  sendMessage(args: SendMessageArgs, init?: RequestInit): Promise<ChatMessageResponse>;

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
 * Arguments for sending a chat message.
 *
 * Extends the generated SendMetricChatMessageRequest type.
 */
export interface SendMessageArgs extends SendMetricChatMessageRequest {}

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
 * - `AutoSummary`: Automatic summary generation mode
 */
export enum EAiChatMode {
  General = 'general',
  AutoSummary = 'autoSummary',
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
  autoSummaryMessage: string;
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
