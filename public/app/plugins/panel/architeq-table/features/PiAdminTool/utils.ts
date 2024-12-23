import { DataFrame } from '@grafana/data';

import { Cells } from '../../constants';
import { CellCustomOptionsType } from '../../types';
import { configureDataFrame, getFieldConfig } from '../../utils';

import { PiFields } from './constants';

interface ConfigTeamAdminToolData {
  dataFrame: DataFrame;
  handleDelete: (rowIndex: number) => void;
  hiddenFields?: string[];
}

export function configBudgetData({ dataFrame, hiddenFields, handleDelete }: ConfigTeamAdminToolData): DataFrame {
  const options: CellCustomOptionsType = {
    align: 'left',
  };

  const fieldConfigs = [
    { fields: [PiFields.PiName], config: getFieldConfig(Cells.Input, { ...options }) },
    { fields: [PiFields.endDate], config: getFieldConfig(Cells.Date, { ...options }) },
    { fields: [PiFields.StartDay], config: getFieldConfig(Cells.Date, { ...options }) },
  ];

  return configureDataFrame(dataFrame, hiddenFields, handleDelete, fieldConfigs);
}

export function getPayloadIDs(data: DataFrame): { [index: number]: { id?: string } } {
  const idField = data.fields.find((field) => field.name === PiFields.ID);

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
