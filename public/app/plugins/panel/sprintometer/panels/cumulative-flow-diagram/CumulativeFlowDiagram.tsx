import { css, cx } from '@emotion/css';
import React, { useMemo } from 'react';

import { PanelProps, SelectableValue } from '@grafana/data';
import { MultiSelect } from '@grafana/ui';

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
    overflow: hidden;
  `,
  container: css`
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
  filters: css`
    flex: 0 0 auto;
    display: flex;
    gap: 10px;
  `,
  summaryContainer: css`
    flex: 0 0 auto;
    display: flex;
    gap: 10px;
    width: 100%;
  `,
  input: css`
    width: 300px;
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
  };

  const [state, setState] = usePluginState<CumulativeFlowDiagramState>(options, onOptionsChange, initialState);
  const { selectedIssues, selectedStatuses } = state;

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
      }),
    [filteredData, currentPeriod, periods, selectedStatuses]
  );

  const handleStatusesChange = ({ selected }: { selected: Record<string, boolean> }) => {
    setState((prevState) => ({
      ...prevState,
      selectedStatuses: selected,
    }));
  };

  const chartRef = useEcharts({ width, height, option, onLegendSelectChanged: handleStatusesChange });

  const handleIssuesChange = (values: Array<SelectableValue<string>>) => {
    const stringValues = values.map((v) => v.value!);
    setState((prevState) => ({
      ...prevState,
      selectedIssues: stringValues,
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
      <div
        className={cx(
          styles.container,
          css`
            height: ${height}px;
          `
        )}
      >
        <div className={styles.filters}>
          <div className={styles.input}>
            <MultiSelect
              options={issueOptions}
              value={issueOptions.filter((option: SelectableValue<string>) => selectedIssues.includes(option.value!))}
              onChange={handleIssuesChange}
              placeholder={PLACEHOLDER_SELECT_ISSUE}
            />
          </div>
        </div>

        <div ref={chartRef} className={styles.content} />
      </div>
    </div>
  );
};
