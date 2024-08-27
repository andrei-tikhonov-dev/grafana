import { TableCellDisplayMode } from '@grafana/ui';

import { LinkCell } from './LinkCell';

export { LinkCell } from './LinkCell';

export const getLinkCellFieldConfig = (customOptions: any = {}) => {
  return {
    custom: {
      ...customOptions,
      cellOptions: {
        type: TableCellDisplayMode.Custom,
        cellComponent: LinkCell,
      },
    },
  };
};
