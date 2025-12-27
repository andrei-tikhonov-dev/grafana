import { findNormalizedString } from './strings';

export function getEnumValues<T extends Record<string, string>>(enumObj: T): Array<T[keyof T]> {
  return Object.values(enumObj) as Array<T[keyof T]>;
}

export function findInEnum<T extends Record<string, string>>(
  enumObj: T,
  searchString: string,
  defaultValue: T[keyof T]
): T[keyof T] {
  const enumValues = getEnumValues(enumObj);
  return findNormalizedString(enumValues, searchString, defaultValue);
}

export function getSelectOptionsFromEnum<T extends Record<string, string>>(enumObj: T): Array<{ value: T[keyof T]; label: T[keyof T] }> {
  return getEnumValues(enumObj).map((value) => ({ value, label: value }));
}
