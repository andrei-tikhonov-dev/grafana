export interface PanelOptions {
  header: string;
  goalsTitle?: string;
  goalsUpdateUrl?: string;
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

type DeprecatedInfoStatusType = {
  message: string;
  status: `${Status}`;
};

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
  weeks?: WeekStatus[];
  breadCrumbs?: BreadCrumbType[];
  progress?: {
    label: string;
    percentComplete: number;
  };
  /**
   * @deprecated use description instead with generated text "completedIssues of totalIssues issues have been completed"
   */
  totalIssues?: number;
  /**
   * @deprecated use description instead with generated text "completedIssues of totalIssues issues have been completed"
   */
  completedIssues?: number;
  /**
   * @deprecated use infoFooter instead
   */
  sprintOnTarget?: DeprecatedInfoStatusType;
  goals?: GoalType[];
  info?: InfoLineType[];
  /**
   * @deprecated use infoFooter instead
   */
  infoStatus?: {
    message: string;
    status: `${Status}`;
  };
  infoFooter?: InfoLineType[];
  infoTimeline?: InfoLineType[];

  select?: {
    label: string;
    options: OptionType[];
  };
  range?: RangeType;
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
