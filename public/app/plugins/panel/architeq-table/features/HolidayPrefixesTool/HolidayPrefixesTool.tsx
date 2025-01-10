import React from 'react';

import { CustomCellRendererProps } from '@grafana/ui';

import { DataTable } from '../../components/DataTable/DataTable';
import { FormModalWrapper } from '../../components/FormModalWrapper';
import { HeaderContainer } from '../../components/HeaderContainer';
import { RequestMethod } from '../../constants';
import { useRequest } from '../../hooks/useRequest';
import { TablePanelProps } from '../../types';

import { AddPrefix } from './AddPrefix';
import { hiddenFields } from './constants';
import {
  HolidayPrefixesCreateTableType,
  HolidayPrefixesToolMetaType,
  HolidayPrefixesUpdatePayload,
  HolidayPrefixesCreatePayload,
} from './types';
import { configTeamHolidaysToolData, getPayloadIDs } from './utils';

const HEADER_HEIGHT = 45;

interface Props extends TablePanelProps {}

export const HolidayPrefixesTool: React.FC<Props> = ({ options, data, width, height }) => {
  const dataFrame = data.series[0];
  const payloadIDs = getPayloadIDs(dataFrame);
  const {
    custom: { teamId, types },
  } = dataFrame.meta as HolidayPrefixesToolMetaType;
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

  const typeOptions = types.map((type) => ({ label: type, value: type }));

  const handleUpdate = async (value: string, { rowIndex, field }: CustomCellRendererProps) => {
    const payload: HolidayPrefixesUpdatePayload = {
      propertyName: field.name,
      value,
    };
    return updateRequest(payload, payloadIDs[rowIndex].id);
  };

  const handleDelete = (rowIndex: number) => {
    const id = String(payloadIDs[rowIndex].id);
    return deleteRequest(null, id);
  };

  const handleCreate = async (data: HolidayPrefixesCreateTableType) => {
    const payload: HolidayPrefixesCreatePayload = {
      teamId,
      type: data.type,
      relevantForCapacity: data.relevantForCapacity,
      showInCalendar: data.showInCalendar,
      prefix: data.prefix,
    };
    return createRequest(payload);
  };

  const configuredData = configTeamHolidaysToolData({ dataFrame, hiddenFields, handleDelete, typeOptions });

  return (
    <>
      <HeaderContainer>
        <FormModalWrapper title="Add prefix">
          {({ onClose }) => <AddPrefix onClose={onClose} onCreate={handleCreate} typeOptions={typeOptions} />}
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
