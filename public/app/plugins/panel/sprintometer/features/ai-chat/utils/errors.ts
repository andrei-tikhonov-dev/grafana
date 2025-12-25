export interface AiChatError {
  status?: number;
  code?: string;
  message: string;
  isAbort?: boolean;
}

/**
 * Normalize errors from API calls
 */
export function toAiChatError(err: unknown): AiChatError {
  // Check for AbortError
  if (err instanceof Error && err.name === 'AbortError') {
    return {
      message: 'Request was cancelled',
      isAbort: true,
    };
  }

  // Check for HTTP error with ErrorResponse
  if (typeof err === 'object' && err !== null) {
    const error = err as any;

    // Extract status
    const status = error.status || error.statusCode;

    // Extract message and code from ErrorResponse
    const message = error.body?.message || error.message || 'Unknown error';
    const code = error.body?.error || error.code;

    // Map status codes to user-friendly messages
    let userMessage = message;
    if (status === 404) {
      userMessage = 'Active sprint not found.';
    } else if (status === 503 || status === 502 || status === 504) {
      userMessage = 'AI service unavailable';
    } else {
      userMessage = 'Something went wrong. Please try again.';
    }

    return {
      status,
      code,
      message: userMessage,
      isAbort: false,
    };
  }

  // Fallback
  return {
    message: 'Something went wrong. Please try again.',
    isAbort: false,
  };
}
