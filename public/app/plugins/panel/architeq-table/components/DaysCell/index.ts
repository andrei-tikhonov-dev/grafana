import { TableCellDisplayMode } from '@grafana/ui';

import { DaysCell } from './DaysCell';

export { DaysCell } from './DaysCell';

export const getDaysCellFieldConfig = (customOptions: any = {}) => {
  return {
    custom: {
      ...customOptions,
      cellOptions: {
        type: TableCellDisplayMode.Custom,
        cellComponent: DaysCell,
      },
    },
  };
};
