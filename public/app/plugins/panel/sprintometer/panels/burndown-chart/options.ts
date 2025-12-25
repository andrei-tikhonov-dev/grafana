import { DEFAULT_CONFIGURATION_CATEGORY } from '../../constants';
import { DashboardTitles, EDashboard, TPanelOptions } from '../../types';

export function registerBurndownOptions(builder: any) {
  const showIf = (opts: TPanelOptions) => false;

  builder.addSelect({
    path: 'burndown.dashboard',
    name: 'Dashboard',
    category: DEFAULT_CONFIGURATION_CATEGORY,
    settings: {
      options: [
        { value: EDashboard.Daily, label: DashboardTitles[EDashboard.Daily] },
        { value: EDashboard.SprintPlanning, label: DashboardTitles[EDashboard.SprintPlanning] },
        { value: EDashboard.SprintReview, label: DashboardTitles[EDashboard.SprintReview] },
      ],
    },
    showIf,
  });

  return builder;
}
