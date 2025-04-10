import { DataFrame } from '@grafana/data';

import { Cells } from '../../constants';
import { CellCustomOptionsType } from '../../types';
import { configureDataFrame, getFieldConfig } from '../../utils';
import { PiFields } from '../PiAdminTool/constants';

import { PiNamesFields } from './constants';

interface ConfigTeamAdminToolData {
  dataFrame: DataFrame;
  handleDelete: (rowIndex: number) => void;
  hiddenFields?: string[];
}

export function configRolesData({ dataFrame, hiddenFields, handleDelete }: ConfigTeamAdminToolData): DataFrame {
  const options: CellCustomOptionsType = {
    align: 'left',
  };

  const isEditable = () => false;

  const fieldConfigs = [
    { fields: [PiNamesFields.Name], config: getFieldConfig(Cells.Input, { ...options }) },
    { fields: [PiFields.EndDate], config: getFieldConfig(Cells.Date, { ...options, isEditable }) },
    { fields: [PiFields.StartDate], config: getFieldConfig(Cells.Date, { ...options, isEditable }) },
  ];

  return configureDataFrame(dataFrame, hiddenFields, handleDelete, fieldConfigs);
}

export function getPayloadIDs(data: DataFrame): { [index: number]: { id?: string } } {
  const idField = data.fields.find((field) => field.name === PiNamesFields.ID);

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
