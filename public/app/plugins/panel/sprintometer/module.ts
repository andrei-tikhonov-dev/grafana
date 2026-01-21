import { PanelPlugin } from '@grafana/data';

import { Panel } from './Panel';
import { DEFAULT_CONFIGURATION_CATEGORY } from './constants';
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

const AI_CHAT_MOCK_CATEGORY = ['AI Chat Mock'];

export const plugin = new PanelPlugin<TPanelOptions>(Panel).setPanelOptions((builder) => {
  builder
    .addSelect({
      category: DEFAULT_CONFIGURATION_CATEGORY,
      path: 'panelType',
      name: 'Panel type',
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
    })
    .addBooleanSwitch({
      category: AI_CHAT_MOCK_CATEGORY,
      path: 'aiChatMock.useMock',
      name: 'Use mock',
      description: 'Enable mock AI chat responses instead of real API calls',
      defaultValue: false,
    })
    .addTextInput({
      category: AI_CHAT_MOCK_CATEGORY,
      path: 'aiChatMock.autoSummary',
      name: 'Auto-summary response',
      description: 'JSON object for auto-summary response. Leave empty for default.',
      defaultValue: '',
      settings: {
        useTextarea: true,
        rows: 6,
      },
    })
    .addTextInput({
      category: AI_CHAT_MOCK_CATEGORY,
      path: 'aiChatMock.general',
      name: 'General responses',
      description: 'JSON array of responses for general chat. Leave empty for default.',
      defaultValue: '',
      settings: {
        useTextarea: true,
        rows: 6,
      },
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
