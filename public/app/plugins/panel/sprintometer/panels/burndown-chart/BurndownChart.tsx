import { css } from '@emotion/css';
import { Loader2, Sparkles } from 'lucide-react';
import React, { useMemo } from 'react';

import { PanelProps } from '@grafana/data';

import {
  UiAiViewer,
  UiButton,
  UiFiltersContainer,
  UiHorizontalGroup,
  UiMultiSelect,
  UiSelect,
  UiSwitch,
  UiText,
} from '../../components/ui';
import { UiPanelContainer } from '../../components/ui/panel-container/PanelContainer';
import { useAiChatDrawer } from '../../features/ai-chat';
import { useEcharts } from '../../hooks/useEcharts';
import { useGrafanaVariables } from '../../hooks/useGrafanaVariables';
import { usePluginState } from '../../hooks/usePluginState';
import { TPanelOptions } from '../../types';
import { getGrafanaCustomData } from '../../utils/grafana';

import { useAiPrediction } from './api/useAiPrediction';
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
import { initial } from './mocks/initial';
import { MBurndownCustomData, EValueMode } from './types';
import { filterBurndownChartData, getChartOptions, prepareData } from './utils';

interface BurndownChartProps extends PanelProps<TPanelOptions> {}

const initialData: MBurndownCustomData = initial;

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
  const grafanaVariables = useGrafanaVariables(['team', 'project']);

  // AI Chat Drawer
  const { openAutoSummary, drawer } = useAiChatDrawer({
    teamId: grafanaVariables.team as string,
    project: grafanaVariables.project as string,
    dashboard: options.burndown?.dashboard,
    metric: options.burndown?.metric,
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

  const futureDates = useMemo(() => {
    if (actual.length >= days.length) {
      return [];
    }
    return days.slice(actual.length);
  }, [actual, days]);

  const lastActualValue = actual.length > 0 ? actual[actual.length - 1] : 0;

  // Only enable prediction if we have some data and remaining days
  const { data: aiForecast, loading: aiLoading } = useAiPrediction({
    enabled: actual.length > 0 && futureDates.length > 0,
    startValue: lastActualValue,
    futureDates,
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

        // aiForecast: aiLoading ? null : aiForecast,
      }),
    [actual, ideal, currentDay, scopeChanges, nonWorkingDays, days, valueMode, aiForecast, aiLoading]
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
            {ai ? (
              <UiAiViewer title={ai?.title} content={ai?.content} label="AI data" />
            ) : (
              <UiButton onClick={openAutoSummary} variant="ai">
                <Sparkles />
                AI helper
              </UiButton>
            )}
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
        {aiLoading && (
          <UiHorizontalGroup gap="xs">
            <Loader2
              size={16}
              className={css`
                animation: spin 1s linear infinite;
                @keyframes spin {
                  100% {
                    transform: rotate(360deg);
                  }
                }
              `}
            />
            <UiText>AI calculating...</UiText>
          </UiHorizontalGroup>
        )}
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
      {drawer}
    </UiPanelContainer>
  );
};
