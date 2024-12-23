import { useMemo, useState } from 'react';

import { DataFrame } from '@grafana/data';

import { getFilterOptions } from '../utils';

export const useFilters = <T>(
  configuredData: DataFrame,
  fieldName: string,
  filter: (data: DataFrame, fieldName: string, filters: T) => DataFrame
) => {
  const [filters, setFilters] = useState<T | undefined>();
  const filterOptions = getFilterOptions(configuredData, [fieldName]);

  const handleFiltersChange = (newFilters: T) => {
    setFilters(newFilters);
  };

  const filteredData = useMemo(() => {
    return filter(configuredData, fieldName, filters as T);
  }, [configuredData, filters, fieldName, filter]);

  return {
    filters,
    filterOptions,
    handleFiltersChange,
    filteredData,
  };
};
