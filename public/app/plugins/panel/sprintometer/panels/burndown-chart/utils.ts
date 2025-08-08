import * as echarts from 'echarts';
import { MarkArea2DDataItemOption } from 'echarts/types/src/component/marker/MarkAreaModel';

import { theme } from '../../theme';
import { formatDate } from '../../utils/dateTime';
import { getCurrentPeriodSeries } from '../../utils/echarts';
import { capitalize } from '../../utils/helpers';

import {
  LABEL_ISSUES_AMOUNT,
  LABEL_STORY_POINTS,
  LEGEND_ACTUAL_BURNDOWN,
  LEGEND_IDEAL_BURNDOWN,
  LEGEND_NON_WORKING_DAYS,
} from './constants';
import {
  MAggregatedData,
  MFilteredData,
  MBurndownCustomData,
  MDayData,
  MPreparedData,
  MStructuredData,
  MNonWorkingDays,
  MScopeChanges,
  MTotalScopeChanges,
  EValueMode,
} from './types';

function groupScopeChangesByDayAndStatus(days: MDayData[]): {
  scopeChanges: MScopeChanges;
  totalScopeChanges: MTotalScopeChanges;
} {
  const scopeChanges: { [key: string]: Record<string, number> } = {};
  const totalScopeChanges: Record<string, number> = {};

  days.forEach((day) => {
    const date = formatDate(day.date);

    if (!scopeChanges[date]) {
      scopeChanges[date] = {};
    }

    day.scopeChanges.forEach((scopeChange) => {
      const status = scopeChange.status;

      if (!scopeChanges[date][status]) {
        scopeChanges[date][status] = 0;
      }
      scopeChanges[date][status]++;

      if (!totalScopeChanges[status]) {
        totalScopeChanges[status] = 0;
      }
      totalScopeChanges[status]++;
    });
  });

  return { scopeChanges, totalScopeChanges };
}

const transformStructuredDataToAggregated = (data: MStructuredData[]): MAggregatedData => {
  const result: MAggregatedData = {
    [EValueMode.StoryPoints]: {},
    [EValueMode.IssuesAmount]: {},
  };

  data.forEach((item) => {
    result[EValueMode.StoryPoints][item.name] = {
      actual: item[EValueMode.StoryPoints].actual,
      ideal: item[EValueMode.StoryPoints].ideal,
    };

    result[EValueMode.IssuesAmount][item.name] = {
      actual: item[EValueMode.IssuesAmount].actual,
      ideal: item[EValueMode.IssuesAmount].ideal,
    };
  });

  return result;
};

function getNonworkingDays(days: MDayData[]): MNonWorkingDays {
  const nonWorkingDays: MNonWorkingDays = [];
  let nonWorkingSequenceStart: number | null = null;

  for (let i = 0; i < days.length; i++) {
    const currentDay = days[i];

    if (!currentDay.isWorking && nonWorkingSequenceStart === null) {
      nonWorkingSequenceStart = i;
    } else if (currentDay.isWorking && nonWorkingSequenceStart !== null) {
      nonWorkingDays.push([formatDate(days[nonWorkingSequenceStart].date), formatDate(currentDay.date)]);

      nonWorkingSequenceStart = null;
    }
  }

  if (nonWorkingSequenceStart !== null) {
    nonWorkingDays.push([formatDate(days[nonWorkingSequenceStart].date), formatDate(days[days.length - 1].date)]);
  }

  return nonWorkingDays;
}

export function prepareData({ days, issueTypes, summary, currentDate }: MBurndownCustomData): MPreparedData {
  const issueOptions = issueTypes.map(({ name }) => ({
    label: name,
    value: name,
  }));

  const valueOptions = [
    { label: LABEL_STORY_POINTS, value: EValueMode.StoryPoints },
    { label: LABEL_ISSUES_AMOUNT, value: EValueMode.IssuesAmount },
  ];

  const { scopeChanges, totalScopeChanges } = groupScopeChangesByDayAndStatus(days);

  return {
    currentDay: formatDate(currentDate),
    data: transformStructuredDataToAggregated(issueTypes),
    daysData: days,
    summary,
    issueOptions,
    valueOptions,
    scopeChanges,
    totalScopeChanges,
  };
}

