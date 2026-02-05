import {
  GetMetricAiForecastBoardTypeEnum,
  GetMetricAiForecastMetricNameEnum,
} from '@architeq/core-api-client';

import { TAiForecast, EValueMode } from '../types';

/**
 * Client interface for AI forecast operations.
 *
 * This interface allows injection of different API implementations,
 * enabling mock clients for testing and development.
 *
 * @example
 * ```typescript
 * // Using the real API client
 * const realClient = createAiForecastApiClientAdapter(config);
 *
 * // Using a mock client for testing
 * const mockClient: AiForecastClient = {
 *   getForecast: async () => ({ predicted: [90, 80, 70], confidence: 0.85 }),
 * };
 * ```
 */
export interface AiForecastClient {
  /**
   * Fetches AI-generated forecast predictions for burndown metrics.
   *
   * @param args - The forecast request parameters
   * @param init - Optional RequestInit for controlling the fetch request (e.g., AbortSignal)
   * @returns Promise resolving to the forecast data including predicted values
   */
  getForecast(args: GetForecastArgs, init?: RequestInit): Promise<TAiForecast>;
}

/**
 * Arguments for the getForecast API call.
 *
 * Contains all parameters needed to generate an AI forecast prediction
 * for a burndown chart.
 */
export interface GetForecastArgs {
  /** The team identifier */
  teamId: string;

  /** The project identifier */
  project: string;

  /** The type of board (e.g., 'sprint', 'kanban') */
  boardType: GetMetricAiForecastBoardTypeEnum;

  /** The metric name for the forecast (e.g., 'burndown', 'velocity') */
  metricName: GetMetricAiForecastMetricNameEnum;

  /** Whether to display story points or issue count */
  valueMode: EValueMode;

  /** Whether to include non-working days in the forecast */
  showNonWorkingDays: boolean;

  /** List of selected issue keys to include in the forecast */
  selectedIssues: string[];

  /** Array of future dates (ISO format) for which to generate predictions */
  futureDates: string[];

  /** The starting value from which to begin the forecast */
  startValue: number;
}
