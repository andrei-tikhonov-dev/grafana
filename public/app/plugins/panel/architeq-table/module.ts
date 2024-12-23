import { PanelPlugin } from '@grafana/data';

import { TablePanel } from './components/TablePanel';
import { TableType } from './constants';
import { PanelOptions } from './types';
import { getPanelSelectOptions, getTableTypeOptions } from './utils';

const HISTORICAL_DATA_TYPES = [TableType.HistoricalData];
const CURRENT_SPRINT_TYPES = [TableType.CurrentSprint];
const ADMIN_TYPES = [
  TableType.TeamAdminTool,
  TableType.TeamHolidaysTool,
  TableType.TotalBudgetTool,
  TableType.PiAdminTool,
];
const UPDATE_URL_TYPES = [TableType.HistoricalData, TableType.SprintPlaning, ...ADMIN_TYPES];

export const plugin = new PanelPlugin<PanelOptions>(TablePanel).setPanelOptions((builder) => {
  return builder
    .addSelect({
      category: ['Table Configuration'],
      path: 'tableType',
      name: 'Table Type',
      description: 'Select the type of the table.',
      defaultValue: TableType.HistoricalData,
      settings: {
        allowCustomValue: false,
        options: [],
        getOptions: getTableTypeOptions,
      },
    })
    .addMultiSelect({
      category: ['Table Configuration'],
      path: 'editableFields',
      name: 'Editable Columns (optional)',
      description: 'Select the columns that should be editable.',
      settings: {
        allowCustomValue: false,
        options: [],
        getOptions: getPanelSelectOptions,
      },
      showIf: (config) => HISTORICAL_DATA_TYPES.includes(config.tableType),
    })
    .addSelect({
      category: ['Table Configuration'],
      path: 'idField',
      name: 'Identifier Column (optional)',
      description: 'Select the columns that should be used as identifiers.',
      settings: {
        allowCustomValue: false,
        options: [],
        getOptions: getPanelSelectOptions,
      },
      showIf: (config) => HISTORICAL_DATA_TYPES.includes(config.tableType),
    })
    .addTextInput({
      path: 'baseUrl',
      name: 'Base URL',
      category: ['Table Configuration'],
      description: 'Used to generate "Identifier" column links.',
      settings: {
        placeholder: 'http://',
      },
      showIf: (config) => CURRENT_SPRINT_TYPES.includes(config.tableType),
    })
    .addTextInput({
      path: 'updateUrl',
      name: 'Update URL [POST]',
      category: ['Request URLs'],
      description: 'The URL to update one cell.',
      settings: {
        placeholder: 'http://',
      },
      showIf: (config) => UPDATE_URL_TYPES.includes(config.tableType),
    })
    .addTextInput({
      path: 'createUrl',
      name: 'Create URL [POST]',
      category: ['Request URLs'],
      description: 'The URL to create new team member.',
      settings: {
        placeholder: 'http://',
      },
      showIf: (config) => ADMIN_TYPES.includes(config.tableType),
    })
    .addTextInput({
      path: 'deleteUrl',
      name: 'Delete URL [DELETE]',
      category: ['Request URLs'],
      description: 'The URL to delete team member.',
      settings: {
        placeholder: 'http://',
      },
      showIf: (config) => ADMIN_TYPES.includes(config.tableType),
    });
});
