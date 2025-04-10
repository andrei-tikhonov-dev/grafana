import React from 'react';

import { CustomCellRendererProps } from '@grafana/ui';

import { DataTable } from '../../components/DataTable/DataTable';
import { FormModalWrapper } from '../../components/FormModalWrapper';
import { HeaderContainer } from '../../components/HeaderContainer';
import { RequestMethod } from '../../constants';
import { useRequest } from '../../hooks/useRequest';
import { TablePanelProps } from '../../types';

import { AddNameForm } from './AddNameForm';
import { PiNamesFields, hiddenFields } from './constants';
import {
  PiNameCreateFormType,
  PiNameCreatePayload,
  PiNameDeletePayload,
  PiNameMetaType,
  PiNameUpdatePayload,
} from './types';
import { configRolesData, getPayloadIDs } from './utils';

const HEADER_HEIGHT = 45;

interface Props extends TablePanelProps {}

export const PiNamesTool: React.FC<Props> = ({ options, data, width, height }) => {
  const dataFrame = data.series[0];
  const payloadIDs = getPayloadIDs(dataFrame);
  const {
    custom: { artId, piData },
  } = dataFrame.meta as PiNameMetaType;
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

  const piOptions = Object.entries(piData).map(([key, value]) => ({
    label: value,
    value: key,
  }));

  const handleUpdate = async (value: string, { rowIndex, field }: CustomCellRendererProps) => {
    const payload: PiNameUpdatePayload = {
      programIncrementId: Number(payloadIDs[rowIndex].id),
      artId: Number(artId),
      propertyName: field.name,
      value: value,
    };

    return updateRequest(payload);
  };

  const handleDelete = (rowIndex: number) => {
    const payload: PiNameDeletePayload = {
      programIncrementId: Number(payloadIDs[rowIndex].id),
      artId: Number(artId),
    };

    return deleteRequest(payload);
  };

  const handleCreate = async (data: PiNameCreateFormType) => {
    const payload: PiNameCreatePayload = {
      name: data[PiNamesFields.Name],
      programIncrementId: Number(data[PiNamesFields.ID]),
      artId: Number(artId),
    };
    return createRequest(payload);
  };
  const configuredData = configRolesData({ dataFrame, hiddenFields, handleDelete });

  return (
    <>
      <HeaderContainer>
        <FormModalWrapper title="Add name">
          {({ onClose }) => <AddNameForm onClose={onClose} onCreate={handleCreate} piOptions={piOptions} />}
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
