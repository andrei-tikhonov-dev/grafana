import { SelectableValue } from '@grafana/data';

export type CumulativeFlowDiagramDayData = {
  date: string;
};

export type CumulativeFlowDiagramStructuredData = {
  name: string;
  issuesAmount: Record<string, number[]>;
};

export interface CumulativeFlowDiagramData {
  currentDate: string;
  days: CumulativeFlowDiagramDayData[];
  issueTypes: CumulativeFlowDiagramStructuredData[];
}

export type CumulativeFlowDiagramAggregatedData = {
  issuesAmount: Record<string, Record<string, number[]>>;
};

export interface CumulativeFlowDiagramPreparedData {
  daysData: CumulativeFlowDiagramDayData[];
  currentDay: string;
  issueOptions: Array<SelectableValue<string>>;
  statusOptions: Array<SelectableValue<string>>;
  data: CumulativeFlowDiagramAggregatedData;
}

export type CumulativeFlowDiagramFilteredData = {
  filteredData: Array<{ data: number[]; name: string }>;
  days: string[];
};
