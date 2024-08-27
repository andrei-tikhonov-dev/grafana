import { TableCellDisplayMode } from '@grafana/ui';

import { EditableCell } from './EditableCell';

export { EditableCell } from './EditableCell';

export const getEditableCellFieldConfig = (customOptions: any = {}) => {
  return {
    custom: {
      ...customOptions,
      cellOptions: {
        type: TableCellDisplayMode.Custom,
        cellComponent: EditableCell,
      },
    },
  };
};
