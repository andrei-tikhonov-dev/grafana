import { TableCellDisplayMode } from '@grafana/ui';

import { SimpleCell } from './SimpleCell';

export { SimpleCell } from './SimpleCell';

export const getSimpleCellFieldConfig = (customOptions: any = {}) => {
  return {
    custom: {
      ...customOptions,
      cellOptions: {
        type: TableCellDisplayMode.Custom,
        cellComponent: SimpleCell,
      },
    },
  };
};
