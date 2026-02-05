import { Configuration, MetricAIForecastApi } from '@architeq/core-api-client';

import { validateConfiguration } from '../../../api/utils';

import { AiForecastClient, GetForecastArgs } from './types';

/**
 * Creates an adapter for the AI Forecast API using @architeq/core-api-client.
 *
 * This adapter wraps the generated MetricAIForecastApi and provides a simplified
 * interface for making forecast requests.
 *
 * @param config - The API Configuration instance containing basePath and other settings
 * @returns An AiForecastClient instance with the getForecast method
 *
 * @example
 * ```typescript
 * const config = new Configuration({ basePath: 'https://api.example.com' });
 * const client = createAiForecastApiClientAdapter(config);
 *
 * const forecast = await client.getForecast({
 *   teamId: 'team-1',
 *   project: 'project-1',
 *   boardType: 'sprint',
 *   metricName: 'burndown',
 *   valueMode: EValueMode.StoryPoints,
 *   showNonWorkingDays: true,
 *   selectedIssues: [],
 *   futureDates: ['2024-01-15', '2024-01-16'],
 *   startValue: 100,
 * });
 * ```
 */
export function createAiForecastApiClientAdapter(config: Configuration): AiForecastClient {
  validateConfiguration(config, 'AiForecastApiClient');

  const api = new MetricAIForecastApi(config);

  return {
    getForecast: async (args: GetForecastArgs, init?: RequestInit) => {
      return api.getMetricAiForecast(
        {
          teamId: args.teamId,
          boardType: args.boardType,
          metricName: args.metricName,
          burndownForecastRequest: {
            project: args.project,
            valueMode: args.valueMode,
            showNonWorkingDays: args.showNonWorkingDays,
            selectedIssues: args.selectedIssues,
            futureDates: args.futureDates,
            startValue: args.startValue,
          },
        },
        init
      );
    },
  };
}
