import React from 'react';

import { CustomCellRendererProps } from '@grafana/ui';

import { DataTable } from '../../components/DataTable/DataTable';
import { FormModalWrapper } from '../../components/FormModalWrapper';
import { HeaderContainer } from '../../components/HeaderContainer';
import { RequestMethod } from '../../constants';
import { useFilters } from '../../hooks/useFilters';
import { useRequest } from '../../hooks/useRequest';
import { TablePanelProps } from '../../types';
import { generateYearOptions } from '../../utils';

import { AddBudgetForm } from './AddBudgetForm';
import { BudgetYearFilter } from './BudgetYearFilter';
import { BudgetFields, hiddenFields } from './constants';
import {
  BudgetCreateFormType,
  BudgetCreatePayload,
  BudgetDeletePayload,
  BudgetFilterType,
  BudgetMetaType,
  BudgetUpdatePayload,
} from './types';
import { configBudgetData, filterBudgetByYear, getPayloadIDs } from './utils';

const HEADER_HEIGHT = 45;

const yearOptions = generateYearOptions();

interface Props extends TablePanelProps {}

export const TotalBudgetTool: React.FC<Props> = ({ options, data, width, height }) => {
  const dataFrame = data.series[0];
  const payloadIDs = getPayloadIDs(dataFrame);
  const {
    custom: { teamId, types },
  } = dataFrame.meta as BudgetMetaType;
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

  const handleUpdate = async (value: number | string, { rowIndex, field }: CustomCellRendererProps) => {
    const payload: BudgetUpdatePayload = {
      id: Number(payloadIDs[rowIndex].id),
      teamId: String(teamId),
      propertyName: field.name,
      value,
    };
    return updateRequest(payload);
  };

  const handleDelete = (rowIndex: number) => {
    const payload: BudgetDeletePayload = {
      id: String(payloadIDs[rowIndex].id),
    };
    return deleteRequest(payload);
  };

  const handleCreate = async (data: BudgetCreateFormType) => {
    const payload: BudgetCreatePayload = {
      teamId,
      year: Number(data[BudgetFields.Year]),
      label: data[BudgetFields.Label],
      type: data[BudgetFields.Type],
      code: data[BudgetFields.Code],
      budget: Number(data[BudgetFields.Budget]),
      description: data[BudgetFields.Description] || null,
    };
    return createRequest(payload);
  };
  const configuredData = configBudgetData({ dataFrame, hiddenFields, handleDelete, yearOptions, typeOptions });

  const { handleFiltersChange, filteredData, filterOptions } = useFilters<BudgetFilterType>(
    configuredData,
    BudgetFields.Year,
    filterBudgetByYear
  );

  return (
    <>
      <HeaderContainer>
        <BudgetYearFilter years={filterOptions[BudgetFields.Year]} onChange={handleFiltersChange} />
        <FormModalWrapper title="Add budget">
          {({ onClose }) => (
            <AddBudgetForm
              onClose={onClose}
              onCreate={handleCreate}
              typeOptions={typeOptions}
              yearOptions={yearOptions}
            />
          )}
        </FormModalWrapper>
      </HeaderContainer>

      <DataTable
        width={width}
        height={height - HEADER_HEIGHT}
        data={filteredData}
        loading={loading}
        onUpdate={handleUpdate}
      />
    </>
  );
};
