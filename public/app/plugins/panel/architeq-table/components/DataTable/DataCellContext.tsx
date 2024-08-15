import React, { createContext, useContext, useState, ReactNode } from 'react';

import { LoadingMode } from '../../constants';
import { UpdateDataHandler } from '../../types';

interface DataCellContextType {
  data: Record<number, number[]>;
  updateData: UpdateDataHandler;
  addItem: (seriesIndex: number, item: number) => void;
  removeItem: (seriesIndex: number, item: number) => void;
  hasItem: (seriesIndex: number, item: number) => boolean;
  loading?: LoadingMode;
}

const DataCellContext = createContext<DataCellContextType | undefined>(undefined);

export const DataCellProvider: React.FC<{
  children: ReactNode;
  onDataUpdate: UpdateDataHandler;
  loading?: LoadingMode;
}> = ({ children, onDataUpdate, loading }) => {
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
    <DataCellContext.Provider value={{ data, addItem, removeItem, hasItem, updateData: onDataUpdate, loading }}>
      {children}
    </DataCellContext.Provider>
  );
};

export const useDataCellContext = (): DataCellContextType => {
  const context = useContext(DataCellContext);
  if (!context) {
    throw new Error('useDataCellContext must be used within a DataCellProvider');
  }
  return context;
};
