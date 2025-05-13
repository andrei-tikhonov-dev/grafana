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

export type BurndownIssueData = { summary: string; issueKey: string; url: string; status: 'added' | 'removed' };

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

export interface BurndownPreparedData {
  days: string[];
  data: BurndownChartAggregatedData;
  issueOptions: Array<SelectableValue<string>>;
  valueOptions: Array<SelectableValue<string>>;
  currentDay: string;
  summary: {
    issuesAmount: BurndownSummaryType;
    storyPoints: BurndownSummaryType;
  };
}

export type BurndownChartFilteredData = {
  actual: number[];
  ideal: number[];
};
