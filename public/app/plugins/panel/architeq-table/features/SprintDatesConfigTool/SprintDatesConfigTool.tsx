import React from 'react';

import { CustomCellRendererProps } from '@grafana/ui';

import { DataTable } from '../../components/DataTable/DataTable';
import { RequestMethod } from '../../constants';
import { useRequest } from '../../hooks/useRequest';
import { TablePanelProps } from '../../types';

import { PROPERTY_NAME_MAP } from './constants';
import { SprintDatesConfigToolMetaType, SprintDatesConfigToolUpdatePayload } from './types';
import { configSprintDatesConfigToolData } from './utils';

interface Props extends TablePanelProps {}

export const SprintDatesConfigTool: React.FC<Props> = ({ options, data, width, height }) => {
  const dataFrame = data.series[0];
  const { custom } = dataFrame.meta as SprintDatesConfigToolMetaType;
  const { teamId } = custom;

  const { customUpdateRequest, loading } = useRequest({
    update: {
      url: options.updateUrl,
      method: RequestMethod.POST,
    },
  });

  const handleUpdate = async (value: any, { field }: CustomCellRendererProps) => {
    const property = PROPERTY_NAME_MAP[field.name];

    const payload: SprintDatesConfigToolUpdatePayload = {
      property,
      value: Boolean(value),
    };

    return customUpdateRequest(payload, String(teamId));
  };

  const configuredData = configSprintDatesConfigToolData({ dataFrame });

  return <DataTable width={width} height={height} data={configuredData} loading={loading} onUpdate={handleUpdate} />;
};
