import { css } from '@emotion/css';
import React from 'react';

import { CustomCellRendererProps, useStyles2 } from '@grafana/ui';

import { DataTable } from '../../components/DataTable/DataTable';
import { RequestMethod } from '../../constants';
import { useRequest } from '../../hooks/useRequest';
import { TablePanelProps } from '../../types';

import { TeamAdminToolAddUserButton } from './TeamAdminToolAddUserButton';
import { TeamAdminToolFilters, FILTER_HEIGHT } from './TeamAdminToolFilters';
import { hiddenFields } from './constants';
import { useTeamAdminFilters } from './hooks/useTeamAdminFilters';
import {
  TeamAdminToolCreateTableType,
  TeamAdminToolDeletePayload,
  TeamAdminToolMetaType,
  TeamAdminToolRoleType,
  TeamAdminToolUpdatePayload,
} from './types';
import { configTeamAdminToolData, getPayloadIDs, mapTeamAdminToolCreatePayload } from './utils';

interface Props extends TablePanelProps {}

const getStyles = () => {
  return {
    container: css`
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
      max-width: 800px;
    `,
  };
};

export const TeamAdminTool: React.FC<Props> = ({ options, data, width, height }) => {
  const dataFrame = data.series[0];
  const payloadIDs = getPayloadIDs(dataFrame);
  const styles = useStyles2(getStyles);
  const {
    custom: { availableRoles, teamId, maxWorkload },
  } = dataFrame.meta as TeamAdminToolMetaType;
  const { createRequest, updateRequest, deleteRequest, loading } = useRequest({
    create: {
      url: options.createUrl,
      method: RequestMethod.POST,
    },
    update: {
      url: options.updateUrl,
      method: RequestMethod.POST,
    },
    delete: {
      url: options.deleteUrl,
      method: RequestMethod.DELETE,
    },
  });
  const roles: TeamAdminToolRoleType[] = availableRoles || [];
  const handleUpdate = async (value: number | string, { rowIndex, field }: CustomCellRendererProps) => {
    const { teamId, memberId } = payloadIDs[rowIndex];
    const payload: TeamAdminToolUpdatePayload = {
      memberId: Number(memberId),
      teamId: Number(teamId),
      propertyName: field.name,
      value,
    };
    return updateRequest(payload);
  };

  const handleDelete = (rowIndex: number) => {
    const { teamId, memberId } = payloadIDs[rowIndex];
    const payload: TeamAdminToolDeletePayload = {
      memberId: Number(memberId),
      teamId: Number(teamId),
    };
    return deleteRequest(payload);
  };

  const handleCreate = async (data: TeamAdminToolCreateTableType) => {
    const payload = mapTeamAdminToolCreatePayload(data, teamId);
    return createRequest(payload);
  };

  const configuredData = configTeamAdminToolData({ dataFrame, hiddenFields, handleDelete });

  const { handleFiltersChange, filteredData, filterOptions } = useTeamAdminFilters(configuredData);

  return (
    <>
      <div className={styles.container}>
        <TeamAdminToolFilters onChange={handleFiltersChange} teamMembers={filterOptions.teamMembers} />
        <TeamAdminToolAddUserButton onHandleCreate={handleCreate} roles={roles} maxWorkload={maxWorkload} />
      </div>

      <DataTable
        width={width}
        height={height - FILTER_HEIGHT}
        data={filteredData}
        loading={loading}
        onUpdate={handleUpdate}
      />
    </>
  );
};
