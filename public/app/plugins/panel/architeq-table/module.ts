import { PanelPlugin } from '@grafana/data';

import { HeaderParametersEditor } from './components/HeaderParametersEditor';
import { TablePanel } from './components/TablePanel';
import { RequestMethod, TableType, UPDATE_REQUEST_METHOD_OPTIONS } from './constants';
import { PanelOptions } from './types';
import { getPanelSelectOptions, getTableTypeOptions } from './utils';

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
      showIf: (config) => config.tableType === TableType.HistoricalData,
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
      showIf: (config) => config.tableType === TableType.HistoricalData,
    })
    .addTextInput({
      path: 'baseUrl',
      name: 'Base URL',
      category: ['Table Configuration'],
      description: 'Used to generate "Identifier" column links.',
      settings: {
        placeholder: 'http://',
      },
      showIf: (config) => config.tableType === TableType.CurrentSprint,
    })
    .addRadio({
      path: 'update.method',
      name: 'Update Action',
      category: ['Update Request'],
      settings: {
        options: UPDATE_REQUEST_METHOD_OPTIONS,
      },
      defaultValue: RequestMethod.POST,
      showIf: (config) => config.tableType === TableType.HistoricalData || config.tableType === TableType.SprintPlaning,
    })
    .addTextInput({
      path: 'update.url',
      name: 'URL',
      category: ['Update Request'],
      description: 'The URL to call.',
      settings: {
        placeholder: 'http://',
      },
      showIf: (config) => config.tableType === TableType.HistoricalData || config.tableType === TableType.SprintPlaning,
    })
    .addCustomEditor({
      id: 'update.header',
      path: 'update.header',
      name: 'Header Parameters',
      category: ['Update Request'],
      editor: HeaderParametersEditor,
      showIf: (config) => config.tableType === TableType.HistoricalData || config.tableType === TableType.SprintPlaning,
    });
});
