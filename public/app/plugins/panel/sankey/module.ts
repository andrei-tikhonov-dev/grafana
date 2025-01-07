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
    // .addSliderInput({
    //   path: 'nodeWidth',
    //   name: 'Node width',
    //   defaultValue: 30,
    //   settings: {
    //     min: 5,
    //     max: 100,
    //     step: 1,
    //   },
    // })
    // .addSliderInput({
    //   path: 'nodePadding',
    //   name: 'Node padding',
    //   defaultValue: 30,
    //   settings: {
    //     min: 1,
    //     max: 100,
    //     step: 1,
    //   },
    // })
    // .addSliderInput({
    //   path: 'labelSize',
    //   name: 'Label Size',
    //   description: 'The font size of the labels in px',
    //   defaultValue: 14,
    //   settings: {
    //     min: 6,
    //     max: 24,
    //     step: 1,
    //   },
    // })
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
    // .addTextInput({
    //   path: 'dataDelimiter',
    //   name: 'Data delimiter',
    //   description:
    //     'Enter data in the format data [delimiter] tooltip [delimiter] relative URL (appended to "Base URL")',
    //   defaultValue: '',
    // })
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
    });
});
// .useFieldConfig({
//   disableStandardOptions: [FieldConfigProperty.NoValue, FieldConfigProperty.Max, FieldConfigProperty.Min],
//   standardOptions: {
//     [FieldConfigProperty.Color]: {
//       settings: {
//         byValueSupport: true,
//         bySeriesSupport: true,
//         preferThresholdsMode: true,
//       },
//     },
//   },
// });
