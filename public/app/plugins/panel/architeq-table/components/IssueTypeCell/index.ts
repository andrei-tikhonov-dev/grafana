import { TableCellDisplayMode } from '@grafana/ui';

import { IssueTypeCell } from './IssueTypeCell';

export { IssueTypeCell } from './IssueTypeCell';

export const getIssueTypeCellFieldConfig = (customOptions: any = {}) => {
  return {
    custom: {
      ...customOptions,
      cellOptions: {
        type: TableCellDisplayMode.Custom,
        cellComponent: IssueTypeCell,
      },
    },
  };
};
