import { PanelPlugin } from '@grafana/data';

import { Panel } from './Panel';
import { PanelOptions, PanelTypeEnum } from './types';

export const getPanelTypeOptions = async () => {
  return Promise.resolve([
    { label: 'Empty panel', value: PanelTypeEnum.EmptyPanel },
    { label: 'Header', value: PanelTypeEnum.Header },
    { label: 'Burndown chart', value: PanelTypeEnum.BurndownChart },
    { label: 'Cumulative flow diagram', value: PanelTypeEnum.CumulativeFlowDiagram },
    { label: 'Incoming dependencies', value: PanelTypeEnum.IncomingDependencies },
    { label: 'Outgoing dependencies', value: PanelTypeEnum.OutgoingDependencies },
    { label: 'Similar issues', value: PanelTypeEnum.SimilarTasks },
    { label: 'Components library', value: PanelTypeEnum.ComponentsLibrary },
  ]);
};

export const plugin = new PanelPlugin<PanelOptions>(Panel).setPanelOptions((builder) => {
  return builder
    .addSelect({
      category: ['Sprintometer Configuration'],
      path: 'panelType',
      name: 'Panel type',
      description: 'Select the type of the panel.',
      defaultValue: PanelTypeEnum.EmptyPanel,
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
