export function safeParseJson<T>(jsonString: string | undefined): T | null {
  if (!jsonString || jsonString.trim() === '') {
    return null;
  }
  try {
    return JSON.parse(jsonString) as T;
  } catch {
    return null;
  }
}
