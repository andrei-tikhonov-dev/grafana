import { css, cx } from '@emotion/css';
import React, { useMemo } from 'react';

import { PanelProps, SelectableValue } from '@grafana/data';
import { MultiSelect, Select, Switch } from '@grafana/ui';

import { UiEllipsis } from '../../components/ui';
import { useEcharts } from '../../hooks/useEcharts';
import { usePluginState } from '../../hooks/usePluginState';
import { theme } from '../../theme';
import { TPanelOptions } from '../../types';
import { getGrafanaCustomData } from '../../utils/grafana';

import { ScopeChangesViewer } from './components/ScopeChangesViewer';
import { Summary } from './components/Summary';
import {
  ISSUES_AMOUNT_COLOR,
  LABEL_ISSUES_AMOUNT,
  LABEL_STORY_POINTS,
  PLACEHOLDER_SELECT_ISSUE,
  PLACEHOLDER_SELECT_VALUE,
  STORY_POINTS_COLOR,
} from './constants';
import { MBurndownCustomData, EValueMode } from './types';
import { filterBurndownChartData, getChartOptions, prepareData } from './utils';

interface BurndownChartProps extends PanelProps<TPanelOptions> {}

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
  switchContainer: css`
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 8px;
  `,
};

const initialData: MBurndownCustomData = {
  currentDate: '',
  days: [],
  issueTypes: [],
  summary: {
    [EValueMode.StoryPoints]: { completed: 0, remaining: 0, total: 0, percentage: 0 },
    [EValueMode.IssuesAmount]: { completed: 0, remaining: 0, total: 0, percentage: 0 },
  },
};

interface BurndownChartState {
  valueMode: EValueMode;
  selectedIssues: string[];
  showNonWorkingDays: boolean;
}

export const BurndownChart: React.FC<BurndownChartProps> = ({
  width,
  height,
  data: panelData,
  options,
  onOptionsChange,
}) => {
  const initialState: BurndownChartState = {
    valueMode: EValueMode.StoryPoints,
    selectedIssues: [],
    showNonWorkingDays: true,
  };

  const [state, setState] = usePluginState<BurndownChartState>(options, onOptionsChange, initialState);
  const { valueMode, selectedIssues, showNonWorkingDays } = state;

  const customData = getGrafanaCustomData<MBurndownCustomData>(panelData, initialData);

  const { summary, daysData, currentDay, issueOptions, valueOptions, data, scopeChanges } = useMemo(() => {
    return prepareData(customData);
  }, [customData]);

  const { actual, ideal, days, nonWorkingDays } = filterBurndownChartData({
    data,
    valueMode,
    selectedIssues,
    daysData,
    showNonWorkingDays,
  });

  const option = useMemo(
    () =>
      getChartOptions({
        color: valueMode === EValueMode.StoryPoints ? STORY_POINTS_COLOR : ISSUES_AMOUNT_COLOR,
        actual,
        ideal,
        days,
        currentDay,
        nonWorkingDays,
        scopeChanges,
      }),
    [actual, ideal, currentDay, scopeChanges, nonWorkingDays, days, valueMode]
  );

  const chartRef = useEcharts({ width, height, option });

  const handleValueModeChange = (value: SelectableValue<string>) => {
    setState((prevState) => ({
      ...prevState,
      valueMode: value.value as EValueMode,
    }));
  };

  const handleIssuesChange = (values: Array<SelectableValue<string>>) => {
    const stringValues = values.map((v) => v.value!);
    setState((prevState) => ({
      ...prevState,
      selectedIssues: stringValues,
    }));
  };

  const handleShowNonWorkingDaysChange = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    setState((prevState) => ({
      ...prevState,
      showNonWorkingDays: target.checked,
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
            <Select
              options={valueOptions}
              value={valueMode}
              onChange={handleValueModeChange}
              placeholder={PLACEHOLDER_SELECT_VALUE}
            />
          </div>
          <div className={styles.input}>
            <MultiSelect
              options={issueOptions}
              value={issueOptions.filter((option: SelectableValue<string>) => selectedIssues.includes(option.value!))}
              onChange={handleIssuesChange}
              placeholder={PLACEHOLDER_SELECT_ISSUE}
            />
          </div>
          <div className={styles.input}>
            <ScopeChangesViewer daysData={daysData} />
          </div>
          <div className={styles.switchContainer}>
            <UiEllipsis>Show non-working days</UiEllipsis>
            <Switch value={showNonWorkingDays} onChange={handleShowNonWorkingDaysChange} />
          </div>
        </div>

        <div ref={chartRef} className={styles.content} />

        <div className={styles.summaryContainer}>
          <Summary name={LABEL_STORY_POINTS} summary={summary.storyPoints} color={STORY_POINTS_COLOR} />
          <Summary name={LABEL_ISSUES_AMOUNT} summary={summary.issuesAmount} color={ISSUES_AMOUNT_COLOR} />
        </div>
      </div>
    </div>
  );
};
