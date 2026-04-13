import { useMemo } from 'react';

import type { AiServiceClient } from '../api/aiServiceClient';
import { createAiServiceClientAdapter } from '../api/createAiServiceClientAdapter';

export function useAiServiceClient(basePath: string): AiServiceClient {
  return useMemo(() => createAiServiceClientAdapter(basePath), [basePath]);
}
