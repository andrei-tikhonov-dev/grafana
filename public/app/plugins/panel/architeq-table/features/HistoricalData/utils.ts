import { DataFrame } from '@grafana/data';

import { getCheckboxFieldConfig } from '../../components/CheckboxCell';
import { getEditableCellFieldConfig } from '../../components/EditableCell';
import { updateFieldConfig } from '../../utils';

import { HistoricDataColumns } from './constants';
import { HistoricalDataUpdatePayload } from './types';

export const mapPayload = (value: number, id: string, propertyName: string): HistoricalDataUpdatePayload => {
  if (propertyName === HistoricDataColumns.RelevantForVelocity) {
    return {
      sprintId: id,
      propertyName,
      isRelevantForVelocity: value === 1,
    };
  }
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

  const editableDataFrame = updateFieldConfig(visibleDataFrame, editableFields || [], getEditableCellFieldConfig());

  return updateFieldConfig(
    editableDataFrame,
    [HistoricDataColumns.RelevantForVelocity],
    getCheckboxFieldConfig({ align: 'right' })
  );
}
