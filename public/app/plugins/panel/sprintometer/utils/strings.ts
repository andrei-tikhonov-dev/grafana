function normalizeString(str: string): string {
  return str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
}

export function findNormalizedString<T extends string>(array: readonly T[], searchString: string, defaultValue: T): T {
  const normalizedSearch = normalizeString(searchString);

  const found = array.find((item) => normalizeString(item) === normalizedSearch);

  return found ?? defaultValue;
}
