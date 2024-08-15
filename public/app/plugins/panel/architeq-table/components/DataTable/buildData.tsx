import { DataFrame, FieldConfig } from '@grafana/data';
import { TableCellDisplayMode } from '@grafana/ui';
import { DataCell } from './DataCell';

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

const editableCellFieldConfig = {
  custom: {
    cellOptions: {
      type: TableCellDisplayMode.Custom,
      cellComponent: DataCell,
    },
  },
};

export function updateDataFrame(dataFrame: DataFrame, editableFields: string[], hiddenFields?: string[]): DataFrame {
  const visibleDataFrame = {
    ...dataFrame,
    fields: dataFrame.fields.filter((field) => !hiddenFields?.includes(field.name)),
  };

  return updateFieldConfig(visibleDataFrame, editableFields, editableCellFieldConfig);
}
