import { css } from '@emotion/css';
import React, { useState } from 'react';

import { CustomCellRendererProps, useStyles2 } from '@grafana/ui';

import { DataTable } from '../../components/DataTable/DataTable';
import { FilterInputWrapper } from '../../components/FilterInputWrapper';
import { RequestMethod } from '../../constants';
import { useRequest } from '../../hooks/useRequest';
import { useSwitch } from '../../hooks/useSwitch';
import { TablePanelProps } from '../../types';

import { FILTER_HEIGHT, SprintPlaningFilters } from './SprintPlaningFilters';
import { INFO_HEIGHT, SprintPlaningInfo } from './SprintPlaningInfo';
import { SprintPlaningColumns } from './constants';
import { SprintPlaningFiltersType, SprintPlaningInfoType, SprintPlaningPayload } from './types';
import {
  configRolesFrame,
  configTeamMembersFrame,
  filterRoles,
  filterTeamMembers,
  getRoleOptions,
  getTeamMemberOptions,
} from './utils';

interface Props extends TablePanelProps {}

const getStyles = () => {
  return {
    filterContainer: css`
      display: flex;
      gap: 2px;
      max-width: 800px;
      padding-bottom: 20px;
    `,
  };
};

export const SprintPlaning: React.FC<Props> = ({ options, data, width, height }) => {
  const styles = useStyles2(getStyles);
  const { switchComponent, isChecked: isGroupedByRole } = useSwitch({ label: 'Group by roles' });
  const [filters, setFilters] = useState<SprintPlaningFiltersType>({ teamMembers: [], roles: [] });

  const teamMembersFrame = data.series[0];
  const rolesFrame = data.series[1];

  const tableHeight = height - FILTER_HEIGHT - INFO_HEIGHT - 20;
  const info = teamMembersFrame.meta?.custom as SprintPlaningInfoType;

  const configuredTeamMembersFrame = configTeamMembersFrame(teamMembersFrame);
  const configuredRolesFrame = rolesFrame ? configRolesFrame(rolesFrame) : rolesFrame;

  const handleFiltersChange = (filters: SprintPlaningFiltersType) => {
    setFilters(filters);
  };

  const teamMembers = getTeamMemberOptions(configuredTeamMembersFrame);
  const roles = rolesFrame ? getRoleOptions(configuredRolesFrame) : [];
  const filteredTeamMembersFrame = filterTeamMembers(configuredTeamMembersFrame, filters);
  const filteredRolesFrame = filterRoles(configuredRolesFrame, filters);

  const dataFrame = isGroupedByRole ? filteredRolesFrame : filteredTeamMembersFrame;

  const { updateRequest, loading } = useRequest({
    update: {
      url: options.updateUrl,
      method: RequestMethod.POST,
    },
  });

  const handleUpdate = async (value: number | string, props: CustomCellRendererProps) => {
    const { frame, rowIndex } = props;
    const teamMembers = frame.fields.find((field: any) => field.name === SprintPlaningColumns.TeamMember)?.values || [];
    const email = teamMembers[rowIndex]?.email;
    const payload: SprintPlaningPayload = {
      sprintId: info.sprintId,
      teamMemberEmail: email,
      capacity: value as number,
    };

    return updateRequest(payload);
  };

  const handleTotalUpdate = async (value?: number) => {
    const payload: SprintPlaningPayload = {
      sprintId: info.sprintId,
      capacity: Number(value),
    };

    return updateRequest(payload);
  };

  return (
    <>
      <SprintPlaningInfo {...info} loading={loading} onUpdate={handleTotalUpdate} />
      <div className={styles.filterContainer}>
        <SprintPlaningFilters
          onChange={handleFiltersChange}
          teamMembers={teamMembers}
          roles={roles}
          isGroupedByRole={isGroupedByRole}
        />
        {rolesFrame && <FilterInputWrapper>{switchComponent}</FilterInputWrapper>}
      </div>

      <DataTable
        width={width}
        height={tableHeight}
        data={dataFrame}
        baseUrl={options.baseUrl}
        loading={loading}
        onUpdate={handleUpdate}
      />
    </>
  );
};
