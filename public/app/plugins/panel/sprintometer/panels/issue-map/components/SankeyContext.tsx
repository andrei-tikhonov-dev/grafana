import React, { createContext, useContext } from 'react';

interface SankeyContextProps {
  panelWidth: number;
  panelHeight: number;
  unitLabel: string;
}

const SankeyContext = createContext<SankeyContextProps | undefined>(undefined);

export const useSankeyContext = () => {
  const context = useContext(SankeyContext);
  if (!context) {
    throw new Error('useSankeyContext must be used within a SankeyProvider');
  }
  return context;
};

interface SankeyProviderProps {
  panelWidth: number;
  panelHeight: number;
  unitLabel: string;
  children: React.ReactNode;
}

export const SankeyProvider: React.FC<SankeyProviderProps> = ({ panelWidth, panelHeight, unitLabel, children }) => {
  return <SankeyContext.Provider value={{ panelWidth, panelHeight, unitLabel }}>{children}</SankeyContext.Provider>;
};
