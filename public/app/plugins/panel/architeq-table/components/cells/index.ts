import { TableCellDisplayMode } from '@grafana/ui';

import { ActionsCell } from './ActionsCell/ActionsCell';
import { CapacityCell } from './CapacityCell';
import { CheckboxCell } from './CheckboxCell';
import { DateCell } from './DateCell';
import { DaysCell } from './DaysCell';
import { EditableCell } from './EditableCell';
import { InfoLineCell } from './InfoLineCell';
import { InputCell } from './InputCell';
import { IssueTypeCell } from './IssueTypeCell';
import { LinkCell } from './LinkCell';
import { SimpleCell } from './SimpleCell';
import { UserCell } from './UserCell';
import { RoleCell } from './RoleCell';

export { addActionsColumn } from './ActionsCell';

export const Cells = {
  Actions: ActionsCell,
  Capacity: CapacityCell,
  Checkbox: CheckboxCell,
  Date: DateCell,
  Days: DaysCell,
  Editable: EditableCell,
  InfoLine: InfoLineCell,
  Input: InputCell,
  IssueType: IssueTypeCell,
  Link: LinkCell,
  Role: RoleCell,
  Simple: SimpleCell,
  User: UserCell,
};

type CellType = (typeof Cells)[keyof typeof Cells];

export const getFieldConfig = (cellComponent: CellType, customOptions: any = {}) => {
  return {
    custom: {
      ...customOptions,
      cellOptions: {
        type: TableCellDisplayMode.Custom,
        cellComponent,
      },
    },
  };
};
