import { TAiData } from '../../types';

export interface MData {
  periodType: MPeriod;
  currentPeriod: string;
  periods: MPeriodData[];
  issueTypes: MStructuredData[];
  ai?: TAiData;
}

export enum EPeriod {
  Date = 'date',
  String = 'string',
}

export type MPeriod = EPeriod;

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
  issueOptions: Array<{ label: string; value: string }>;
  periodType: MPeriod;
  data: MAggregatedData;
}

export type MFilteredData = {
  filteredData: Array<{ data: number[]; name: string }>;
  periods: string[];
};
