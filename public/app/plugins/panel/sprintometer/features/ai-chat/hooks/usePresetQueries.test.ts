import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import React from 'react';

import type { AiServiceClient } from '../api/aiServiceClient';
import type { AiServiceRequestContext } from '../api/aiServiceTypes';
import { DEFAULT_START_PROMPTS } from '../utils/defaults';

import { usePresetQueries } from './usePresetQueries';

const CTX: AiServiceRequestContext = { teamId: 't1', boardType: 'daily', userId: 'u1' };

function createWrapper(): React.FC<{ children: React.ReactNode }> {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
  Wrapper.displayName = 'TestQueryClientWrapper';
  return Wrapper;
}

function mockClient(overrides: Partial<AiServiceClient> = {}): AiServiceClient {
  return {
    getPromptConfig: jest.fn(),
    savePrompt: jest.fn(),
    improvePrompt: jest.fn(),
    getPresetActions: jest.fn().mockResolvedValue([]),
    ...overrides,
  };
}

describe('usePresetQueries', () => {
  it('returns DEFAULT_START_PROMPTS when panelIds is empty', () => {
    const client = mockClient();
    const { result } = renderHook(() => usePresetQueries(client, CTX, []), {
      wrapper: createWrapper(),
    });

    expect(result.current.data).toEqual(DEFAULT_START_PROMPTS);
    expect(result.current.isLoading).toBe(false);
    expect(client.getPresetActions).not.toHaveBeenCalled();
  });

  it('fetches and maps preset actions when panelIds is non-empty', async () => {
    const client = mockClient({
      getPresetActions: jest.fn().mockResolvedValue([
        { id: '1', label: 'Label A', query: 'Query A' },
        { id: '2', label: 'Label B', query: 'Query B' },
      ]),
    });

    const { result } = renderHook(() => usePresetQueries(client, CTX, ['p1', 'p2']), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toEqual(['Query A', 'Query B']);
    expect(client.getPresetActions).toHaveBeenCalledWith(CTX, ['p1', 'p2']);
  });

  it('falls back to DEFAULT_START_PROMPTS when API returns empty array', async () => {
    const client = mockClient({
      getPresetActions: jest.fn().mockResolvedValue([]),
    });

    const { result } = renderHook(() => usePresetQueries(client, CTX, ['p1']), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toEqual(DEFAULT_START_PROMPTS);
  });

  it('falls back to DEFAULT_START_PROMPTS on API error', async () => {
    const client = mockClient({
      getPresetActions: jest.fn().mockRejectedValue(new Error('Network error')),
    });

    const { result } = renderHook(() => usePresetQueries(client, CTX, ['p1']), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.data).toEqual(DEFAULT_START_PROMPTS);
  });

  it('reports isLoading during fetch', async () => {
    let resolve: (value: unknown) => void;
    const pending = new Promise((r) => {
      resolve = r;
    });
    const client = mockClient({
      getPresetActions: jest.fn().mockReturnValue(pending),
    });

    const { result } = renderHook(() => usePresetQueries(client, CTX, ['p1']), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    resolve!([{ id: '1', label: 'Done', query: 'Done query' }]);
    await waitFor(() => expect(result.current.isLoading).toBe(false));
  });
});
