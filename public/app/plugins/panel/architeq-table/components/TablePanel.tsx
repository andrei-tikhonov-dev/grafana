import React, { useCallback, useState } from 'react';

import { AlertErrorPayload, AlertPayload, AppEvents, PanelProps } from '@grafana/data';
import { PanelDataErrorView, getAppEvents } from '@grafana/runtime';
import { CustomCellRendererProps } from '@grafana/ui';

import { LoadingMode } from '../constants';
import { PanelOptions } from '../types';
import { createUpdatePayload, getRowIdentifiers, UpdateDTO } from '../utils';

import { DataTable } from './DataTable/DataTable';
import { updateDataFrame } from './DataTable/buildData';

interface Props extends PanelProps<PanelOptions> {}

export const TablePanel: React.FC<Props> = ({ options, data, width, height, fieldConfig, id }) => {
  const dataFrame = data.series[0];
  const updatedDataFrame = updateDataFrame(dataFrame, options.editableFields, [options.idField]);
  const rowIdentifiers = getRowIdentifiers(options.idField, dataFrame);

  const appEvents = getAppEvents();
  const notifyError = useCallback(
    (payload: AlertErrorPayload) => appEvents.publish({ type: AppEvents.alertError.name, payload }),
    [appEvents]
  );
  const notifySuccess = useCallback(
    (payload: AlertPayload) => appEvents.publish({ type: AppEvents.alertSuccess.name, payload }),
    [appEvents]
  );

  // @ts-ignore
  const [loading, setLoading] = useState<LoadingMode>(LoadingMode.NONE);

  const updateData = async (payload: UpdateDTO): Promise<boolean> => {
    setLoading(LoadingMode.UPDATE);

    const headers: HeadersInit = new Headers();
    headers.set('Content-Type', 'application/json');

    options.update.header?.forEach((parameter: any) => {
      const name = parameter.name;
      if (!name) {
        return;
      }

      headers.set(name, parameter.value);
    });

    let response: Response | null = null;
    try {
      response = await fetch(options.update.url, {
        method: options.update.method,
        headers,
        body: JSON.stringify(payload),
      });
    } catch (error) {
      setLoading(LoadingMode.NONE);
      return false;
    }

    if (!response.ok) {
      notifyError(['Failed to update data.']);
      setLoading(LoadingMode.NONE);
      return false;
    } else {
      notifySuccess([`${payload.propertyName} updated successfully.`]);
      setLoading(LoadingMode.NONE);
      return true;
    }
  };

  const handleDataUpdate = async (value: number, cellProps: CustomCellRendererProps) => {
    const { rowIndex, field } = cellProps;
    const payload = createUpdatePayload(value, rowIdentifiers[rowIndex], field.name);
    return updateData(payload);
  };

  if (data.series.length === 0) {
    return <PanelDataErrorView fieldConfig={fieldConfig} panelId={id} data={data} />;
  }

  return (
    <DataTable
      width={width}
      height={height}
      onDataUpdate={handleDataUpdate}
      data={updatedDataFrame}
      loading={loading}
    />
  );
};
