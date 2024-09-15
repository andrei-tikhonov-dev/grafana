import { TableCellDisplayMode } from '@grafana/ui';

import { CheckboxCell } from './CheckboxCell';

export { CheckboxCell } from './CheckboxCell';

export const getCheckboxFieldConfig = (customOptions: any = {}) => {
  return {
    custom: {
      ...customOptions,
      cellOptions: {
        type: TableCellDisplayMode.Custom,
        cellComponent: CheckboxCell,
      },
    },
  };
};
