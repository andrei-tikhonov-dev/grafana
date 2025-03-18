import React from 'react';

import { CustomCellRendererProps } from '@grafana/ui';

import { DataTable } from '../../components/DataTable/DataTable';
import { FormModalWrapper } from '../../components/FormModalWrapper';
import { HeaderContainer } from '../../components/HeaderContainer';
import { RequestMethod } from '../../constants';
import { useRequest } from '../../hooks/useRequest';
import { TablePanelProps } from '../../types';

import { AddRoleForm } from './AddRoleForm';
import { RoleFields, hiddenFields } from './constants';
import { RoleCreateFormType, RoleCreatePayload, RoleDeletePayload, RoleMetaType, RoleUpdatePayload } from './types';
import { configRolesData, getPayloadIDs } from './utils';

const HEADER_HEIGHT = 45;

interface Props extends TablePanelProps {}

export const RolesTool: React.FC<Props> = ({ options, data, width, height }) => {
  const dataFrame = data.series[0];
  const payloadIDs = getPayloadIDs(dataFrame);
  const {
    custom: { teamId },
  } = dataFrame.meta as RoleMetaType;
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

  const handleUpdate = async (value: string, { rowIndex, field }: CustomCellRendererProps) => {
    const payload: RoleUpdatePayload = {
      id: Number(payloadIDs[rowIndex].id),
      teamId: String(teamId),
      propertyName: field.name,
      value: value,
    };

    return updateRequest(payload);
  };

  const handleDelete = (rowIndex: number) => {
    const payload: RoleDeletePayload = {
      id: String(payloadIDs[rowIndex].id),
    };
    return deleteRequest(payload);
  };

  const handleCreate = async (data: RoleCreateFormType) => {
    const payload: RoleCreatePayload = {
      teamId,
      roleName: data[RoleFields.RoleName],
    };
    return createRequest(payload);
  };
  const configuredData = configRolesData({ dataFrame, hiddenFields, handleDelete });

  return (
    <>
      <HeaderContainer>
        <FormModalWrapper title="Add role">
          {({ onClose }) => <AddRoleForm onClose={onClose} onCreate={handleCreate} />}
        </FormModalWrapper>
      </HeaderContainer>

      <DataTable
        width={width}
        height={height - HEADER_HEIGHT}
        data={configuredData}
        loading={loading}
        onUpdate={handleUpdate}
      />
    </>
  );
};
