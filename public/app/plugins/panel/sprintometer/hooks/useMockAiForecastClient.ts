import { useMemo } from 'react';

import { createMockAiForecastClient } from '../mock';
import { AiForecastClient } from '../panels/burndown-chart/api/types';
import { TPanelOptions } from '../types';

export function useMockAiForecastClient(options: TPanelOptions): AiForecastClient | undefined {
  const useMock = options.aiChatMock?.useMock ?? false;

  return useMemo(() => {
    if (!useMock) {
      return undefined;
    }

    return createMockAiForecastClient();
  }, [useMock]);
}
