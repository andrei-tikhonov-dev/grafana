import { SendMetricChatMessageBoardTypeEnum, SendMetricChatMessageMetricNameEnum } from '@architeq/core-api-client';

import { DEFAULT_CONFIGURATION_CATEGORY } from '../../constants';
import { EPanelType, TPanelOptions } from '../../types';
import { getSelectOptionsFromEnum } from '../../utils/enums';

export function registerPlannerBoardOptions(builder: any) {
  const showIf = (opts: TPanelOptions) => opts.panelType === EPanelType.PlannerBoard;

  builder.addSelect({
    path: 'plannerBoard.dashboard',
    name: 'Dashboard',
    category: DEFAULT_CONFIGURATION_CATEGORY,
    settings: {
      options: getSelectOptionsFromEnum(SendMetricChatMessageBoardTypeEnum),
    },
    showIf,
  });

  builder.addSelect({
    path: 'plannerBoard.metric',
    name: 'Metric',
    category: DEFAULT_CONFIGURATION_CATEGORY,
    settings: {
      options: getSelectOptionsFromEnum(SendMetricChatMessageMetricNameEnum),
    },
    showIf,
  });

  return builder;
}
