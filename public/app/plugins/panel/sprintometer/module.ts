import { PanelPlugin } from '@grafana/data';

import { Panel } from './Panel';
import { PanelOptions, PanelType } from './types';

export const getPanelTypeOptions = async () => {
  return Promise.resolve([
    { label: 'Empty panel', value: PanelType.EmptyPanel },
    { label: 'Burndown chart', value: PanelType.BurndownChart },
    { label: 'Incoming dependencies', value: PanelType.IncomingDependencies },
    { label: 'Outgoing dependencies', value: PanelType.OutgoingDependencies },
    { label: 'Similar issues', value: PanelType.SimilarTasks },
  ]);
};

export const plugin = new PanelPlugin<PanelOptions>(Panel).setPanelOptions((builder) => {
  return builder
    .addSelect({
      category: ['Sprintometer Configuration'],
      path: 'panelType',
      name: 'Panel type',
      description: 'Select the type of the panel.',
      defaultValue: PanelType.EmptyPanel,
      settings: {
        allowCustomValue: false,
        options: [],
        getOptions: getPanelTypeOptions,
      },
    })
    .addTextInput({
      path: 'savedState',
      name: 'State of the plugin',
      description: 'Saved state (JSON format)',
      defaultValue: '{}',
      showIf: () => false,
    });
});
