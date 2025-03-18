import { DataFrame } from '@grafana/data';

import { Cells } from '../../constants';
import { CellCustomOptionsType } from '../../types';
import { configureDataFrame, getFieldConfig } from '../../utils';

import { RoleFields } from './constants';

interface ConfigTeamAdminToolData {
  dataFrame: DataFrame;
  handleDelete: (rowIndex: number) => void;
  hiddenFields?: string[];
}

export function configRolesData({ dataFrame, hiddenFields, handleDelete }: ConfigTeamAdminToolData): DataFrame {
  const editable = dataFrame.fields.find((field) => field.name === RoleFields.Deletable);
  const isEditable = (id: any) => editable?.values[id];
  const options: CellCustomOptionsType = {
    align: 'left',
    isEditable,
  };

  const fieldConfigs = [{ fields: [RoleFields.RoleName], config: getFieldConfig(Cells.Input, { ...options }) }];

  return configureDataFrame(dataFrame, hiddenFields, handleDelete, fieldConfigs, isEditable);
}

export function getPayloadIDs(data: DataFrame): { [index: number]: { id?: string } } {
  const idField = data.fields.find((field) => field.name === RoleFields.ID);

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
