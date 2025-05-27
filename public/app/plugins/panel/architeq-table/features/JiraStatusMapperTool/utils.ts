import { DataFrame } from '@grafana/data';

import { Cells } from '../../constants';
import { CellCustomOptionsType, OptionType } from '../../types';
import { configureDataFrame, getFieldConfig } from '../../utils';

import { JiraStatusMapperToolFields } from './constants';

interface ConfigJiraStatusMapperToolData {
  dataFrame: DataFrame;
  typeOptions: OptionType[];
  hiddenFields?: string[];
}

export function getFilterOptions(data: DataFrame) {
  let options: string[] = [];

  data.fields.forEach((field) => {
    if (field.name === JiraStatusMapperToolFields.JiraBoard) {
      options = [...new Set(field.values)];
    }
  });

  return options;
}

export function filterData(data: DataFrame, filter: string) {
  const boards = data.fields.find((field: any) => field.name === JiraStatusMapperToolFields.JiraBoard);

  const filteredIndexes = boards?.values.map((_: any, index: number) => {
    return filter ? boards.values[index] === filter : true;
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
    { fields: [JiraStatusMapperToolFields.JiraStatus], config: getFieldConfig(Cells.Simple, { ...options }) },
    { fields: [JiraStatusMapperToolFields.Status], config: getFieldConfig(Cells.Select, { ...typeFieldOptions }) },
  ];

  return configureDataFrame(dataFrame, hiddenFields, null, fieldConfigs);
}
