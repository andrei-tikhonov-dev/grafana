import { TableCellDisplayMode } from '@grafana/ui';

import { InfoLineCell } from './InfoLineCell';

export { InfoLineCell } from './InfoLineCell';

export const getInfoLineCellFieldConfig = (customOptions: any = {}) => {
  return {
    custom: {
      ...customOptions,
      cellOptions: {
        type: TableCellDisplayMode.Custom,
        cellComponent: InfoLineCell,
      },
    },
  };
};
