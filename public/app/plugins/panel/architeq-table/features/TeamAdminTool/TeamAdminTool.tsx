import React from 'react';

import { CustomCellRendererProps } from '@grafana/ui';

import { DataTable } from '../../components/DataTable/DataTable';
import { FormModalWrapper } from '../../components/FormModalWrapper';
import { HeaderContainer } from '../../components/HeaderContainer';
import { RequestMethod } from '../../constants';
import { useFilters } from '../../hooks/useFilters';
import { useRequest } from '../../hooks/useRequest';
import { RoleType, TablePanelProps } from '../../types';

import { AddUserForm } from './AddUserForm';
import { TeamAdminToolFilters, FILTER_HEIGHT } from './TeamAdminToolFilters';
import { hiddenFields, TeamAdminToolFields } from './constants';
import {
  TeamAdminFiltersType,
  TeamAdminToolCreateTableType,
  TeamAdminToolDeletePayload,
  TeamAdminToolMetaType,
  TeamAdminToolUpdatePayload,
} from './types';
import { configTeamAdminToolData, filterTeamAdminTool, getPayloadIDs, mapCreateUserPayload } from './utils';

interface Props extends TablePanelProps {}

export const TeamAdminTool: React.FC<Props> = ({ options, data, width, height }) => {
  const dataFrame = data.series[0];
  const filterField = TeamAdminToolFields.TeamMember;
  const payloadIDs = getPayloadIDs(dataFrame);
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
  const roles: RoleType['availableRoles'] = availableRoles || [];

  const handleUpdate = async (value: number | string, { rowIndex, field }: CustomCellRendererProps) => {
    const { teamId, memberId } = payloadIDs[rowIndex];

    const payload: TeamAdminToolUpdatePayload = {
      memberId: Number(memberId),
      teamId: Number(teamId),
      propertyName: field.name,
      value: field.name === TeamAdminToolFields.Role ? { updatedRoles: value } : value,
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
    const payload = mapCreateUserPayload(data, teamId);
    return createRequest(payload);
  };

  const configuredData = configTeamAdminToolData({ dataFrame, hiddenFields, handleDelete, maxWorkload });

  const { handleFiltersChange, filteredData, filterOptions } = useFilters<TeamAdminFiltersType>(
    configuredData,
    filterField,
    filterTeamAdminTool
  );

  return (
    <>
      <HeaderContainer>
        <TeamAdminToolFilters onChange={handleFiltersChange} teamMembers={filterOptions[filterField]} />
        <FormModalWrapper title="Add team member">
          {({ onClose }) => (
            <AddUserForm onClose={onClose} roles={roles} maxWorkload={maxWorkload} onCreate={handleCreate} />
          )}
        </FormModalWrapper>
      </HeaderContainer>

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
