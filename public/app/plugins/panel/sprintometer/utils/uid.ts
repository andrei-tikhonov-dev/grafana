const HEX: string[] = Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, '0'));

/**
 * Generate a unique ID using crypto.getRandomValues().
 * Optional prefix for readability (e.g., "local", "task-row").
 */
export function uid(prefix?: string): string {
  const bytes = crypto.getRandomValues(new Uint8Array(8));
  let id = '';
  for (let i = 0; i < 8; i++) {
    id += HEX[bytes[i]];
  }
  return prefix ? `${prefix}-${id}` : id;
}
