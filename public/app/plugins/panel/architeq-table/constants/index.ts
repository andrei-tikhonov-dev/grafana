import { ActionsCell } from '../components/cells/ActionsCell/ActionsCell';
import { CapacityCell } from '../components/cells/CapacityCell';
import { CheckboxCell } from '../components/cells/CheckboxCell';
import { DateCell } from '../components/cells/DateCell';
import { DaysCell } from '../components/cells/DaysCell';
import { DoraThresholdsCell } from '../components/cells/DoraThresholdsCell';
import { InfoLineCell } from '../components/cells/InfoLineCell';
import { InputCell } from '../components/cells/InputCell';
import { IssueTypeCell } from '../components/cells/IssueTypeCell';
import { LinkCell } from '../components/cells/LinkCell';
import { MultiSelectCell } from '../components/cells/MultiSelectCell';
import { PriorityCell } from '../components/cells/PriorityCell';
import { RoleCell } from '../components/cells/RoleCell';
import { SelectCell } from '../components/cells/SelectCell';
import { SimpleCell } from '../components/cells/SimpleCell';
import { TextAreaCell } from '../components/cells/TextAreaCell';
import { TooltipCell } from '../components/cells/TooltipCell';
import { UserCell } from '../components/cells/UserCell';

export const enum TableType {
  HistoricalData = 'HistoricalData',
  CurrentSprint = 'CurrentSprint',
  SprintPlaning = 'SprintPlaning',
  TeamAdminTool = 'TeamAdminTool',
  TeamHolidaysTool = 'TeamHolidaysTool',
  TotalBudgetTool = 'TotalBudgetTool',
  JiraBoardsTool = 'JiraBoardsTool',
  PiAdminTool = 'PiAdminTool',
  PiNamesTool = 'PiNamesTool',
  HolidayPrefixes = 'HolidayPrefixes',
  RolesTool = 'RolesTool',
  GenericTable = 'GenericTable',
  JiraStatusMapperTool = 'JiraStatusMapperTool',
  DoraConfigTool = 'DoraConfigTool',
  PiNotesTool = 'PiNotesTool',
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

export const Cells = {
  Actions: ActionsCell,
  Capacity: CapacityCell,
  Checkbox: CheckboxCell,
  Date: DateCell,
  Days: DaysCell,
  DoraThresholds: DoraThresholdsCell,
  InfoLine: InfoLineCell,
  Input: InputCell,
  IssueType: IssueTypeCell,
  Link: LinkCell,
  Role: RoleCell,
  MultiSelect: MultiSelectCell,
  Select: SelectCell,
  Simple: SimpleCell,
  Tooltip: TooltipCell,
  User: UserCell,
  Priority: PriorityCell,
  TextArea: TextAreaCell,
};
