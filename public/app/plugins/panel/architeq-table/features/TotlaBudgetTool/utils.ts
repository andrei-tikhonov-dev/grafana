import { DataFrame } from '@grafana/data';

import { Cells } from '../../constants';
import { CellCustomOptionsType, OptionType } from '../../types';
import { configureDataFrame, getFieldConfig } from '../../utils';

import { BudgetFields } from './constants';
import { BudgetFilterType } from './types';

interface ConfigTeamAdminToolData {
  dataFrame: DataFrame;
  typeOptions: OptionType[];
  yearOptions: OptionType[];
  handleDelete: (rowIndex: number) => void;
  hiddenFields?: string[];
}

export function configBudgetData({
  dataFrame,
  hiddenFields,
  handleDelete,
  typeOptions,
  yearOptions,
}: ConfigTeamAdminToolData): DataFrame {
  const options: CellCustomOptionsType = {
    align: 'left',
  };
  const typeField: CellCustomOptionsType = {
    ...options,
    options: typeOptions,
  };

  const yearField: CellCustomOptionsType = {
    ...options,
    options: yearOptions,
  };

  const fieldConfigs = [
    { fields: [BudgetFields.Label], config: getFieldConfig(Cells.Input, { ...options }) },
    { fields: [BudgetFields.Code], config: getFieldConfig(Cells.Input, { ...options }) },
    { fields: [BudgetFields.Description], config: getFieldConfig(Cells.Input, { ...options }) },
    {
      fields: [BudgetFields.Budget],
      config: getFieldConfig(Cells.Input, { ...options, valueType: 'numberWithDecimal' }),
    },
    { fields: [BudgetFields.Year], config: getFieldConfig(Cells.Select, { ...yearField }) },
    { fields: [BudgetFields.Type], config: getFieldConfig(Cells.Select, { ...typeField }) },
  ];

  return configureDataFrame(dataFrame, hiddenFields, handleDelete, fieldConfigs);
}

export function getPayloadIDs(data: DataFrame): { [index: number]: { id?: string } } {
  const idField = data.fields.find((field) => field.name === BudgetFields.ID);

  const length = data.length;

  return Object.fromEntries(
    Array.from({ length }, (_, index) => [
      index,
      {
        id: idField ? String(idField.values.get(index)) : undefined,
      },
    ])
  );
}

export function filterBudgetByYear(data: DataFrame, fieldName: string, filters: BudgetFilterType): DataFrame {
  const field = data.fields.find((field) => field.name === fieldName);
  const { years = [] } = filters || {};

  if (!field || years.length === 0) {
    return data;
  }

  const filterMask = Array.from({ length: data.length }, (_, index) => years.includes(String(field.values.get(index))));

  return {
    ...data,
    length: filterMask.filter(Boolean).length,
    fields: data.fields.map((field) => ({
      ...field,
      values: Array.from({ length: data.length }, (_, index) => field.values.get(index)).filter(
        (_, index) => filterMask[index]
      ),
    })),
  };
}
