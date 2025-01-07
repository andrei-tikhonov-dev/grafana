import { DataFrame } from '@grafana/data';

import { Cells } from '../../constants';
import { getFieldConfig, updateFieldConfig } from '../../utils';

import { HistoricDataColumns } from './constants';
import { HistoricalDataUpdatePayload } from './types';

export const mapPayload = (value: any, id: string, propertyName: string): HistoricalDataUpdatePayload => {
  if (propertyName === HistoricDataColumns.RelevantForVelocity) {
    return {
      sprintId: id,
      propertyName,
      isRelevantForVelocity: value,
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

  const editableDataFrame = updateFieldConfig(
    visibleDataFrame,
    editableFields || [],
    getFieldConfig(Cells.Input, { align: 'right' })
  );

  return updateFieldConfig(
    editableDataFrame,
    [HistoricDataColumns.RelevantForVelocity],
    getFieldConfig(Cells.Checkbox, { align: 'right' })
  );
}
