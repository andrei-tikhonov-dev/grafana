import { SelectableValue } from '@grafana/data';

export interface MBurndownCustomData {
  currentDate: string;
  days: MDayData[];
  issueTypes: MStructuredData[];
  summary: {
    [EValueMode.StoryPoints]: MSummary;
    [EValueMode.IssuesAmount]: MSummary;
  };
}

export enum EValueMode {
  StoryPoints = 'storyPoints',
  IssuesAmount = 'issuesAmount',
}

export type MSummary = {
  completed: number;
  remaining: number;
  total: number;
  percentage: number;
};

export type MIssueData = { summary: string; issueKey: string; url: string; status: string };

export type MDayData = {
  date: string;
  isWorking: boolean;
  scopeChanges: MIssueData[];
};

export type MStructuredData = {
  name: string;
  [EValueMode.IssuesAmount]: {
    actual: number[];
    ideal: number[];
  };
  [EValueMode.StoryPoints]: {
    actual: number[];
    ideal: number[];
  };
};

export type MAggregatedData = {
  [mode in EValueMode]: Record<string, { actual: number[]; ideal: number[] }>;
};

export type MScopeChanges = {
  [key: string]: Record<string, number>;
};

export type MTotalScopeChanges = Record<string, number>;

export interface MPreparedData {
  daysData: MDayData[];
  data: MAggregatedData;
  issueOptions: Array<SelectableValue<string>>;
  valueOptions: Array<SelectableValue<string>>;
  currentDay: string;
  scopeChanges: MScopeChanges;
  totalScopeChanges: MTotalScopeChanges;
  summary: {
    issuesAmount: MSummary;
    storyPoints: MSummary;
  };
}

export type MNonWorkingDays = Array<[string, string]>;

export type MFilteredData = {
  actual: number[];
  ideal: number[];
  days: string[];
  nonWorkingDays: MNonWorkingDays;
};
