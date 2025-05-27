import React, { useState } from 'react';

import { CustomCellRendererProps } from '@grafana/ui';

import { DataTable } from '../../components/DataTable/DataTable';
import { HeaderContainer } from '../../components/HeaderContainer';
import { RequestMethod } from '../../constants';
import { useRequest } from '../../hooks/useRequest';
import { TablePanelProps } from '../../types';
import { getPayloadIDs } from '../../utils';

import { JiraStatusMapperFilters } from './JiraStatusMapperFilters';
import { hiddenFields, JiraStatusMapperToolFields } from './constants';
import { JiraStatusMapperToolMetaType, JiraStatusMapperToolUpdatePayload } from './types';
import { configJiraStatusMapperToolData, filterData, getFilterOptions } from './utils';

const HEADER_HEIGHT = 45;

interface Props extends TablePanelProps {}

export const JiraStatusMapperTool: React.FC<Props> = ({ options, data, width, height }) => {
  const dataFrame = data.series[0];
  const payloadIDs = getPayloadIDs(dataFrame, JiraStatusMapperToolFields.Id);
  const boards = getFilterOptions(dataFrame);
  const [filter, setFilter] = useState<string>(boards[0] || '');

  const {
    custom: { types },
  } = dataFrame.meta as JiraStatusMapperToolMetaType;
  const { updateRequest, loading } = useRequest({
    update: {
      url: options.updateUrl,
      method: RequestMethod.POST,
    },
  });

  const typeOptions = types.map((type) => ({ label: type, value: type }));

  const handleUpdate = async (value: string, { rowIndex, field }: CustomCellRendererProps) => {
    const payload: JiraStatusMapperToolUpdatePayload = {
      propertyName: field.name,
      value: String(value),
    };
    return updateRequest(payload, payloadIDs[rowIndex].id);
  };

  const filteredData = filterData(dataFrame, filter);
  const configuredData = configJiraStatusMapperToolData({ dataFrame: filteredData, hiddenFields, typeOptions });

  return (
    <>
      <HeaderContainer>
        <JiraStatusMapperFilters options={boards} onChange={setFilter} filter={filter} />
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
