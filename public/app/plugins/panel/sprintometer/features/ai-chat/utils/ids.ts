/**
 * Generate a unique local message ID for client-side messages
 */
export function createLocalMessageId(): string {
    return `local-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}
