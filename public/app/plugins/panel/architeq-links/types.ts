export interface SimpleOptions {
  header: string;
}

export const enum Status {
  OK = 'OK',
  WARNING = 'WARNING',
  CRITICAL = 'CRITICAL',
}

export interface LinkDataType {
  title: string;
  value: number;
  unit: string;
  url: string;
  description: string;
  icon: string;
  tooltip: string;
  newTab: boolean;
  disabled: boolean;
  status: Status;
}
