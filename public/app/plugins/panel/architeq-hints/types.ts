export interface PanelOptions {}

export const enum Status {
  OK = 'OK',
  WARNING = 'WARNING',
  CRITICAL = 'CRITICAL',
}

export interface InfoLineType {
  name?: string;
  value?: string;
  icon?: string;
  status?: `${Status}`;
  link?: string;
  button?: boolean;
  newTab?: boolean;
}

export interface HintsCustomMetaResponse {
  header: InfoLineType;
  description: string;
  hints: Array<{
    header: InfoLineType;
    items: InfoLineType[];
  }>;
}

type TableType<T = {}> = {
  columns: any[];
  rows: any[];
  type: 'table';
  name: string;
  meta: {
    custom: T;
  };
};

export type HintsTableType = TableType<HintsCustomMetaResponse>;
