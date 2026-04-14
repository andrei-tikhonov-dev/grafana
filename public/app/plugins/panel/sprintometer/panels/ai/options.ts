import { SendMetricChatMessageBoardTypeEnum } from '@architeq/core-api-client';

import { AI_CATEGORY, DEFAULT_CONFIGURATION_CATEGORY } from '../../constants';
import { EAiPanelId } from '../../features/ai-chat/api/aiServiceTypes';
import { EPanelType, TPanelOptions } from '../../types';
import { getSelectOptionsFromEnum } from '../../utils/enums';

export function registerAIOptions(builder: any) {
  const showIf = (opts: TPanelOptions) => opts.panelType === EPanelType.AI;

  builder.addBooleanSwitch({
    category: AI_CATEGORY,
    path: 'aiEnabled',
    name: 'Enable AI chat',
    description: 'Show AI helper button in panels',
    defaultValue: true,
    showIf,
  });

  builder.addMultiSelect({
    category: AI_CATEGORY,
    path: 'aiPanelIds',
    name: 'AI preset query panels',
    description: 'Select panels to fetch AI preset queries for',
    settings: {
      allowCustomValue: true,
      options: getSelectOptionsFromEnum(EAiPanelId),
    },
    showIf,
  });

  builder.addBooleanSwitch({
    category: AI_CATEGORY,
    path: 'aiChatMock.useMock',
    name: 'Use mock',
    description: 'Enable mock AI chat responses instead of real API calls',
    defaultValue: false,
    showIf,
  });

  builder.addTextInput({
    category: AI_CATEGORY,
    path: 'aiChatMock.preset',
    name: 'Preset response',
    description: 'JSON object for preset mode response. Leave empty for default.',
    defaultValue: '',
    settings: {
      useTextarea: true,
      rows: 6,
    },
    showIf,
  });

  builder.addTextInput({
    category: AI_CATEGORY,
    path: 'aiChatMock.general',
    name: 'General responses',
    description: 'JSON array of responses for general chat. Leave empty for default.',
    defaultValue: '',
    settings: {
      useTextarea: true,
      rows: 6,
    },
    showIf,
  });

  builder.addSelect({
    path: 'aiDashboard',
    name: 'Dashboard',
    category: DEFAULT_CONFIGURATION_CATEGORY,
    settings: {
      options: getSelectOptionsFromEnum(SendMetricChatMessageBoardTypeEnum),
    },
    showIf,
  });

  return builder;
}
