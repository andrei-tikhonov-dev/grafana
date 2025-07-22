import React from 'react';

import { CustomCellRendererProps } from '@grafana/ui';

import { DataTable } from '../../components/DataTable/DataTable';
import { FormModalWrapper } from '../../components/FormModalWrapper';
import { HeaderContainer } from '../../components/HeaderContainer';
import { RequestMethod } from '../../constants';
import { useRequest } from '../../hooks/useRequest';
import { TablePanelProps } from '../../types';

import { AddBoard } from './AddBoard';
import { hiddenFields } from './constants';
import {
  JiraBoardsCreateFormType,
  JiraBoardsToolMetaType,
  JiraBoardsUpdatePayload,
  JiraBoardsCreatePayload,
} from './types';
import { configJiraBoardsToolData, getPayloadIDs } from './utils';

const HEADER_HEIGHT = 45;

interface Props extends TablePanelProps {}

export const JiraBoardsTool: React.FC<Props> = ({ options, data, width, height }) => {
  const dataFrame = data.series[0];
  const payloadIDs = getPayloadIDs(dataFrame);

  const {
    custom: { teamId, types },
  } = dataFrame.meta as JiraBoardsToolMetaType;
  const { createRequest, updateRequest, deleteRequest, loading, isLoading } = useRequest({
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

  const typeOptions = types.map((type) => ({ label: type, value: type }));

  const handleUpdate = async (value: string, { rowIndex, field }: CustomCellRendererProps) => {
    const payload: JiraBoardsUpdatePayload = {
      propertyName: field.name,
      value: String(value),
    };
    return updateRequest(payload, payloadIDs[rowIndex].id);
  };

  const handleDelete = (rowIndex: number) => {
    const id = String(payloadIDs[rowIndex].id);
    return deleteRequest(null, id);
  };

  const handleCreate = async (data: JiraBoardsCreateFormType) => {
    const payload: JiraBoardsCreatePayload = {
      teamId,
      type: data.type,
      name: data.name,
      boardId: data.boardId,
    };
    return createRequest(payload);
  };

  const configuredData = configJiraBoardsToolData({ dataFrame, hiddenFields, handleDelete, typeOptions });

  return (
    <>
      <HeaderContainer>
        <FormModalWrapper title="Add board">
          {({ onClose }) => (
            <AddBoard onClose={onClose} onCreate={handleCreate} typeOptions={typeOptions} isLoading={isLoading} />
          )}
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
