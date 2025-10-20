import { css, cx } from '@emotion/css';
import React, { useMemo } from 'react';

import { PanelProps } from '@grafana/data';

import { UiHorizontalGroup, UiMultiSelect, UiSwitch } from '../../components/ui';
import { useEcharts } from '../../hooks/useEcharts';
import { usePluginState } from '../../hooks/usePluginState';
import { theme } from '../../theme';
import { TPanelOptions } from '../../types';
import { getGrafanaCustomData } from '../../utils/grafana';

import { PLACEHOLDER_SELECT_ISSUE } from './constants';
import { MData } from './types';
import { filterCumulativeFlowDiagramData, getCumulativeFlowDiagramOptions, prepareData } from './utils';

interface CumulativeFlowDiagramProps extends PanelProps<TPanelOptions> {}

const styles = {
  wrapper: css`
    overflow: auto;
  `,
  container: css`
    height: 100%;
    padding: 10px;
    flex: 1 1 auto;
    font-family: ${theme.typography.fontFamily};
    gap: 20px;
    display: flex;
    flex-direction: column;
    min-width: 998px;
  `,
  content: css`
    flex: 1 1 auto;
  `,
  summaryContainer: css`
    flex: 0 0 auto;
    display: flex;
    gap: 10px;
    width: 100%;
  `,
  issueTypesSelect: css`
    width: auto;
  `,
};

const initialData: MData = {
  periodType: 'string',
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

  const customData = getGrafanaCustomData<MData>(panelData, initialData);

  const { periodsData, currentPeriod, issueOptions, data, periodType } = useMemo(() => {
    return prepareData(customData);
  }, [customData]);

  const { filteredData, periods } = filterCumulativeFlowDiagramData({
    data,
    selectedIssues,
    periodsData,
    periodType,
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
    <div
      className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
        `
      )}
    >
      <div className={styles.container}>
        <UiHorizontalGroup justify="start">
          <UiMultiSelect
            options={issueOptions}
            defaultValue={selectedIssues}
            onValueChange={handleIssuesChange}
            placeholder={PLACEHOLDER_SELECT_ISSUE}
            className={styles.issueTypesSelect}
          />
          <UiSwitch id="stack-switch" label="Stacked" checked={isStacked} onCheckedChange={handleStackedChange} />
        </UiHorizontalGroup>

        <div ref={chartRef} className={styles.content} />
      </div>
    </div>
  );
};
