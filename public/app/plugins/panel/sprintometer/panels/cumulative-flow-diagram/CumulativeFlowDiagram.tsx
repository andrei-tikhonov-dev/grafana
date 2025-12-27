import { css } from '@emotion/css';
import { Sparkles } from 'lucide-react';
import React, { useMemo } from 'react';

import { PanelProps } from '@grafana/data';

import { UiAiViewer, UiButton, UiFiltersContainer, UiMultiSelect, UiSwitch } from '../../components/ui';
import { UiPanelContainer } from '../../components/ui/panel-container/PanelContainer';
import { useAiChatDrawer } from '../../features/ai-chat';
import { useEcharts } from '../../hooks/useEcharts';
import { useGrafanaVariables } from '../../hooks/useGrafanaVariables';
import { usePluginState } from '../../hooks/usePluginState';
import { TPanelOptions } from '../../types';
import { getGrafanaCustomData } from '../../utils/grafana';

import { PLACEHOLDER_SELECT_ISSUE } from './constants';
import { EPeriod, MData } from './types';
import { filterCumulativeFlowDiagramData, getCumulativeFlowDiagramOptions, prepareData } from './utils';

interface CumulativeFlowDiagramProps extends PanelProps<TPanelOptions> {}

const initialData: MData = {
  periodType: EPeriod.String,
  currentPeriod: '',
  periods: [],
  issueTypes: [],
};

interface CumulativeFlowDiagramState {
  selectedIssues: string[];
  selectedStatuses: Record<string, boolean>;
  isStacked: boolean;
}

export const CumulativeFlowDiagram: React.FC<CumulativeFlowDiagramProps> = ({
  width,
  height,
  data: panelData,
  options,
  onOptionsChange,
}) => {
  const initialState: CumulativeFlowDiagramState = {
    selectedIssues: [],
    selectedStatuses: {},
    isStacked: false,
  };

  const [state, setState] = usePluginState<CumulativeFlowDiagramState>(options, onOptionsChange, initialState);
  const { selectedIssues, selectedStatuses, isStacked } = state;

  const { ai, ...customData } = getGrafanaCustomData<MData>(panelData, initialData);

  const { periodsData, currentPeriod, issueOptions, data, periodType } = useMemo(() => {
    return prepareData(customData);
  }, [customData]);

  const { filteredData, periods } = filterCumulativeFlowDiagramData({
    data,
    selectedIssues,
    periodsData,
    periodType,
  });

  const grafanaVariables = useGrafanaVariables(['team', 'project']);

  // AI Chat Drawer
  const { openAutoSummary, drawer } = useAiChatDrawer({
    teamId: grafanaVariables.team as string,
    project: grafanaVariables.project as string,
    dashboard: options.cumulativeFlowDiagram?.dashboard,
    metric: options.cumulativeFlowDiagram?.metric,
    startScreen: {
      title: 'Your sprint, explained instantly',
      subtitle: 'Choose a question to get data-driven insights',
      prompts: [
        'Check the pulse of your sprint and spot problems early',
        'Understand how your team is doing & where improvement is possible',
        'Predict outcomes and understand "what-ifs"',
        'Learn from historical data and uncover recurring patterns',
      ],
    },
  });

  const option = useMemo(
    () =>
      getCumulativeFlowDiagramOptions({
        data: filteredData,
        periods,
        currentPeriod,
        selected: selectedStatuses,
        isStacked,
      }),
    [filteredData, currentPeriod, periods, selectedStatuses, isStacked]
  );

  const handleStatusesChange = ({ selected }: { selected: Record<string, boolean> }) => {
    setState((prevState) => ({
      ...prevState,
      selectedStatuses: selected,
    }));
  };

  const chartRef = useEcharts({ width, height, option, onLegendSelectChanged: handleStatusesChange });

  const handleIssuesChange = (values: string[]) => {
    setState((prevState) => ({
      ...prevState,
      selectedIssues: values,
    }));
  };

  const handleStackedChange = (checked: boolean) => {
    setState((prevState) => ({
      ...prevState,
      isStacked: checked,
    }));
  };

  // @ts-ignore
  const dashboard = options.cumulativeFlowDiagram?.dashboard;

  return (
    <UiPanelContainer width={width} height={height} title="Cumulative flow diagram">
      <UiFiltersContainer
        suffix={
          ai ? (
            <UiAiViewer title={ai?.title} content={ai?.content} label="AI data" />
          ) : (
            <UiButton onClick={openAutoSummary} variant="ai">
              <Sparkles />
              AI helper
            </UiButton>
          )
        }
      >
        <UiMultiSelect
          options={issueOptions}
          defaultValue={selectedIssues}
          onValueChange={handleIssuesChange}
          placeholder={PLACEHOLDER_SELECT_ISSUE}
        />
        <UiSwitch id="stack-switch" label="Stacked" checked={isStacked} onCheckedChange={handleStackedChange} />
      </UiFiltersContainer>

      <div
        ref={chartRef}
        className={css`
          flex: 1 1 auto;
        `}
      />
      {drawer}
    </UiPanelContainer>
  );
};
