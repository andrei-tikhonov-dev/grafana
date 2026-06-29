import { MBurndownCustomData, MDayData, MAggregatedData, EValueMode, TAiForecast } from './types';
import { prepareData, filterBurndownChartData, getChartOptions } from './utils';
import { LEGEND_ACTUAL_BURNDOWN, LEGEND_IDEAL_BURNDOWN, LEGEND_NON_WORKING_DAYS } from './constants';

// --- Test helpers ---

function makeDay(date: string, isWorking: boolean, scopeChanges: MDayData['scopeChanges'] = []): MDayData {
  return { date, isWorking, scopeChanges };
}

function makeCustomData(overrides: Partial<MBurndownCustomData> = {}): MBurndownCustomData {
  return {
    currentDate: '2024-01-15',
    days: [
      makeDay('2024-01-08', true),
      makeDay('2024-01-09', true),
      makeDay('2024-01-10', true),
      makeDay('2024-01-11', true),
      makeDay('2024-01-12', true),
      makeDay('2024-01-13', false),
      makeDay('2024-01-14', false),
      makeDay('2024-01-15', true),
    ],
    issueTypes: [
      {
        name: 'Bug',
        storyPoints: { actual: [10, 8, 6, 4, 3, 3, 3, 2], ideal: [10, 8.75, 7.5, 6.25, 5, 3.75, 2.5, 1.25] },
        issuesAmount: { actual: [5, 4, 3, 3, 2, 2, 2, 1], ideal: [5, 4.375, 3.75, 3.125, 2.5, 1.875, 1.25, 0.625] },
      },
      {
        name: 'Story',
        storyPoints: { actual: [20, 18, 15, 12, 10, 10, 10, 7], ideal: [20, 17.5, 15, 12.5, 10, 7.5, 5, 2.5] },
        issuesAmount: { actual: [8, 7, 6, 5, 4, 4, 4, 3], ideal: [8, 7, 6, 5, 4, 3, 2, 1] },
      },
    ],
    summary: {
      storyPoints: { completed: 21, remaining: 9, total: 30, percentage: 70 },
      issuesAmount: { completed: 9, remaining: 4, total: 13, percentage: 69 },
    },
    ...overrides,
  };
}

// --- prepareData ---

describe('prepareData', () => {
  it('should return issueOptions from issueTypes', () => {
    const result = prepareData(makeCustomData());

    expect(result.issueOptions).toEqual([
      { label: 'Bug', value: 'Bug' },
      { label: 'Story', value: 'Story' },
    ]);
  });

  it('should return value mode options', () => {
    const result = prepareData(makeCustomData());

    expect(result.valueOptions).toEqual([
      { label: 'Story Points', value: 'storyPoints' },
      { label: 'Issues Amount', value: 'issuesAmount' },
    ]);
  });

  it('should format currentDay', () => {
    const result = prepareData(makeCustomData({ currentDate: '2024-01-15' }));
    expect(result.currentDay).toBe('15 Jan');
  });

  it('should pass through summary unchanged', () => {
    const customData = makeCustomData();
    const result = prepareData(customData);
    expect(result.summary).toBe(customData.summary);
  });

  it('should transform structured data to aggregated format', () => {
    const result = prepareData(makeCustomData());

    expect(result.data[EValueMode.StoryPoints]['Bug'].actual).toEqual([10, 8, 6, 4, 3, 3, 3, 2]);
    expect(result.data[EValueMode.IssuesAmount]['Story'].actual).toEqual([8, 7, 6, 5, 4, 4, 4, 3]);
  });

  it('should group scope changes by day and status', () => {
    const data = makeCustomData({
      days: [
        makeDay('2024-01-08', true, [
          { issueKey: 'BUG-1', summary: 'Fix crash', url: '/bug-1', status: 'added' },
          { issueKey: 'BUG-2', summary: 'Fix leak', url: '/bug-2', status: 'added' },
        ]),
        makeDay('2024-01-09', true, [
          { issueKey: 'BUG-3', summary: 'Remove item', url: '/bug-3', status: 'removed' },
        ]),
      ],
    });

    const result = prepareData(data);
    expect(result.scopeChanges['8 Jan']).toEqual({ added: 2 });
    expect(result.scopeChanges['9 Jan']).toEqual({ removed: 1 });
  });

  it('should compute totalScopeChanges across all days', () => {
    const data = makeCustomData({
      days: [
        makeDay('2024-01-08', true, [
          { issueKey: 'A', summary: '', url: '', status: 'added' },
          { issueKey: 'B', summary: '', url: '', status: 'removed' },
        ]),
        makeDay('2024-01-09', true, [
          { issueKey: 'C', summary: '', url: '', status: 'added' },
        ]),
      ],
    });

    const result = prepareData(data);
    expect(result.totalScopeChanges).toEqual({ added: 2, removed: 1 });
  });

  it('should handle empty issueTypes', () => {
    const result = prepareData(makeCustomData({ issueTypes: [] }));

    expect(result.issueOptions).toEqual([]);
    expect(result.data).toEqual({
      [EValueMode.StoryPoints]: {},
      [EValueMode.IssuesAmount]: {},
    });
  });

  it('should handle empty days', () => {
    const result = prepareData(makeCustomData({ days: [] }));

    expect(result.daysData).toEqual([]);
    expect(result.scopeChanges).toEqual({});
    expect(result.totalScopeChanges).toEqual({});
  });
});

