import { StatusLineProps } from 'architeq-library/dist/cjs/types/components/StatusLine/types';

export interface PanelOptions {
  header: string;
  goalsTitle?: string;
  goalsUpdateUrl?: string;
  updateUrl?: string;
}

export const enum Status {
  OK = 'OK',
  WARNING = 'WARNING',
  CRITICAL = 'CRITICAL',
}

export interface DayStatus {
  dayOfWeek: number;
  status: 'FINISHED' | 'IN_PROGRESS' | 'NOT_STARTED' | 'HOLIDAY' | 'BLOCKED' | 'OFF_DAY';
  date?: string;
  events?: InfoLineType[];
}

export interface WeekStatus {
  days: DayStatus[];
}

export type GoalType = {
  id: string | number;
  text: string;
  isCompleted?: boolean;
};

export interface InfoLineType {
  name?: string;
  value?: string;
  icon?: string;
  status?: `${Status}`;
  link?: string;
  button?: boolean;
  newTab?: boolean;
}

export type OptionType = {
  name: string;
  id: string;
};

export type BreadCrumbType = {
  label: string;
  link?: string;
};

export type BreadCrumbsType = {
  items: BreadCrumbType[];
};

export type RangeType = {
  firstId?: string;
  lastId?: string;
  options?: OptionType[];
};

export interface PanelDataType {
  /**
   * @deprecated use title
   */
  name?: string;
  title?: string;
  /**
   * @deprecated use info instead
   */
  team?: string;
  from?: string;
  till?: string;
  importUpdateLink?: string;
  buttonText?: string;
  lastUpdated?: string;
  weeks?: WeekStatus[];
  breadCrumbs?: BreadCrumbType[];
  progress?: {
    label: string;
    percentComplete: number;
  };
  goals?: GoalType[];
  info?: InfoLineType[];
  infoTimeline?: InfoLineType[];
  select?: {
    label: string;
    options: OptionType[];
  };
  range?: RangeType;
  statuses?: StatusLineProps[];
}

export type TableType<T = {}> = {
  columns: any[];
  rows: any[];
  type: 'table';
  name: string;
  meta: {
    custom: T;
  };
};
