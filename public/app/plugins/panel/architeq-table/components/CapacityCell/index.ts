import { TableCellDisplayMode } from '@grafana/ui';

import { CapacityCell } from './CapacityCell';

export { CapacityCell } from './CapacityCell';

export const getCapacityCellFieldConfig = (customOptions: any = {}) => {
  return {
    custom: {
      ...customOptions,
      cellOptions: {
        type: TableCellDisplayMode.Custom,
        cellComponent: CapacityCell,
      },
    },
  };
};
