import { SelectableValue } from '@grafana/data';

import { ActionsCell } from '../components/cells/ActionsCell/ActionsCell';
import { CapacityCell } from '../components/cells/CapacityCell';
import { CheckboxCell } from '../components/cells/CheckboxCell';
import { DateCell } from '../components/cells/DateCell';
import { DaysCell } from '../components/cells/DaysCell';
import { InfoLineCell } from '../components/cells/InfoLineCell';
import { InputCell } from '../components/cells/InputCell';
import { IssueTypeCell } from '../components/cells/IssueTypeCell';
import { LinkCell } from '../components/cells/LinkCell';
import { RoleCell } from '../components/cells/RoleCell';
import { SelectCell } from '../components/cells/SelectCell';
import { SimpleCell } from '../components/cells/SimpleCell';
import { UserCell } from '../components/cells/UserCell';

export const enum TableType {
  HistoricalData = 'HistoricalData',
  CurrentSprint = 'CurrentSprint',
  SprintPlaning = 'SprintPlaning',
  TeamAdminTool = 'TeamAdminTool',
  TeamHolidaysTool = 'TeamHolidaysTool',
  TotalBudgetTool = 'TotalBudgetTool',
  PiAdminTool = 'PiAdminTool',
  HolidayPrefixes = 'HolidayPrefixes',
  GenericTable = 'GenericTable',
}

export const enum RequestMethod {
  DELETE = 'DELETE',
  PATCH = 'PATCH',
  POST = 'POST',
  PUT = 'PUT',
}

export const enum LoadingMode {
  NONE = '',
  INITIAL = 'initial',
  UPDATE = 'update',
  RESET = 'reset',
}

export const UPDATE_REQUEST_METHOD_OPTIONS: SelectableValue[] = [
  {
    value: RequestMethod.DELETE,
    label: RequestMethod.DELETE,
  },
  {
    value: RequestMethod.PATCH,
    label: RequestMethod.PATCH,
  },
  {
    value: RequestMethod.POST,
    label: RequestMethod.POST,
  },
  {
    value: RequestMethod.PUT,
    label: RequestMethod.PUT,
  },
];

export const Cells = {
  Actions: ActionsCell,
  Capacity: CapacityCell,
  Checkbox: CheckboxCell,
  Date: DateCell,
  Days: DaysCell,
  InfoLine: InfoLineCell,
  Input: InputCell,
  IssueType: IssueTypeCell,
  Link: LinkCell,
  Role: RoleCell,
  Select: SelectCell,
  Simple: SimpleCell,
  User: UserCell,
};
