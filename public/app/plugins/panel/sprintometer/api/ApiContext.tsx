import { Configuration } from '@architeq/core-api-client';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { DataSourceRef } from '@grafana/data';
import { getBackendSrv, getDataSourceSrv } from '@grafana/runtime';

import { UiLoadingState } from '../components/ui/loading-state';

/**
 * Context type providing API configuration and readiness state.
 */
interface ApiContextType {
  /** The API Configuration instance */
  config: Configuration;
  /** The resolved basePath URL */
  basePath: string | undefined;
  /** Whether the basePath has been resolved and is ready for use */
  isBasePathReady: boolean;
  /** Error that occurred while resolving basePath, if any */
  basePathError: Error | null;
}

const ApiContext = createContext<ApiContextType | null>(null);

interface ApiProviderProps {
  /** Reference to the Grafana data source */
  dataSourceRef?: DataSourceRef;
  children: React.ReactNode;
}

/**
 * Fetches the basePath URL from a Grafana data source.
 *
 * @param dataSourceRef - Reference to the data source
 * @returns Promise resolving to the basePath URL or undefined
 */
async function fetchBasePath(dataSourceRef: DataSourceRef): Promise<string> {
  const ds = await getDataSourceSrv().get(dataSourceRef);

  if (!ds.uid) {
    throw new Error('Data source UID is not available');
  }

  const rawDs = await getBackendSrv().get<{ url?: string }>(`/api/datasources/uid/${ds.uid}`);

  if (!rawDs.url) {
    throw new Error('Data source URL is not configured');
  }

  try {
    const url = new URL(rawDs.url);
    return url.origin;
  } catch {
    // If URL parsing fails, return the raw URL as-is
    return rawDs.url;
  }
}

/**
 * Provides API configuration to child components.
 *
 * This provider handles the asynchronous resolution of the basePath from Grafana's
 * data source configuration. It ensures that child components are not rendered
 * until the basePath is ready, preventing race conditions where API requests
 * might be made with an undefined or default basePath.
 *
 * @example
 * ```tsx
 * <ApiProvider dataSourceRef={dataSourceRef}>
 *   <MyComponent />
 * </ApiProvider>
 * ```
 */
export const ApiProvider: React.FC<ApiProviderProps> = ({ dataSourceRef, children }) => {
  const [basePath, setBasePath] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(!!dataSourceRef);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!dataSourceRef) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    fetchBasePath(dataSourceRef)
      .then((resolvedBasePath) => {
        setBasePath(resolvedBasePath);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('[ApiProvider] Failed to fetch basePath:', err);
        setError(err instanceof Error ? err : new Error(String(err)));
        setIsLoading(false);
      });
  }, [dataSourceRef]);

  const api = useMemo<ApiContextType>(() => {
    const config = new Configuration({
      basePath,
    });

    return {
      config,
      basePath,
      isBasePathReady: !isLoading && !!basePath,
      basePathError: error,
    };
  }, [basePath, isLoading, error]);

  if (isLoading) {
    return <UiLoadingState />;
  }

  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
};

/**
 * Hook to access the API context.
 *
 * @returns The API context containing configuration and readiness state
 * @throws Error if used outside of ApiProvider
 *
 * @example
 * ```tsx
 * const { config, isBasePathReady } = useApi();
 *
 * // Check readiness before making requests
 * if (!isBasePathReady) {
 *   return <LoadingSpinner />;
 * }
 *
 * const client = createApiClient(config);
 * ```
 */
export const useApi = (): ApiContextType => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
};
