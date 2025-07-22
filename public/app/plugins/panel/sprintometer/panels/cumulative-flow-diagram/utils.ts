import * as echarts from 'echarts';

import { SelectableValue } from '@grafana/data';

import { theme } from '../../theme';
import { formatDate } from '../../utils/dateTime';
import { getCurrentPeriodSeries } from '../../utils/echarts';

import {
  CumulativeFlowDiagramAggregatedData,
  CumulativeFlowDiagramFilteredData,
  CumulativeFlowDiagramData,
  CumulativeFlowDiagramPeriodData,
  CumulativeFlowDiagramPreparedData,
  CumulativeFlowDiagramStructuredData,
  PeriodType,
} from './types';

const transformStructuredDataToAggregated = (
  data: CumulativeFlowDiagramStructuredData[]
): CumulativeFlowDiagramAggregatedData => {
  const result: CumulativeFlowDiagramAggregatedData = {
    issuesAmount: {},
  };

  data.forEach((item) => {
    result.issuesAmount[item.name] = item.issuesAmount;
  });

  return result;
};

export function prepareData({
  periods,
  issueTypes,
  currentPeriod,
  periodType,
}: CumulativeFlowDiagramData): CumulativeFlowDiagramPreparedData {
  const issueOptions = issueTypes.map(({ name }) => ({
    label: name,
    value: name,
  }));

  const valueOptions: Array<SelectableValue<string>> = [];

  return {
    currentPeriod: periodType === 'date' ? formatDate(currentPeriod) : currentPeriod,
    data: transformStructuredDataToAggregated(issueTypes),
    periodType,
    periodsData: periods,
    issueOptions,
    statusOptions: valueOptions,
  };
}

type FilterDataArgs = {
  periodsData: CumulativeFlowDiagramPeriodData[];
  data: CumulativeFlowDiagramAggregatedData;
  selectedIssues: string[];
  periodType: PeriodType;
};

export const filterCumulativeFlowDiagramData = ({
  data,
  selectedIssues,
  periodsData,
  periodType,
}: FilterDataArgs): CumulativeFlowDiagramFilteredData => {
  const keysToUse =
    selectedIssues.length === 0
      ? Object.keys(data.issuesAmount)
      : selectedIssues.filter((name) => data.issuesAmount[name]);

  const periods = periodsData.map(({ value }) => (periodType === 'date' ? formatDate(value) : value));

  if (keysToUse.length === 0) {
    return { filteredData: [], periods: periods };
  }

  const firstIssueKey = keysToUse[0];
  const dataKeys = Object.keys(data.issuesAmount[firstIssueKey]);

  const filteredData = dataKeys.map((dataKey) => {
    const dataArrays = keysToUse.map((name) => data.issuesAmount[name][dataKey]);

    const aggregatedData = dataArrays.length === 1 ? dataArrays[0] : aggregateValues(dataArrays);

    return {
      data: aggregatedData,
      name: dataKey,
    };
  });

  return { filteredData, periods: periods };
};

function aggregateValues(arrays: number[][]): number[] {
  if (arrays.length === 0) {
    return [];
  }

  const maxLength = Math.max(...arrays.map((arr) => arr.length));
  const result = Array(maxLength).fill(0);

  arrays.forEach((array) => {
    array.forEach((value, index) => {
      result[index] += value;
    });
  });

  return result;
}

const formatSeries = (data: number[], name: string): any => {
  return {
    name,
    data,
    type: 'line',
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
}

export const getCumulativeFlowDiagramOptions = ({
  data,
  periods,
  currentPeriod,
  selected,
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
      left: 20,
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
      ...data.map(({ data: values, name }) => formatSeries(values, name)),
      getCurrentPeriodSeries(currentPeriod),
    ],
  };
};
