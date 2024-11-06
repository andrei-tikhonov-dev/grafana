import React, { useState } from 'react';

import { DataTable } from '../../components/DataTable/DataTable';
import { TablePanelProps } from '../../types';

import { CurrentSprintFilters, FILTER_HEIGHT } from './CurrentSprintFilters';
import { Filters } from './types';
import { configCurrentSprintData, filterData, getFilterOptions } from './utils';

interface Props extends TablePanelProps {}

export const CurrentSprint: React.FC<Props> = ({ options, data, width, height }) => {
  const [filters, setFilters] = useState<Filters>({ teamMembers: [], status: [] });
  const dataFrame = data.series[0];
  const configuredData = configCurrentSprintData(dataFrame);
  const handleOnChange = (filters: Filters) => {
    setFilters(filters);
  };

  const { assignees, statuses } = getFilterOptions(configuredData);
  const filteredData = filterData(configuredData, filters);

  return (
    <>
      <CurrentSprintFilters onChange={handleOnChange} assignees={assignees} statuses={statuses} />
      <DataTable width={width} height={height - FILTER_HEIGHT} data={filteredData} baseUrl={options.baseUrl} />
    </>
  );
};
