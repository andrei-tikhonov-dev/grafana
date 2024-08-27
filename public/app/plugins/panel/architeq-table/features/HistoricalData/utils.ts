import { DataFrame } from '@grafana/data';

import { getEditableCellFieldConfig } from '../../components/EditableCell';
import { updateFieldConfig } from '../../utils';

import { UpdatePayload } from './types';

export const mapPayload = (value: number, id: string, propertyName: string): UpdatePayload => {
  return {
    sprintId: id,
    propertyName,
    value,
  };
};

export function configData(dataFrame: DataFrame, editableFields?: string[], hiddenFields?: string[]): DataFrame {
  const visibleDataFrame = {
    ...dataFrame,
    fields: dataFrame.fields.filter((field) => !hiddenFields?.includes(field.name)),
  };
  return updateFieldConfig(visibleDataFrame, editableFields || [], getEditableCellFieldConfig());
}
