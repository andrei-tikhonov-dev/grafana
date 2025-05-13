import { PanelPlugin } from '@grafana/data';

import { Panel } from './Panel';
import { PanelOptions, PanelType } from './types';

export const getPanelTypeOptions = async () => {
  return Promise.resolve([
    { label: 'Empty Panel', value: PanelType.EmptyPanel },
    { label: 'Burndown Chart', value: PanelType.BurndownChart },
    { label: 'Incoming Dependencies', value: PanelType.IncomingDependencies },
    { label: 'Similar Tasks', value: PanelType.SimilarTasks },
  ]);
};

export const plugin = new PanelPlugin<PanelOptions>(Panel).setPanelOptions((builder) => {
  return builder.addSelect({
    category: ['Sprintometer Configuration'],
    path: 'panelType',
    name: 'Panel Type',
    description: 'Select the type of the panel.',
    defaultValue: PanelType.EmptyPanel,
    settings: {
      allowCustomValue: false,
      options: [],
      getOptions: getPanelTypeOptions,
    },
  });
});
