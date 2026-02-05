/**
 * Generate a unique local message ID for client-side messages
 */
export function createLocalMessageId(): string {
  return `local-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Generate a unique drawer ID for AI chat drawer instances
 */
export function createDrawerId(): string {
  return Math.random().toString(36).substring(2, 9);
}
