import React, { useState } from 'react';

import { CustomCellRendererProps } from '@grafana/ui';

import { DataTable } from '../../components/DataTable/DataTable';
import { useRequest } from '../../hooks/useRequest';
import { TablePanelProps } from '../../types';

import { FILTER_HEIGHT, SprintPlaningFilters } from './SprintPlaningFilters';
import { INFO_HEIGHT, SprintPlaningInfo } from './SprintPlaningInfo';
import { SprintPlaningColumns } from './constants';
import { SprintPlaningFiltersType, SprintPlaningInfoType, SprintPlaningPayload } from './types';
import { configData, filterData, getFilterOptions } from './utils';

interface Props extends TablePanelProps {}

export const SprintPlaning: React.FC<Props> = ({ options, data, width, height }) => {
  const [filters, setFilters] = useState<SprintPlaningFiltersType>({ teamMembers: [] });
  const dataFrame = data.series[0];
  const configuredData = configData(dataFrame);
  const handleOnChange = (filters: SprintPlaningFiltersType) => {
    setFilters(filters);
  };

  const { names } = getFilterOptions(configuredData);
  const filteredData = filterData(configuredData, filters);
  const info = dataFrame.meta?.custom as SprintPlaningInfoType;

  const { update, loading } = useRequest<SprintPlaningPayload>(options);

  const handleUpdate = async (value: number, props: CustomCellRendererProps) => {
    const { frame, rowIndex } = props;
    const teamMembers = frame.fields.find((field: any) => field.name === SprintPlaningColumns.TeamMember)?.values || [];
    const email = teamMembers[rowIndex]?.email;
    const payload = {
      sprintId: info.sprintId,
      teamMemberEmail: email,
      capacity: value,
    };

    return update(payload);
  };

  const handleTotalUpdate = async (value?: number) => {
    const payload = {
      sprintId: info.sprintId,
      capacity: Number(value),
    };

    return update(payload);
  };

  return (
    <>
      <SprintPlaningInfo {...info} loading={loading} onUpdate={handleTotalUpdate} />
      <SprintPlaningFilters onChange={handleOnChange} assignees={names} />
      <DataTable
        width={width}
        height={height - FILTER_HEIGHT - INFO_HEIGHT}
        data={filteredData}
        baseUrl={options.baseUrl}
        loading={loading}
        onUpdate={handleUpdate}
      />
    </>
  );
};
