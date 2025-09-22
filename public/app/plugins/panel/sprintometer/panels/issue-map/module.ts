import { PanelPlugin, FieldOverrideContext, getFieldDisplayName } from '@grafana/data';

import { Panel } from './Panel';
import { SankeyOptions } from './types';

const getFieldOptions = async (context: FieldOverrideContext) => {
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

export const plugin = new PanelPlugin<SankeyOptions>(Panel).setPanelOptions((builder) => {
  builder
    .addColorPicker({
      path: 'nodeColor',
      name: 'Node color',
      defaultValue: 'grey',
    })
    .addSelect({
      path: 'valueField',
      name: 'Value Field',
      description: 'Select the field that should be used for the link thickness',
      settings: {
        allowCustomValue: false,
        options: [],
        getOptions: getFieldOptions,
      },
    })
    .addMultiSelect({
      path: 'filterFields',
      name: 'Filter Fields',
      description: 'Choose fields to filter the data',
      settings: {
        allowCustomValue: false,
        options: [],
        getOptions: getFieldOptions,
      },
    })
    .addSliderInput({
      path: 'iteration',
      name: 'Layout iterations',
      defaultValue: 7,
      settings: {
        min: 1,
        max: 250,
        step: 1,
      },
    })
    .addTextInput({
      path: 'baseUrl',
      name: 'Base URL',
      description: 'Base URL used to create links in the panel',
      defaultValue: '',
    })
    .addStringArray({
      path: 'fieldsOrder',
      name: 'Fields Order',
      defaultValue: [],
      settings: {
        placeholder: 'Enter column names...',
      },
      showIf: () => false,
    })
    .addStringArray({
      path: 'hiddenFields',
      name: 'Hidden fields',
      defaultValue: [],
      settings: {
        placeholder: 'Enter column names...',
      },
      showIf: () => false,
    })
    .addTextInput({
      path: 'initialFilters',
      name: 'Initial Filters',
      description: 'Default filter selections (JSON format)',
      defaultValue: '{}',
      showIf: () => false,
    });
});
