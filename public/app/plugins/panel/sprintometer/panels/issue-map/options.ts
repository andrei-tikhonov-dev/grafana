import { SendMetricChatMessageBoardTypeEnum, SendMetricChatMessageMetricNameEnum } from '@architeq/core-api-client';

import { FieldOverrideContext, getFieldDisplayName } from '@grafana/data';

import { DEFAULT_CONFIGURATION_CATEGORY } from '../../constants';
import { EPanelType, TPanelOptions } from '../../types';
import { getSelectOptionsFromEnum } from '../../utils/enums';

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
  const showIf = (opts: TPanelOptions) => opts.panelType === EPanelType.IssueMap;

  builder.addSelect({
    path: 'sankey.dashboard',
    name: 'Dashboard',
    category: DEFAULT_CONFIGURATION_CATEGORY,
    settings: {
      options: getSelectOptionsFromEnum(SendMetricChatMessageBoardTypeEnum),
    },
    showIf,
  });

  builder.addSelect({
    path: 'sankey.metric',
    name: 'Metric',
    category: DEFAULT_CONFIGURATION_CATEGORY,
    settings: {
      options: getSelectOptionsFromEnum(SendMetricChatMessageMetricNameEnum),
    },
    showIf,
  });

  builder.addMultiSelect({
    category: DEFAULT_CONFIGURATION_CATEGORY,
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
