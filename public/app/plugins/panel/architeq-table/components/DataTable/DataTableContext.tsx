import React, { createContext, useContext, useState, ReactNode } from 'react';

import { LoadingMode } from '../../constants';
import { UpdateHandler } from '../../types';

interface DataCellContextType {
  data: Record<number, number[]>;
  addItem: (seriesIndex: number, item: number) => void;
  removeItem: (seriesIndex: number, item: number) => void;
  hasItem: (seriesIndex: number, item: number) => boolean;
  updateData?: UpdateHandler;
  loading?: LoadingMode;
  baseUrl?: string;
}

const DataTableContext = createContext<DataCellContextType | undefined>(undefined);

export const DataCellProvider: React.FC<{
  children: ReactNode;
  onUpdate?: UpdateHandler;
  loading?: LoadingMode;
  baseUrl?: string;
}> = ({ children, onUpdate, loading, baseUrl }) => {
  const [data, setData] = useState<Record<number, number[]>>({});

  const addItem = (seriesIndex: number, item: number) => {
    setData((prevData) => {
      const series = prevData[seriesIndex] || [];
      return {
        ...prevData,
        [seriesIndex]: [...series, item],
      };
    });
  };

  const hasItem = (seriesIndex: number, item: number): boolean => {
    const series = data[seriesIndex] || [];
    return series.includes(item);
  };

  const removeItem = (seriesIndex: number, item: number) => {
    setData((prevData) => {
      const series = prevData[seriesIndex] || [];
      return {
        ...prevData,
        [seriesIndex]: series.filter((i) => i !== item),
      };
    });
  };

  return (
    <DataTableContext.Provider value={{ data, addItem, removeItem, hasItem, updateData: onUpdate, baseUrl, loading }}>
      {children}
    </DataTableContext.Provider>
  );
};

export const useDataTableContext = (): DataCellContextType => {
  const context = useContext(DataTableContext);
  if (!context) {
    throw new Error('useDataCellContext must be used within a DataCellProvider');
  }
  return context;
};
