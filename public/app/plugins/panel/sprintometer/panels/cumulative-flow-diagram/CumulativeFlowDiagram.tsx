import { css } from '@emotion/css';
import React, { useMemo } from 'react';

import { PanelProps } from '@grafana/data';

import { UiFiltersContainer, UiMultiSelect, UiSwitch } from '../../components/ui';
import { UiPanelContainer } from '../../components/ui/panel-container/PanelContainer';
import { usePanelAiChat } from '../../features/ai-chat';
import { useEcharts } from '../../hooks/useEcharts';
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
  id,
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

  const { toggle, drawer } = usePanelAiChat({
    panelId: id,
    aiEnabled: options.aiEnabled,
    dashboard: options.cumulativeFlowDiagram?.dashboard,
    metric: options.cumulativeFlowDiagram?.metric,
    aiData: ai,
    mockConfig: options.aiChatMock,
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

  return (
    <UiPanelContainer width={width} height={height} title="Cumulative flow diagram">
      <UiFiltersContainer suffix={toggle}>
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
