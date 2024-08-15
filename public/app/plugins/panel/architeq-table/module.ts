import { FieldOverrideContext, getFieldDisplayName, PanelPlugin } from '@grafana/data';

import { HeaderParametersEditor } from './components/HeaderParametersEditor';
import { TablePanel } from './components/TablePanel';
import { RequestMethod, UPDATE_REQUEST_METHOD_OPTIONS } from './constants';
import { PanelOptions } from './types';

const getOptions = async (context: FieldOverrideContext) => {
  const options = [];
  if (context && context.data) {
    for (const frame of context.data) {
      for (const field of frame.fields) {
        const name = getFieldDisplayName(field, frame, context.data);
        const value = name;
        options.push({ value, label: name });
      }
    }
  }
  return Promise.resolve(options);
};

export const plugin = new PanelPlugin<PanelOptions>(TablePanel).setPanelOptions((builder) => {
  return builder
    .addRadio({
      path: 'update.method',
      name: 'Update Action',
      category: ['Update Request'],
      settings: {
        options: UPDATE_REQUEST_METHOD_OPTIONS,
      },
      defaultValue: RequestMethod.POST,
    })
    .addTextInput({
      path: 'update.url',
      name: 'URL',
      category: ['Update Request'],
      description: 'The URL to call.',
      settings: {
        placeholder: 'http://',
      },
    })
    .addCustomEditor({
      id: 'update.header',
      path: 'update.header',
      name: 'Header Parameters',
      category: ['Update Request'],
      editor: HeaderParametersEditor,
    })
    .addMultiSelect({
      category: ['Table Configuration'],
      path: 'editableFields',
      name: 'Editable Columns',
      description: 'Select the columns that should be editable.',
      settings: {
        allowCustomValue: false,
        options: [],
        getOptions: getOptions,
      },
    })
    .addSelect({
      category: ['Table Configuration'],
      path: 'idField',
      name: 'Identifier Column',
      description: 'Select the columns that should be used as identifiers.',
      settings: {
        allowCustomValue: false,
        options: [],
        getOptions: getOptions,
      },
    });
});
