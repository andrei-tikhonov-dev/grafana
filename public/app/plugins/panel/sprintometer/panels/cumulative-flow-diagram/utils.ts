import type { EChartsOption, LineSeriesOption } from 'echarts';

import { theme } from '../../theme';
import { aggregateValues } from '../../utils/arrays';
import { formatDate } from '../../utils/dateTime';
import { getCurrentPeriodSeries } from '../../utils/echarts';

import {
  MAggregatedData,
  MFilteredData,
  MData,
  MPeriodData,
  MPreparedData,
  MStructuredData,
  MPeriod,
  EPeriod,
} from './types';

const textColor = theme.colors.semantic.text;

const transformStructuredDataToAggregated = (data: MStructuredData[]): MAggregatedData => ({
  issuesAmount: Object.fromEntries(data.map((item) => [item.name, item.issuesAmount])),
});

const formatPeriodValue = (value: string, periodType: MPeriod): string =>
  periodType === 'date' ? formatDate(value) : value;

export function prepareData({ periods, issueTypes, currentPeriod, periodType }: MData): MPreparedData {
  return {
    currentPeriod: periodType === EPeriod.Date ? formatDate(currentPeriod) : currentPeriod,
    data: transformStructuredDataToAggregated(issueTypes),
    periodType,
    periodsData: periods,
    issueOptions: issueTypes.map(({ name }) => ({ label: name, value: name })),
  };
}

interface FilterDataArgs {
  periodsData: MPeriodData[];
  data: MAggregatedData;
  selectedIssues: string[];
  periodType: MPeriod;
}

export const filterCumulativeFlowDiagramData = ({
  data,
  selectedIssues,
  periodsData,
  periodType,
}: FilterDataArgs): MFilteredData => {
  const keysToUse =
    selectedIssues.length === 0
      ? Object.keys(data.issuesAmount)
      : selectedIssues.filter((name) => data.issuesAmount[name]);

  const periods = periodsData.map(({ value }) => formatPeriodValue(value, periodType));

  if (keysToUse.length === 0) {
    return { filteredData: [], periods };
  }

  const dataKeys = Array.from(new Set(keysToUse.flatMap((name) => Object.keys(data.issuesAmount[name]))));

  const filteredData = dataKeys.map((dataKey) => {
    const dataArrays = keysToUse
      .filter((name) => data.issuesAmount[name][dataKey])
      .map((name) => data.issuesAmount[name][dataKey]);

    return {
      data: dataArrays.length === 1 ? dataArrays[0] : aggregateValues(dataArrays),
      name: dataKey,
    };
  });

  return { filteredData, periods };
};

const createLineSeries = (data: number[], name: string, isStacked: boolean): LineSeriesOption => ({
  name,
  data,
  type: 'line',
  ...(isStacked && { stack: 'Total' }),
  smooth: true,
  areaStyle: { opacity: 0.8 },
  emphasis: { focus: 'series' },
});

interface DiagramOptions {
  data: Array<{ data: number[]; name: string }>;
  periods: string[];
  currentPeriod: string;
  selected: Record<string, boolean>;
  isStacked: boolean;
}

const isCurrentPeriodVisible = (periods: string[], currentPeriod: string): boolean =>
  periods.includes(currentPeriod) && currentPeriod !== periods[periods.length - 1];

export const getCumulativeFlowDiagramOptions = ({
  data,
  periods,
  currentPeriod,
  selected,
  isStacked,
}: DiagramOptions): EChartsOption => ({
  backgroundColor: 'transparent',
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'line' },
  },
  legend: {
    bottom: 0,
    left: 'center',
    orient: 'horizontal',
    data: data.map(({ name }) => name),
    selected,
    textStyle: { color: textColor },
  },
  grid: {
    top: 20,
    left: 10,
    right: 20,
    bottom: 40,
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: periods,
    axisLabel: { color: textColor },
  },
  yAxis: {
    type: 'value',
    name: '',
    axisLine: {
      show: true,
      lineStyle: { color: textColor, type: 'solid' },
    },
    axisLabel: {
      color: textColor,
      formatter: (value: number) => (value === 0 ? '' : value.toString()),
    },
  },
  series: [
    ...data.map(({ data: values, name }) => createLineSeries(values, name, isStacked)),
    getCurrentPeriodSeries(isCurrentPeriodVisible(periods, currentPeriod) ? currentPeriod : undefined),
  ],
});
