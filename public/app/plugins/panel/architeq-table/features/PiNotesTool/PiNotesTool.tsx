import React from 'react';

import { CustomCellRendererProps } from '@grafana/ui';

import { DataTable } from '../../components/DataTable/DataTable';
import { RequestMethod } from '../../constants';
import { useRequest } from '../../hooks/useRequest';
import { TablePanelProps } from '../../types';

import { hiddenFields } from './constants';
import { PiNotesUpdatePayload } from './types';
import { configData, getRowPayloadData } from './utils';

interface Props extends TablePanelProps {}

export const PiNotesTool: React.FC<Props> = ({ options, data, width, height }) => {
  const dataFrame = data.series[0];
  const rowPayloadData = getRowPayloadData(dataFrame);
  const configuredData = configData(dataFrame, hiddenFields);

  const { updateRequest, loading } = useRequest({
    update: {
      url: options.updateUrl,
      method: RequestMethod.POST,
    },
  });

  const handleUpdate = async (value: number | string, { rowIndex }: CustomCellRendererProps) => {
    const payload: PiNotesUpdatePayload = {
      id: rowPayloadData[rowIndex].id,
      configId: rowPayloadData[rowIndex].configId,
      propertyName: 'NOTES',
      value: String(value),
    };
    return updateRequest(payload);
  };

  return <DataTable width={width} height={height} onUpdate={handleUpdate} data={configuredData} loading={loading} />;
};
