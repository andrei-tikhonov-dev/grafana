import * as echarts from 'echarts';

import { theme } from '../../theme';
import { formatDate } from '../../utils/dateTime';

import {
  LABEL_ISSUES_AMOUNT,
  LABEL_STORY_POINTS,
  LEGEND_ACTUAL_BURNDOWN,
  LEGEND_IDEAL_BURNDOWN,
  LEGEND_NON_WORKING_DAYS,
} from './constants';
import {
  BurndownChartAggregatedData,
  BurndownChartFilteredData,
  BurndownCustomData,
  BurndownPreparedData,
  BurndownStructuredData,
  ValueMode,
} from './types';

const transformStructuredToAggregated = (data: BurndownStructuredData[]): BurndownChartAggregatedData => {
  const result: BurndownChartAggregatedData = {
    [ValueMode.StoryPoints]: {},
    [ValueMode.IssuesAmount]: {},
  };

  data.forEach((item) => {
    result[ValueMode.StoryPoints][item.name] = {
      actual: item[ValueMode.StoryPoints].actual,
      ideal: item[ValueMode.StoryPoints].ideal,
    };

    result[ValueMode.IssuesAmount][item.name] = {
      actual: item[ValueMode.IssuesAmount].actual,
      ideal: item[ValueMode.IssuesAmount].ideal,
    };
  });

  return result;
};

export function prepareData({ days, issueTypes, summary, currentDate }: BurndownCustomData): BurndownPreparedData {
  const issueOptions = issueTypes.map(({ name }) => ({
    label: name,
    value: name,
  }));

  const valueOptions = [
    { label: LABEL_STORY_POINTS, value: ValueMode.StoryPoints },
    { label: LABEL_ISSUES_AMOUNT, value: ValueMode.IssuesAmount },
  ];

  const data: BurndownChartAggregatedData = transformStructuredToAggregated(issueTypes);

  return {
    days: days.map(({ date }) => formatDate(date)),
    currentDay: formatDate(currentDate),
    data,
    summary,
    issueOptions,
    valueOptions,
  };
}

export const filterBurndownChartData = (
  data: BurndownChartAggregatedData,
  mode: ValueMode,
  names: string[]
): BurndownChartFilteredData => {
  // If names is empty, use all available names in the data
  const keysToUse = names.length === 0 ? Object.keys(data[mode]) : names.filter((name) => data[mode][name]);

  // If no valid keys after filtering, return empty arrays
  if (keysToUse.length === 0) {
    return { actual: [], ideal: [] };
  }

  // If only one key, return its data directly
  if (keysToUse.length === 1) {
    const name = keysToUse[0];
    return {
      actual: [...data[mode][name].actual],
      ideal: [...data[mode][name].ideal],
    };
  }

  // For multiple keys, aggregate the data
  const filteredData = keysToUse.map((name) => data[mode][name]);

  // Find the maximum length of each array type separately
  const maxActualLength = Math.max(...filteredData.map((item) => item.actual.length));
  const maxIdealLength = Math.max(...filteredData.map((item) => item.ideal.length));

  // Initialize result arrays with their respective maximum lengths
  const actual = Array(maxActualLength).fill(0);
  const ideal = Array(maxIdealLength).fill(0);

  // Sum values across all filtered items
  filteredData.forEach((item) => {
    // Sum actual values only up to the length of each item's actual array
    for (let i = 0; i < item.actual.length; i++) {
      actual[i] += item.actual[i];
    }

    // Sum ideal values only up to the length of each item's ideal array
    for (let i = 0; i < item.ideal.length; i++) {
      ideal[i] += item.ideal[i];
    }
  });

  return { actual, ideal };
};

interface ChartOptions {
  actual: number[];
  ideal: number[];
  days: string[];
  currentDay: string;
  nonWorkingDays: [];
  color: string;
}

export const getChartOptions = ({
  actual,
  ideal,
  days,
  currentDay,
  nonWorkingDays,
  color,
}: ChartOptions): echarts.EChartsOption => {
  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line',
      },
      formatter: function (params: any) {
        let result = `<strong style="font-weight: bold;">${params[0].axisValueLabel}</strong><br/>`;

        params.forEach((param: any) => {
          if (param.seriesName && param.seriesName !== LEGEND_NON_WORKING_DAYS) {
            result += `<div style="display: flex; align-items: center;">
                <span style="color: ${param.color};">${param.seriesName}: </span>&nbsp;${param.value}
              </div>`;
          }
        });

        return result;
      },
    },
    legend: {
      bottom: 0,
      left: 'center',
      orient: 'horizontal',
      data: ['', LEGEND_IDEAL_BURNDOWN, LEGEND_ACTUAL_BURNDOWN],
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
      data: days,
      axisLabel: {
        color: theme.colors.semantic.text,
      },
    },
    yAxis: {
      type: 'value',
      name: '',
    },
    series: [
      {
        name: LEGEND_NON_WORKING_DAYS,
        type: 'line',
        data: new Array(days.length).fill(null),
        showSymbol: false,
        lineStyle: {
          opacity: 0,
        },
        itemStyle: {
          opacity: 0,
        },
        markArea: {
          silent: true,
          itemStyle: {
            color: 'rgba(246, 241, 240, 0.5)',
          },
          data: nonWorkingDays,
        },
      },
      {
        name: LEGEND_IDEAL_BURNDOWN,
        type: 'line',
        showSymbol: false,
        data: ideal,
        lineStyle: {
          color: theme.colors.semantic.text,
          width: 1,
          type: 'dashed',
        },
        itemStyle: {
          color: theme.colors.semantic.text,
        },
      },
      {
        name: LEGEND_ACTUAL_BURNDOWN,
        type: 'line',
        data: actual,
        lineStyle: {
          color,
          width: 1,
        },
        itemStyle: {
          color,
        },
      },

      {
        name: 'Today',
        type: 'line',
        data: [],
        markLine: {
          symbol: 'none',
          label: {
            formatter: 'Today',
            position: 'end',
            color: theme.colors.semantic.text,
          },
          lineStyle: {
            color: theme.colors.semantic.text,
            width: 1,
            type: 'dotted',
          },
          data: [
            {
              xAxis: currentDay,
            },
          ],
        },
      },
    ],
  };
};
