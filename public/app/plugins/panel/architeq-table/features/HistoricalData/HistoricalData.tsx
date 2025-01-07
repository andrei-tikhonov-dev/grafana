import React from 'react';

import { CustomCellRendererProps } from '@grafana/ui';

import { DataTable } from '../../components/DataTable/DataTable';
import { RequestMethod } from '../../constants';
import { useRequest } from '../../hooks/useRequest';
import { TablePanelProps } from '../../types';
import { getRowIdentifiers } from '../../utils';

import { HistoricDataColumns } from './constants';
import { HistoricalDataUpdatePayload } from './types';
import { configData, mapPayload } from './utils';

interface Props extends TablePanelProps {}

export const HistoricalData: React.FC<Props> = ({ options, data, width, height }) => {
  const dataFrame = data.series[0];
  const editableFields = options?.editableFields?.length
    ? options?.editableFields
    : [HistoricDataColumns.Capacity, HistoricDataColumns.Happiness, HistoricDataColumns.StoryPoints];
  const idField = options.idField || HistoricDataColumns.SprintId;
  const configuredData = configData(dataFrame, editableFields, [idField]);
  const rowIdentifiers = getRowIdentifiers(idField, dataFrame);

  const { updateRequest, loading } = useRequest({
    update: {
      url: options.updateUrl,
      method: RequestMethod.POST,
    },
  });

  const handleUpdate = async (value: number | string, { rowIndex, field }: CustomCellRendererProps) => {
    const payload: HistoricalDataUpdatePayload = mapPayload(Number(value), rowIdentifiers[rowIndex], field.name);
    return updateRequest(payload);
  };

  return <DataTable width={width} height={height} onUpdate={handleUpdate} data={configuredData} loading={loading} />;
};
