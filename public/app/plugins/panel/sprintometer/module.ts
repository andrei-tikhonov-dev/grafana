import { PanelPlugin } from '@grafana/data';

import { Panel } from './Panel';
import { PANELS_REGISTRY } from './registry';
import { TPanelOptions, EPanelType } from './types';

export const getPanelTypeOptions = async () => {
  return Promise.resolve([
    { label: 'Empty panel', value: EPanelType.EmptyPanel },
    { label: 'Header', value: EPanelType.Header },
    { label: 'Burndown chart', value: EPanelType.BurndownChart },
    { label: 'Cumulative flow diagram', value: EPanelType.CumulativeFlowDiagram },
    { label: 'Incoming dependencies', value: EPanelType.IncomingDependencies },
    { label: 'Outgoing dependencies', value: EPanelType.OutgoingDependencies },
    { label: 'Similar issues', value: EPanelType.SimilarIssues },
    { label: 'Planner board', value: EPanelType.PlannerBoard },
    { label: 'Roadmap', value: EPanelType.Roadmap },
    { label: 'Components library', value: EPanelType.ComponentsLibrary },
    { label: 'Issue map', value: EPanelType.IssueMap },
    { label: 'AI', value: EPanelType.AI },
  ]);
};

export const plugin = new PanelPlugin<TPanelOptions>(Panel).setPanelOptions((builder) => {
  builder
    .addSelect({
      category: ['Sprintometer Configuration'],
      path: 'panelType',
      name: 'Panel type',
      description: 'Select the type of the panel.',
      defaultValue: EPanelType.EmptyPanel,
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

  for (const [_, descriptor] of Object.entries(PANELS_REGISTRY) as Array<
    [EPanelType, (typeof PANELS_REGISTRY)[EPanelType]]
  >) {
    if (descriptor.registerOptions) {
      descriptor.registerOptions(builder);
    }
  }

  return builder;
});
