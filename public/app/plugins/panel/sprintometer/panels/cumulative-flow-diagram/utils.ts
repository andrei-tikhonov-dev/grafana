import * as echarts from 'echarts';

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

const transformStructuredDataToAggregated = (data: MStructuredData[]): MAggregatedData => {
  const result: MAggregatedData = {
    issuesAmount: {},
  };

  data.forEach((item) => {
    result.issuesAmount[item.name] = item.issuesAmount;
  });

  return result;
};

export function prepareData({ periods, issueTypes, currentPeriod, periodType }: MData): MPreparedData {
  const issueOptions = issueTypes.map(({ name }) => ({
    label: name,
    value: name,
  }));

  return {
    currentPeriod: periodType === EPeriod.Date ? formatDate(currentPeriod) : currentPeriod,
    data: transformStructuredDataToAggregated(issueTypes),
    periodType,
    periodsData: periods,
    issueOptions,
  };
}

type FilterDataArgs = {
  periodsData: MPeriodData[];
  data: MAggregatedData;
  selectedIssues: string[];
  periodType: MPeriod;
};

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

  const periods = periodsData.map(({ value }) => (periodType === 'date' ? formatDate(value) : value));

  if (keysToUse.length === 0) {
    return { filteredData: [], periods: periods };
  }

  const dataKeys = Array.from(new Set(keysToUse.flatMap((name) => Object.keys(data.issuesAmount[name]))));

  const filteredData = dataKeys.map((dataKey) => {
    const dataArrays = keysToUse
      .filter((name) => data.issuesAmount[name][dataKey]) // фильтруем только те, у которых есть этот dataKey
      .map((name) => data.issuesAmount[name][dataKey]);

    const aggregatedData = dataArrays.length === 1 ? dataArrays[0] : aggregateValues(dataArrays);

    return {
      data: aggregatedData,
      name: dataKey,
    };
  });

  return { filteredData, periods: periods };
};

const formatSeries = (data: number[], name: string, isStacked: boolean): any => {
  return {
    name,
    data,
    type: 'line',
    ...(isStacked && { stack: 'Total' }),
    smooth: true,
    areaStyle: {
      opacity: 0.8,
    },
    emphasis: {
      focus: 'series',
    },
  };
};

interface DiagramOptions {
  data: Array<{ data: number[]; name: string }>;
  periods: string[];
  currentPeriod: string;
  selected: Record<string, boolean>;
  isStacked: boolean;
}

export const getCumulativeFlowDiagramOptions = ({
  data,
  periods,
  currentPeriod,
  selected,
  isStacked,
}: DiagramOptions): echarts.EChartsOption => {
  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line',
      },
    },
    legend: {
      bottom: 0,
      left: 'center',
      orient: 'horizontal',
      data: data.map(({ name }) => name),

      selected,
      textStyle: {
        color: theme.colors.semantic.text,
      },
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
      axisLabel: {
        color: theme.colors.semantic.text,
      },
    },
    yAxis: {
      type: 'value',
      name: '',
      axisLine: {
        show: true,
        lineStyle: {
          color: theme.colors.semantic.text,
          type: 'solid',
        },
      },
      axisLabel: {
        color: theme.colors.semantic.text,
        formatter: function (value: number) {
          return value === 0 ? '' : value.toString();
        },
      },
    },
    series: [
      ...data.map(({ data: values, name }) => formatSeries(values, name, isStacked)),
      getCurrentPeriodSeries(currentPeriod),
    ],
  };
};
