import { DataFrame, FieldConfig, FieldOverrideContext, getFieldDisplayName } from '@grafana/data';

import { TableType } from '../constants';

export function getCircularReplacer() {
  const seen = new WeakSet();
  return (key: string, value: any) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
}

export function printJson(obj: any) {
  return JSON.stringify(obj, getCircularReplacer(), 2);
}

export const getRowIdentifiers = (fieldName: string, dataFrame: DataFrame) => {
  const idField = dataFrame.fields.filter((field) => field.name === fieldName);
  return idField[0]?.values || [];
};

export const getPanelSelectOptions = async (context: FieldOverrideContext) => {
  const options = [];
  if (context && context.data) {
    for (const frame of context.data) {
      for (const field of frame.fields) {
        const name = getFieldDisplayName(field, frame, context.data);
        const value = name;
        options.push({ value, label: name });
      }
    }
  }
  return Promise.resolve(options);
};

export const getTableTypeOptions = async () => {
  return Promise.resolve([
    { label: 'Historical Data', value: TableType.HistoricalData },
    { label: 'Current Sprint', value: TableType.CurrentSprint },
    { label: 'Sprint Planing', value: TableType.SprintPlaning },
  ]);
};

export function updateFieldConfig(
  dataFrame: DataFrame,
  fieldNames: string[],
  newConfig: Partial<FieldConfig>
): DataFrame {
  const updatedFields = dataFrame.fields.map((field) => {
    if (fieldNames.includes(field.name)) {
      return {
        ...field,
        config: {
          ...field.config,
          ...newConfig,
        },
      };
    }
    return field;
  });

  return {
    ...dataFrame,
    fields: updatedFields,
  };
}
