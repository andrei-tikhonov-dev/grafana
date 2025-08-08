import { SelectableValue } from '@grafana/data';

export interface MData {
  periodType: MPeriod;
  currentPeriod: string;
  periods: MPeriodData[];
  issueTypes: MStructuredData[];
}

export type MPeriod = 'date' | 'string';

export type MPeriodData = {
  value: string;
};

export type MStructuredData = {
  name: string;
  issuesAmount: Record<string, number[]>;
};

export type MAggregatedData = {
  issuesAmount: Record<string, Record<string, number[]>>;
};

export interface MPreparedData {
  periodsData: MPeriodData[];
  currentPeriod: string;
  issueOptions: Array<SelectableValue<string>>;
  statusOptions: Array<SelectableValue<string>>;
  periodType: MPeriod;
  data: MAggregatedData;
}

export type MFilteredData = {
  filteredData: Array<{ data: number[]; name: string }>;
  periods: string[];
};
