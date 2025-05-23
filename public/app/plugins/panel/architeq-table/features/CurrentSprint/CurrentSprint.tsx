import React, { useState } from 'react';

import { DataTable } from '../../components/DataTable/DataTable';
import { TablePanelProps } from '../../types';

import { CurrentSprintFilters, FILTER_HEIGHT } from './CurrentSprintFilters';
import { CurrentSprintFiltersType } from './types';
import { configCurrentSprintData, filterData, getFilterOptions } from './utils';

interface Props extends TablePanelProps {}

export const CurrentSprint: React.FC<Props> = ({ options, data, width, height }) => {
  const [filters, setFilters] = useState<CurrentSprintFiltersType>({ teamMembers: [], status: [], types: [] });
  const dataFrame = data.series[0];
  const configuredData = configCurrentSprintData(dataFrame);
  const handleOnChange = (filters: CurrentSprintFiltersType) => {
    setFilters(filters);
  };

  const { assignees, statuses, types } = getFilterOptions(configuredData);
  const filteredData = filterData(configuredData, filters);

  return (
    <>
      <CurrentSprintFilters
        onChange={handleOnChange}
        assignees={assignees}
        statuses={statuses}
        types={types}
        filters={filters}
      />
      <DataTable width={width} height={height - FILTER_HEIGHT} data={filteredData} baseUrl={options.baseUrl} />
    </>
  );
};
