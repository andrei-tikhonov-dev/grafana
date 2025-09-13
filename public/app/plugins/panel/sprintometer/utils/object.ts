export function isObject(value: unknown): value is object {
  return typeof value === 'object' && value !== null;
}

export function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && value.constructor === Object;
}

export function isObjectOfType<T extends Record<string, unknown>>(value: unknown): value is T {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function isNonEmptyObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value) && Object.keys(value).length > 0;
}
