import { SelectableValue } from '@grafana/data';

export type PeriodType = 'date' | 'string';

export type CumulativeFlowDiagramPeriodData = {
  value: string;
};

export type CumulativeFlowDiagramStructuredData = {
  name: string;
  issuesAmount: Record<string, number[]>;
};

export interface CumulativeFlowDiagramData {
  periodType: PeriodType;
  currentPeriod: string;
  periods: CumulativeFlowDiagramPeriodData[];
  issueTypes: CumulativeFlowDiagramStructuredData[];
}

export type CumulativeFlowDiagramAggregatedData = {
  issuesAmount: Record<string, Record<string, number[]>>;
};

export interface CumulativeFlowDiagramPreparedData {
  periodsData: CumulativeFlowDiagramPeriodData[];
  currentPeriod: string;
  issueOptions: Array<SelectableValue<string>>;
  statusOptions: Array<SelectableValue<string>>;
  periodType: PeriodType;
  data: CumulativeFlowDiagramAggregatedData;
}

export type CumulativeFlowDiagramFilteredData = {
  filteredData: Array<{ data: number[]; name: string }>;
  periods: string[];
};
