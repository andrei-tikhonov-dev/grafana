import { useQuery } from '@tanstack/react-query';

import type { AiServiceClient } from '../api/aiServiceClient';
import type { AiServiceRequestContext } from '../api/aiServiceTypes';
import { DEFAULT_START_PROMPTS } from '../utils/defaults';

interface UsePresetQueriesResult {
  data: string[];
  isLoading: boolean;
  isError: boolean;
}

export function usePresetQueries(
  client: AiServiceClient,
  ctx: AiServiceRequestContext,
  panelIds: string[]
): UsePresetQueriesResult {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['preset-queries', ctx.teamId, ctx.boardType, ctx.userId, panelIds.slice().sort().join(',')],
    queryFn: () => client.getPresetActions(ctx, panelIds),
    select: (presetActions) => presetActions.map((a) => a.query),
    enabled: panelIds.length > 0,
    staleTime: 300_000,
  });

  return {
    data: data && data.length > 0 ? data : DEFAULT_START_PROMPTS,
    isLoading,
    isError,
  };
}
