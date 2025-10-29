import { css } from '@emotion/css';
import React, { useMemo } from 'react';

import { PanelProps } from '@grafana/data';

import {
  UiAiViewer,
  UiFiltersContainer,
  UiHorizontalGroup,
  UiMultiSelect,
  UiSelect,
  UiSwitch,
} from '../../components/ui';
import { UiPanelContainer } from '../../components/ui/panel-container/PanelContainer';
import { useEcharts } from '../../hooks/useEcharts';
import { usePluginState } from '../../hooks/usePluginState';
import { TPanelOptions } from '../../types';
import { getGrafanaCustomData } from '../../utils/grafana';

import { ScopeChangesViewer } from './components/ScopeChangesViewer';
import { Summary } from './components/Summary';
import {
  CHECKBOX_NON_WORKING_DAYS,
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

  const { ai, ...customData } = getGrafanaCustomData<MBurndownCustomData>(panelData, initialData);

  const { summary, daysData, currentDay, issueOptions, valueOptions, data, scopeChanges } = useMemo(() => {
    return prepareData(customData);
  }, [customData]);

  const uiSelectGroups = useMemo(() => {
    return [
      {
        label: 'Value Mode',
        options: valueOptions,
      },
    ];
  }, [valueOptions]);

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

  const handleValueModeChange = (value: string) => {
    setState((prevState) => ({
      ...prevState,
      valueMode: value as EValueMode,
    }));
  };

  const handleIssuesChange = (values: string[]) => {
    setState((prevState) => ({
      ...prevState,
      selectedIssues: values,
    }));
  };

  const handleShowNonWorkingDaysChange = (checked: boolean) => {
    setState((prevState) => ({
      ...prevState,
      showNonWorkingDays: checked,
    }));
  };

  return (
    <UiPanelContainer width={width} height={height} title="Burndown chart">
      <UiFiltersContainer
        suffix={
          <>
            <ScopeChangesViewer daysData={daysData} />
            {ai && <UiAiViewer label="View AI analysis" content={ai.content} title={ai.title} />}
          </>
        }
      >
        <UiSelect
          groups={uiSelectGroups}
          value={valueMode}
          onValueChange={handleValueModeChange}
          placeholder={PLACEHOLDER_SELECT_VALUE}
        />
        <UiMultiSelect
          options={issueOptions}
          defaultValue={selectedIssues}
          onValueChange={handleIssuesChange}
          placeholder={PLACEHOLDER_SELECT_ISSUE}
        />
        <UiSwitch
          label={CHECKBOX_NON_WORKING_DAYS}
          id="weekends"
          checked={showNonWorkingDays}
          onCheckedChange={handleShowNonWorkingDaysChange}
        />
      </UiFiltersContainer>

      <div
        ref={chartRef}
        className={css`
          flex: 1 1 auto;
        `}
      />

      <UiHorizontalGroup>
        <Summary name={LABEL_STORY_POINTS} summary={summary.storyPoints} color={STORY_POINTS_COLOR} />
        <Summary name={LABEL_ISSUES_AMOUNT} summary={summary.issuesAmount} color={ISSUES_AMOUNT_COLOR} />
      </UiHorizontalGroup>
    </UiPanelContainer>
  );
};
