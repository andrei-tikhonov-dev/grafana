import React from 'react';

import { CustomCellRendererProps } from '@grafana/ui';

import { DataTable } from '../../components/DataTable/DataTable';
import { FormModalWrapper } from '../../components/FormModalWrapper';
import { HeaderContainer } from '../../components/HeaderContainer';
import { RequestMethod } from '../../constants';
import { useRequest } from '../../hooks/useRequest';
import { TablePanelProps } from '../../types';
import { convertDateToBE } from '../../utils';

import { AddPiForm } from './AddPiForm';
import { PiFields, hiddenFields } from './constants';
import { PiAdminCreateFormType, PiAdminCreatePayload, PiAdminMetaType, PiAdminUpdatePayload } from './types';
import { configBudgetData, getPayloadIDs } from './utils';

const HEADER_HEIGHT = 45;

interface Props extends TablePanelProps {}

export const PiAdminTool: React.FC<Props> = ({ options, data, width, height }) => {
  const dataFrame = data.series[0];
  const payloadIDs = getPayloadIDs(dataFrame);
  const {
    custom: { dsoId },
  } = dataFrame.meta as PiAdminMetaType;
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
  const handleUpdate = async (value: number | string, { rowIndex, field }: CustomCellRendererProps) => {
    const payload: PiAdminUpdatePayload = {
      propertyName: field.name,
      value,
    };
    return updateRequest(payload, String(payloadIDs[rowIndex].id));
  };

  const handleDelete = (rowIndex: number) => {
    return deleteRequest(null, payloadIDs[rowIndex].id);
  };

  const handleCreate = async (data: PiAdminCreateFormType) => {
    const payload: PiAdminCreatePayload = {
      dsoId,
      startDate: convertDateToBE(data[PiFields.StartDate]) || '',
      endDate: convertDateToBE(data[PiFields.EndDate]) || '',
      name: data[PiFields.PiName],
    };
    return createRequest(payload);
  };

  const configuredData = configBudgetData({ dataFrame, hiddenFields, handleDelete });

  return (
    <>
      <HeaderContainer>
        <FormModalWrapper title="Add PI">
          {({ onClose }) => <AddPiForm onClose={onClose} onCreate={handleCreate} />}
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