type FilterBurndownChartDataArgs = {
  daysData: MDayData[];
  data: MAggregatedData;
  valueMode: EValueMode;
  selectedIssues: string[];
  showNonWorkingDays: boolean;
};

export const filterBurndownChartData = ({
  data,
  valueMode,
  selectedIssues,
  daysData,
  showNonWorkingDays,
}: FilterBurndownChartDataArgs): MFilteredData => {
  const keysToUse =
    selectedIssues.length === 0 ? Object.keys(data[valueMode]) : selectedIssues.filter((name) => data[valueMode][name]);

  if (keysToUse.length === 0) {
    const days = showNonWorkingDays
      ? daysData.map(({ date }) => formatDate(date))
      : daysData.filter((day) => day.isWorking).map(({ date }) => formatDate(date));

    const nonWorkingDays = showNonWorkingDays ? getNonworkingDays(daysData) : [];

    return { actual: [], ideal: [], days, nonWorkingDays };
  }

  const daysIndexMap = daysData
    .map((day, index) => ({ date: formatDate(day.date), isWorking: day.isWorking, index }))
    .filter((day) => showNonWorkingDays || day.isWorking);

  const days = daysIndexMap.map((day) => day.date);
  const nonWorkingDays = showNonWorkingDays ? getNonworkingDays(daysData) : [];

  let rawActual: number[] = [];
  let rawIdeal: number[] = [];

  if (keysToUse.length === 1) {
    const name = keysToUse[0];
    rawActual = data[valueMode][name].actual;
    rawIdeal = data[valueMode][name].ideal;
  } else {
    rawActual = aggregateValues(keysToUse.map((name) => data[valueMode][name].actual));
    rawIdeal = aggregateValues(keysToUse.map((name) => data[valueMode][name].ideal));
  }

  const actual = daysIndexMap
    .map((day) => (day.index < rawActual.length ? rawActual[day.index] : undefined))
    .filter((value): value is number => value !== undefined);

  const ideal = daysIndexMap
    .map((day) => (day.index < rawIdeal.length ? rawIdeal[day.index] : undefined))
    .filter((value): value is number => value !== undefined);

  return { actual, ideal, days, nonWorkingDays };
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

function formatTooltip(
  params: Array<{ axisValue: string; axisValueLabel: string }>,
  scopeChanges: MScopeChanges
): string {
  const { axisValueLabel, axisValue } = params[0];
  const changes = Object.entries(scopeChanges[axisValue]);

  let result = `<div style="font-weight: 600; margin-bottom: 8px">${axisValueLabel}</div>`;

  params.forEach((param: any) => {
    if (param.seriesName && param.seriesName !== LEGEND_NON_WORKING_DAYS) {
      result += `<div><span style="color: ${param.color};">${param.seriesName}:</span> ${param.value}</div>`;
    }
  });

  if (changes.length > 0) {
    result += `
        <div style="padding-top: 8px;">
            ${changes.map(([label, value]) => `<div><span>${capitalize(label)}</span>: ${value} </div>`).join('')}
        </div>`;
  }

  return result;
}

interface ChartOptions {
  actual: number[];
  ideal: number[];
  days: string[];
  currentDay: string;
  nonWorkingDays: MNonWorkingDays;
  color: string;
  scopeChanges: MScopeChanges;
}

export const getChartOptions = ({
  actual,
  ideal,
  days,
  currentDay,
  nonWorkingDays,
  color,
  scopeChanges,
}: ChartOptions): echarts.EChartsOption => {
  const nonWorkingDaysFormated: MarkArea2DDataItemOption[] = nonWorkingDays.map(([start, end]) => [
    { xAxis: start },
    { xAxis: end },
  ]);

  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line',
      },
      formatter: function (params: any) {
        return formatTooltip(params, scopeChanges);
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
            color: 'rgba(246, 241, 240, 0.7)',
          },
          data: nonWorkingDaysFormated,
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
      getCurrentPeriodSeries(currentDay),
    ],
  };
};