// --- filterBurndownChartData ---

describe('filterBurndownChartData', () => {
  const baseData: MAggregatedData = {
    [EValueMode.StoryPoints]: {
      Bug: { actual: [10, 8, 6, 4, 2], ideal: [10, 8, 6, 4, 2] },
      Story: { actual: [20, 16, 12, 8, 4], ideal: [20, 15, 10, 5, 0] },
    },
    [EValueMode.IssuesAmount]: {
      Bug: { actual: [5, 4, 3, 2, 1], ideal: [5, 4, 3, 2, 1] },
      Story: { actual: [8, 6, 4, 2, 0], ideal: [8, 6, 4, 2, 0] },
    },
  };

  const baseDays: MDayData[] = [
    makeDay('2024-01-08', true),
    makeDay('2024-01-09', true),
    makeDay('2024-01-10', true),
    makeDay('2024-01-11', false),
    makeDay('2024-01-12', true),
  ];

  it('should return all issue types when selectedIssues is empty', () => {
    const result = filterBurndownChartData({
      data: baseData,
      valueMode: EValueMode.StoryPoints,
      selectedIssues: [],
      daysData: baseDays,
      showNonWorkingDays: true,
    });

    // Aggregated: Bug + Story actual
    expect(result.actual).toEqual([30, 24, 18, 12, 6]);
    expect(result.ideal).toEqual([30, 23, 16, 9, 2]);
  });

  it('should filter to selected issue type', () => {
    const result = filterBurndownChartData({
      data: baseData,
      valueMode: EValueMode.StoryPoints,
      selectedIssues: ['Bug'],
      daysData: baseDays,
      showNonWorkingDays: true,
    });

    expect(result.actual).toEqual([10, 8, 6, 4, 2]);
    expect(result.ideal).toEqual([10, 8, 6, 4, 2]);
  });

  it('should aggregate multiple selected issue types', () => {
    const result = filterBurndownChartData({
      data: baseData,
      valueMode: EValueMode.StoryPoints,
      selectedIssues: ['Bug', 'Story'],
      daysData: baseDays,
      showNonWorkingDays: true,
    });

    expect(result.actual).toEqual([30, 24, 18, 12, 6]);
  });

  it('should use IssuesAmount mode correctly', () => {
    const result = filterBurndownChartData({
      data: baseData,
      valueMode: EValueMode.IssuesAmount,
      selectedIssues: ['Bug'],
      daysData: baseDays,
      showNonWorkingDays: true,
    });

    expect(result.actual).toEqual([5, 4, 3, 2, 1]);
  });

  it('should exclude non-working days when showNonWorkingDays is false', () => {
    const result = filterBurndownChartData({
      data: baseData,
      valueMode: EValueMode.StoryPoints,
      selectedIssues: ['Bug'],
      daysData: baseDays,
      showNonWorkingDays: false,
    });

    // Day index 3 (Jan 11, non-working) should be excluded
    expect(result.days).toHaveLength(4);
    expect(result.days).not.toContain('11 Jan');
    expect(result.actual).toEqual([10, 8, 6, 2]);
    expect(result.nonWorkingDays).toEqual([]);
  });

  it('should include non-working days when showNonWorkingDays is true', () => {
    const result = filterBurndownChartData({
      data: baseData,
      valueMode: EValueMode.StoryPoints,
      selectedIssues: ['Bug'],
      daysData: baseDays,
      showNonWorkingDays: true,
    });

    expect(result.days).toHaveLength(5);
    expect(result.days).toContain('11 Jan');
    expect(result.nonWorkingDays).toEqual([['11 Jan', '12 Jan']]);
  });

  it('should detect consecutive non-working days', () => {
    const days: MDayData[] = [
      makeDay('2024-01-08', true),
      makeDay('2024-01-09', false),
      makeDay('2024-01-10', false),
      makeDay('2024-01-11', true),
    ];

    const data: MAggregatedData = {
      [EValueMode.StoryPoints]: {
        Bug: { actual: [10, 8, 6, 4], ideal: [10, 8, 6, 4] },
      },
      [EValueMode.IssuesAmount]: {
        Bug: { actual: [5, 4, 3, 2], ideal: [5, 4, 3, 2] },
      },
    };

    const result = filterBurndownChartData({
      data,
      valueMode: EValueMode.StoryPoints,
      selectedIssues: [],
      daysData: days,
      showNonWorkingDays: true,
    });

    expect(result.nonWorkingDays).toEqual([['9 Jan', '11 Jan']]);
  });

  it('should handle trailing non-working days', () => {
    const days: MDayData[] = [
      makeDay('2024-01-08', true),
      makeDay('2024-01-09', true),
      makeDay('2024-01-10', false),
      makeDay('2024-01-11', false),
    ];

    const data: MAggregatedData = {
      [EValueMode.StoryPoints]: {
        Bug: { actual: [10, 8, 6, 4], ideal: [10, 8, 6, 4] },
      },
      [EValueMode.IssuesAmount]: {
        Bug: { actual: [5, 4, 3, 2], ideal: [5, 4, 3, 2] },
      },
    };

    const result = filterBurndownChartData({
      data,
      valueMode: EValueMode.StoryPoints,
      selectedIssues: [],
      daysData: days,
      showNonWorkingDays: true,
    });

    expect(result.nonWorkingDays).toEqual([['10 Jan', '11 Jan']]);
  });

  it('should ignore selectedIssues that do not exist in data', () => {
    const result = filterBurndownChartData({
      data: baseData,
      valueMode: EValueMode.StoryPoints,
      selectedIssues: ['NonExistent'],
      daysData: baseDays,
      showNonWorkingDays: true,
    });

    // Falls back to empty since no valid keys
    expect(result.actual).toEqual([]);
    expect(result.ideal).toEqual([]);
  });

  it('should return empty actual/ideal when data has no keys for valueMode', () => {
    const emptyData: MAggregatedData = {
      [EValueMode.StoryPoints]: {},
      [EValueMode.IssuesAmount]: {},
    };

    const result = filterBurndownChartData({
      data: emptyData,
      valueMode: EValueMode.StoryPoints,
      selectedIssues: [],
      daysData: baseDays,
      showNonWorkingDays: true,
    });

    expect(result.actual).toEqual([]);
    expect(result.ideal).toEqual([]);
    expect(result.days).toHaveLength(5);
  });
});

