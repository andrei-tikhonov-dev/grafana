import type { AiChatStrings } from '../api/types';

export interface AiChatError {
  status?: number;
  code?: string;
  message: string;
  isAbort?: boolean;
}

interface HttpErrorShape {
  status?: number;
  statusCode?: number;
  body?: { message?: string; error?: string };
  message?: string;
  code?: string;
}

/**
 * Normalize errors from API calls
 */
export function toAiChatError(err: unknown, strings?: AiChatStrings): AiChatError {
  // Check for AbortError
  if (err instanceof Error && err.name === 'AbortError') {
    return {
      message: 'Request was cancelled',
      isAbort: true,
    };
  }

  const fallback = strings?.errorDefault || 'Something went wrong. Please try again.';

  // Check for HTTP error with ErrorResponse
  if (typeof err === 'object' && err !== null) {
    const error = err as HttpErrorShape;

    // Extract status
    const status = error.status || error.statusCode;

    // Extract message and code from ErrorResponse
    const message = error.body?.message || error.message || 'Unknown error';
    const code = error.body?.error || error.code;

    // Map known status codes to user-friendly messages; preserve server message for others
    let userMessage: string;
    if (status === 404) {
      userMessage = strings?.error404 || 'Active sprint not found.';
    } else if (status === 502 || status === 503 || status === 504) {
      userMessage = strings?.error503 || 'AI service unavailable';
    } else if (message && message !== 'Unknown error') {
      userMessage = message;
    } else {
      userMessage = fallback;
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
    message: fallback,
    isAbort: false,
  };
}
