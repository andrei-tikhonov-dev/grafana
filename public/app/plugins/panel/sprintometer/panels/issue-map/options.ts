import { FieldOverrideContext, getFieldDisplayName } from '@grafana/data';

import { EPanelType, TPanelOptions } from '../../types';

type SelectOption = { value: string; label: string };

async function defaultGetFieldOptions(context: FieldOverrideContext): Promise<SelectOption[]> {
  const options: SelectOption[] = [];
  if (context?.data) {
    for (const frame of context.data) {
      for (const field of frame.fields) {
        const name = getFieldDisplayName(field, frame, context.data);
        options.push({ value: name, label: name });
      }
    }
  }
  return options;
}

export function registerIssueMapOptions(
  builder: any,
  params?: {
    getFieldOptions?: (ctx: FieldOverrideContext) => Promise<SelectOption[]>;
  }
) {
  const getFieldOptions = params?.getFieldOptions ?? defaultGetFieldOptions;
  const category = ['Issue map'];
  const showIf = (opts: TPanelOptions) => opts.panelType === EPanelType.IssueMap;

  builder.addMultiSelect({
    category,
    showIf,
    path: 'sankey.filterFields',
    name: 'Filter Fields',
    description: 'Choose fields to filter the data',
    settings: {
      allowCustomValue: false,
      options: [],
      getOptions: getFieldOptions,
    },
  });

  return builder;
}
