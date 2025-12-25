import { Configuration } from '@architeq/core-api-client';
import React, { createContext, useContext, useMemo } from 'react';

interface ApiContextType {
  config: Configuration;
}

const ApiContext = createContext<ApiContextType | null>(null);

interface ApiProviderProps {
  basePath?: string;
  children: React.ReactNode;
}

export const ApiProvider: React.FC<ApiProviderProps> = ({ basePath, children }) => {
  const api = useMemo(() => {
    const config = new Configuration({
      basePath,
    });

    return {
      config,
    };
  }, [basePath]);

  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
};

export const useApi = (): ApiContextType => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
};
