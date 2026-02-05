import {
  GetMetricAiForecastBoardTypeEnum,
  GetMetricAiForecastMetricNameEnum,
} from '@architeq/core-api-client';
import { useQuery } from '@tanstack/react-query';

import { EValueMode, TAiForecast } from '../types';

import { AiForecastClient } from './types';

interface UseAiPredictionProps {
  client: AiForecastClient;
  enabled: boolean;
  /** Whether the API basePath is ready for requests */
  isBasePathReady: boolean;
  teamId: string;
  project: string;
  boardType: GetMetricAiForecastBoardTypeEnum;
  metricName: GetMetricAiForecastMetricNameEnum;
  valueMode: EValueMode;
  showNonWorkingDays: boolean;
  selectedIssues: string[];
  startValue: number;
  futureDates: string[];
}

/**
 * Hook for fetching AI-generated burndown predictions.
 *
 * This hook manages the query for AI forecast data, including proper
 * handling of the basePath readiness to prevent race conditions.
 *
 * @param props - Configuration for the prediction query
 * @returns Object containing forecast data, loading state, and any error
 */
export const useAiPrediction = ({
  client,
  enabled,
  isBasePathReady,
  teamId,
  project,
  boardType,
  metricName,
  valueMode,
  showNonWorkingDays,
  selectedIssues,
  startValue,
  futureDates,
}: UseAiPredictionProps) => {
  const { data, isLoading, error } = useQuery<TAiForecast>({
    queryKey: [
      'burndown-ai-forecast',
      teamId,
      project,
      boardType,
      metricName,
      valueMode,
      showNonWorkingDays,
      selectedIssues,
      startValue,
      futureDates,
    ],
    queryFn: ({ signal }) =>
      client.getForecast(
        {
          teamId,
          project,
          boardType,
          metricName,
          valueMode,
          showNonWorkingDays,
          selectedIssues,
          futureDates,
          startValue,
        },
        { signal }
      ),
    // Only enable when basePath is ready, user enabled it, and we have future dates
    enabled: enabled && isBasePathReady && futureDates.length > 0,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return { data: data ?? null, loading: isLoading, error: error ?? null };
};
