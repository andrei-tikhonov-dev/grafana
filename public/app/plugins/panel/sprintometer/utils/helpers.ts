export function toObjectKey<T>(str: string): T {
  if (!str || !str.trim()) {
    return '' as T;
  }

  const words = str.trim().toLowerCase().split(/\s+/);

  const camelCase =
    words[0] +
    words
      .slice(1)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');

  return camelCase as T;
}

export function capitalize(str: string): string {
  if (!str) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
