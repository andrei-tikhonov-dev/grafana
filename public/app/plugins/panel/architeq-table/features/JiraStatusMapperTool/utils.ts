import { DataFrame } from '@grafana/data';

import { Cells } from '../../constants';
import { CellCustomOptionsType, OptionType } from '../../types';
import { configureDataFrame, getFieldConfig } from '../../utils';

import { JiraStatusMapperToolFields } from './constants';
import { BoardOption } from './types';

interface ConfigJiraStatusMapperToolData {
  dataFrame: DataFrame;
  typeOptions: OptionType[];
  hiddenFields?: string[];
}

export function getFilterOptions(data: DataFrame): BoardOption[] {
  let boardIdField: any = null;
  let boardNameField: any = null;

  data.fields.forEach((field) => {
    if (field.name === JiraStatusMapperToolFields.BoardID) {
      boardIdField = field;
    }
    if (field.name === JiraStatusMapperToolFields.BoardName) {
      boardNameField = field;
    }
  });

  if (!boardIdField || !boardNameField) {
    return [];
  }

  const optionsMap = new Map<string, string>();

  for (let i = 0; i < boardIdField.values.length; i++) {
    const id = boardIdField.values[i];
    const name = boardNameField.values[i];
    if (id && name) {
      optionsMap.set(id, name);
    }
  }

  return Array.from(optionsMap.entries()).map(([value, label]) => ({
    label,
    value,
  }));
}
export function filterData(data: DataFrame, filter: BoardOption) {
  const boards = data.fields.find((field: any) => field.name === JiraStatusMapperToolFields.BoardID);

  const filteredIndexes = boards?.values.map((_: any, index: number) => {
    return filter ? boards.values[index] === filter.value : true;
  });

  return {
    ...data,
    length: filteredIndexes?.filter((value) => value === true).length || 0,
    fields: data.fields.map((field: any) => ({
      ...field,
      values: field.values.filter((_: any, index: number) => (filteredIndexes || [])[index]),
    })),
  };
}

export function configJiraStatusMapperToolData({
  dataFrame,
  hiddenFields,
  typeOptions,
}: ConfigJiraStatusMapperToolData): DataFrame {
  const options: CellCustomOptionsType = {
    align: 'left',
  };
  const typeFieldOptions: CellCustomOptionsType = {
    ...options,
    options: typeOptions,
  };

  const fieldConfigs = [
    { fields: [JiraStatusMapperToolFields.ColumnName], config: getFieldConfig(Cells.Simple, { ...options }) },
    { fields: [JiraStatusMapperToolFields.Status], config: getFieldConfig(Cells.Select, { ...typeFieldOptions }) },
  ];

  return configureDataFrame(dataFrame, hiddenFields, null, fieldConfigs);
}

export function objectToOptionArray(obj: Record<string, string>): Array<{
  label: string;
  value: string;
}> {
  return Object.entries(obj).map(([key, value]) => ({
    label: value,
    value: key,
  }));
}