// --- getChartOptions ---

describe('getChartOptions', () => {
  const baseConfig = {
    actual: [30, 24, 18, 12, 6],
    ideal: [30, 22.5, 15, 7.5, 0],
    days: ['8 Jan', '9 Jan', '10 Jan', '11 Jan', '12 Jan'],
    currentDay: '10 Jan',
    nonWorkingDays: [] as Array<[string, string]>,
    color: '#EE522E',
    scopeChanges: {},
  };

  it('should return a valid echarts option with required series', () => {
    const option = getChartOptions(baseConfig);

    expect(option.backgroundColor).toBe('transparent');
    expect(option.xAxis).toMatchObject({
      type: 'category',
      data: baseConfig.days,
    });
    expect(option.yAxis).toMatchObject({ type: 'value' });
  });

  it('should include non-working days, ideal, and actual series', () => {
    const option = getChartOptions(baseConfig);
    const series = option.series as any[];

    expect(series[0].name).toBe(LEGEND_NON_WORKING_DAYS);
    expect(series[1].name).toBe(LEGEND_IDEAL_BURNDOWN);
    expect(series[1].data).toEqual(baseConfig.ideal);
    expect(series[2].name).toBe(LEGEND_ACTUAL_BURNDOWN);
    expect(series[2].data).toEqual(baseConfig.actual);
  });

  it('should set actual series color from config', () => {
    const option = getChartOptions(baseConfig);
    const series = option.series as any[];

    expect(series[2].lineStyle.color).toBe('#EE522E');
    expect(series[2].itemStyle.color).toBe('#EE522E');
  });

  it('should set AI prediction color from config', () => {
    const option = getChartOptions(baseConfig);
    const series = option.series as any[];

    const predictionSeries = series[4];
    const confidenceSpreadSeries = series[6];

    expect(predictionSeries.lineStyle.color).toBe('#EE522E');
    expect(predictionSeries.itemStyle.color).toBe('#EE522E');
    expect(confidenceSpreadSeries.areaStyle.color).toBe('#EE522E');
    expect(confidenceSpreadSeries.areaStyle.opacity).toBe(0.2);
  });

  it('should use issues amount color for AI prediction when provided', () => {
    const option = getChartOptions({
      ...baseConfig,
      color: '#6634FA',
    });
    const series = option.series as any[];

    const predictionSeries = series[4];
    const confidenceSpreadSeries = series[6];

    expect(predictionSeries.lineStyle.color).toBe('#6634FA');
    expect(predictionSeries.itemStyle.color).toBe('#6634FA');
    expect(confidenceSpreadSeries.areaStyle.color).toBe('#6634FA');
    expect(confidenceSpreadSeries.areaStyle.opacity).toBe(0.2);
  });

  it('should configure non-working days mark areas', () => {
    const option = getChartOptions({
      ...baseConfig,
      nonWorkingDays: [['11 Jan', '12 Jan']],
    });
    const series = option.series as any[];
    const markAreaData = series[0].markArea.data;

    expect(markAreaData).toEqual([[{ xAxis: '11 Jan' }, { xAxis: '12 Jan' }]]);
  });

  it('should include AI prediction series when aiForecast is provided', () => {
    const aiForecast: TAiForecast = {
      data: [
        { date: '11 Jan', value: 9, upperBound: 12, lowerBound: 6 },
        { date: '12 Jan', value: 3, upperBound: 7, lowerBound: 0 },
      ],
    };

    const option = getChartOptions({ ...baseConfig, aiForecast });
    const series = option.series as any[];

    // Prediction line series
    const predictionSeries = series[4];
    expect(predictionSeries.name).toBe('AI Prediction');
    expect(predictionSeries.type).toBe('line');
    // Forecast values at correct indices (date '11 Jan' is index 3, '12 Jan' is index 4)
    expect(predictionSeries.data[3]).toBe(9);
    expect(predictionSeries.data[4]).toBe(3);
  });

  it('should fill prediction data with nulls when no aiForecast', () => {
    const option = getChartOptions(baseConfig);
    const series = option.series as any[];

    const predictionSeries = series[4];
    expect(predictionSeries.data.every((v: any) => v === null)).toBe(true);
  });

  it('should compute confidence band as stacked area', () => {
    const aiForecast: TAiForecast = {
      data: [
        { date: '11 Jan', value: 9, upperBound: 14, lowerBound: 4 },
      ],
    };

    const option = getChartOptions({ ...baseConfig, aiForecast });
    const series = option.series as any[];

    // Lower bound series (hidden)
    const lowerBound = series[5];
    expect(lowerBound.stack).toBe('confidence-band');
    expect(lowerBound.data[3]).toBe(4);

    // Upper bound diff series (stacked area)
    const upperDiff = series[6];
    expect(upperDiff.stack).toBe('confidence-band');
    expect(upperDiff.data[3]).toBe(10); // 14 - 4
    expect(upperDiff.areaStyle).toBeDefined();
  });

  it('should connect prediction line from last actual data point', () => {
    // actual has 3 values, days has 5, so prediction starts at index 2 (last actual)
    const aiForecast: TAiForecast = {
      data: [
        { date: '11 Jan', value: 9, upperBound: 12, lowerBound: 6 },
        { date: '12 Jan', value: 3, upperBound: 5, lowerBound: 1 },
      ],
    };

    const config = {
      ...baseConfig,
      actual: [30, 24, 18],
      aiForecast,
    };

    const option = getChartOptions(config);
    const series = option.series as any[];

    const predictionSeries = series[4];
    // Last actual index is 2, value is 18 — connection point
    expect(predictionSeries.data[2]).toBe(18);

    // Lower bound starts at last actual value
    expect(series[5].data[2]).toBe(18);
    // Upper diff is 0 at connection point
    expect(series[6].data[2]).toBe(0);

    // Forecast values at future indices
    expect(predictionSeries.data[3]).toBe(9);
    expect(predictionSeries.data[4]).toBe(3);
  });

  it('should include legend with expected items', () => {
    const option = getChartOptions(baseConfig);
    const legend = option.legend as any;

    expect(legend.data).toContain(LEGEND_IDEAL_BURNDOWN);
    expect(legend.data).toContain(LEGEND_ACTUAL_BURNDOWN);
    expect(legend.data).toContain('AI Prediction');
  });

  it('should set grid with containLabel', () => {
    const option = getChartOptions(baseConfig);
    expect((option.grid as any).containLabel).toBe(true);
  });
});
