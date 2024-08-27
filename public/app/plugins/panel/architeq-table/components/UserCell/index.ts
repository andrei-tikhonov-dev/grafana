import { TableCellDisplayMode } from '@grafana/ui';

import { UserCell } from './UserCell';

export { UserCell } from './UserCell';

export const getUserCellFieldConfig = (customOptions: any = {}) => {
  return {
    custom: {
      ...customOptions,
      cellOptions: {
        type: TableCellDisplayMode.Custom,
        cellComponent: UserCell,
      },
    },
  };
};
