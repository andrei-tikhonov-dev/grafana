import { Configuration } from '@architeq/core-api-client';

import { EValueMode } from '../types';

import { createAiForecastApiClientAdapter } from './createAiForecastApiClientAdapter';
import { GetForecastArgs } from './types';

const mockGetMetricAiForecast = jest.fn();

jest.mock('@architeq/core-api-client', () => {
  const actual = jest.requireActual('@architeq/core-api-client');
  return {
    ...actual,
    MetricAIForecastApi: jest.fn().mockImplementation(() => ({
      getMetricAiForecast: mockGetMetricAiForecast,
    })),
  };
});

jest.mock('../../../api/utils', () => ({
  validateConfiguration: jest.fn(),
}));

describe('createAiForecastApiClientAdapter', () => {
  const config = new Configuration({ basePath: 'https://api.example.com' });

  beforeEach(() => {
    mockGetMetricAiForecast.mockReset();
  });

  it('should return an object with getForecast method', () => {
    const client = createAiForecastApiClientAdapter(config);
    expect(typeof client.getForecast).toBe('function');
  });

  it('should call getMetricAiForecast with correctly mapped args', async () => {
    const forecastData = { data: [{ date: '2024-01-15', value: 5, upperBound: 8, lowerBound: 2 }] };
    mockGetMetricAiForecast.mockResolvedValue(forecastData);

    const client = createAiForecastApiClientAdapter(config);

    const args: GetForecastArgs = {
      teamId: 'team-1',
      project: 'project-1',
      boardType: 'sprint' as any,
      metricName: 'burndown' as any,
      valueMode: EValueMode.StoryPoints,
      showNonWorkingDays: true,
      selectedIssues: ['Bug'],
      futureDates: ['2024-01-15'],
      startValue: 100,
    };

    const result = await client.getForecast(args);

    expect(result).toBe(forecastData);
    expect(mockGetMetricAiForecast).toHaveBeenCalledWith(
      {
        teamId: 'team-1',
        boardType: 'sprint',
        metricName: 'burndown',
        burndownForecastRequest: {
          project: 'project-1',
          valueMode: EValueMode.StoryPoints,
          showNonWorkingDays: true,
          selectedIssues: ['Bug'],
          futureDates: ['2024-01-15'],
          startValue: 100,
        },
      },
      undefined
    );
  });

  it('should pass RequestInit to the API call', async () => {
    mockGetMetricAiForecast.mockResolvedValue({ data: [] });

    const client = createAiForecastApiClientAdapter(config);
    const abortController = new AbortController();

    await client.getForecast(
      {
        teamId: 't',
        project: 'p',
        boardType: '' as any,
        metricName: '' as any,
        valueMode: EValueMode.IssuesAmount,
        showNonWorkingDays: false,
        selectedIssues: [],
        futureDates: [],
        startValue: 0,
      },
      { signal: abortController.signal }
    );

    expect(mockGetMetricAiForecast).toHaveBeenCalledWith(
      expect.any(Object),
      { signal: abortController.signal }
    );
  });

  it('should propagate API errors', async () => {
    const error = new Error('Network error');
    mockGetMetricAiForecast.mockRejectedValue(error);

    const client = createAiForecastApiClientAdapter(config);

    await expect(
      client.getForecast({
        teamId: 't',
        project: 'p',
        boardType: '' as any,
        metricName: '' as any,
        valueMode: EValueMode.StoryPoints,
        showNonWorkingDays: false,
        selectedIssues: [],
        futureDates: ['2024-01-15'],
        startValue: 50,
      })
    ).rejects.toThrow('Network error');
  });
});
