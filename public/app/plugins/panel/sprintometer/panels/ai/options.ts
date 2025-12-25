import { DEFAULT_CONFIGURATION_CATEGORY } from '../../constants';
import { DashboardTitles, EDashboard, TPanelOptions } from '../../types';

export function registerAIOptions(builder: any) {
  const showIf = (opts: TPanelOptions) => false;

  builder.addSelect({
    path: 'ai.dashboard',
    name: 'Dashboard',
    category: DEFAULT_CONFIGURATION_CATEGORY,
    settings: {
      options: Object.values(EDashboard).map((value) => ({
        value,
        label: DashboardTitles[value],
      })),
    },
    showIf,
  });

  return builder;
}
