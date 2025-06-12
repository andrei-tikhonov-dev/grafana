import { SelectableValue } from '@grafana/data';

export enum ValueMode {
  StoryPoints = 'storyPoints',
  IssuesAmount = 'issuesAmount',
}

export type BurndownSummaryType = {
  completed: number;
  remaining: number;
  total: number;
  percentage: number;
};

export type BurndownIssueData = { summary: string; issueKey: string; url: string; status: string };

export type BurndownDayData = {
  date: string;
  isWorking: boolean;
  scopeChanges: BurndownIssueData[];
};

export type BurndownStructuredData = {
  name: string;
  [ValueMode.IssuesAmount]: {
    actual: number[];
    ideal: number[];
  };
  [ValueMode.StoryPoints]: {
    actual: number[];
    ideal: number[];
  };
};

export interface BurndownCustomData {
  currentDate: string;
  days: BurndownDayData[];
  issueTypes: BurndownStructuredData[];
  summary: {
    [ValueMode.StoryPoints]: BurndownSummaryType;
    [ValueMode.IssuesAmount]: BurndownSummaryType;
  };
}

export type BurndownChartAggregatedData = {
  [mode in ValueMode]: Record<string, { actual: number[]; ideal: number[] }>;
};

export type ScopeChanges = {
  [key: string]: Record<string, number>;
};

export type TotalScopeChanges = Record<string, number>;

export interface BurndownPreparedData {
  daysData: BurndownDayData[];
  data: BurndownChartAggregatedData;
  issueOptions: Array<SelectableValue<string>>;
  valueOptions: Array<SelectableValue<string>>;
  currentDay: string;
  scopeChanges: ScopeChanges;
  totalScopeChanges: TotalScopeChanges;
  summary: {
    issuesAmount: BurndownSummaryType;
    storyPoints: BurndownSummaryType;
  };
}

export type NonWorkingDays = Array<[string, string]>;

export type BurndownChartFilteredData = {
  actual: number[];
  ideal: number[];
  days: string[];
  nonWorkingDays: NonWorkingDays;
};
