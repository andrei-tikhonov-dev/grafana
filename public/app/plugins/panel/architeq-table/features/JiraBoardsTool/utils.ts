import { DataFrame } from '@grafana/data';

import { Cells } from '../../constants';
import { CellCustomOptionsType, OptionType } from '../../types';
import { configureDataFrame, getFieldConfig } from '../../utils';

import { JiraBoardsFields } from './constants';

interface ConfigJiraBoardsToolData {
  dataFrame: DataFrame;
  handleDelete: (rowIndex: number) => void;
  typeOptions: OptionType[];
  hiddenFields?: string[];
}

export function configJiraBoardsToolData({
  dataFrame,
  hiddenFields,
  handleDelete,
  typeOptions,
}: ConfigJiraBoardsToolData): DataFrame {
  const options: CellCustomOptionsType = {
    align: 'left',
  };
  const typeFieldOptions: CellCustomOptionsType = {
    ...options,
    options: typeOptions,
  };

  const fieldConfigs = [
    { fields: [JiraBoardsFields.Name], config: getFieldConfig(Cells.Input, { ...options }) },
    { fields: [JiraBoardsFields.Type], config: getFieldConfig(Cells.Select, { ...typeFieldOptions }) },
    { fields: [JiraBoardsFields.BoardId], config: getFieldConfig(Cells.Input, { ...options }) },
  ];

  return configureDataFrame(dataFrame, hiddenFields, handleDelete, fieldConfigs);
}

export function getPayloadIDs(data: DataFrame): { [index: number]: { id?: string } } {
  const idField = data.fields.find((field) => field.name === JiraBoardsFields.Id);

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
