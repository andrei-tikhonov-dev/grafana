import { GetMetricAiForecastBoardTypeEnum, GetMetricAiForecastMetricNameEnum } from '@architeq/core-api-client';
import { css } from '@emotion/css';
import { Loader2 } from 'lucide-react';
import React, { useMemo } from 'react';

import { PanelProps } from '@grafana/data';

import { useApi } from '../../api';
import { UiFiltersContainer, UiHorizontalGroup, UiMultiSelect, UiSelect, UiSwitch, UiText } from '../../components/ui';
import { UiPanelContainer } from '../../components/ui/panel-container/PanelContainer';
import { usePanelAiChat } from '../../features/ai-chat';
import { useEcharts } from '../../hooks/useEcharts';
import { useGrafanaVariables } from '../../hooks/useGrafanaVariables';
import { useMockAiForecastClient } from '../../hooks/useMockAiForecastClient';
import { usePluginState } from '../../hooks/usePluginState';
import { TPanelOptions } from '../../types';
import { getGrafanaCustomData } from '../../utils/grafana';

import { createAiForecastApiClientAdapter } from './api/createAiForecastApiClientAdapter';
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
  id,
}) => {
  const initialState: BurndownChartState = {
    valueMode: EValueMode.StoryPoints,
    selectedIssues: [],
    showNonWorkingDays: true,
  };

  const [state, setState] = usePluginState<BurndownChartState>(options, onOptionsChange, initialState);
  const { valueMode, selectedIssues, showNonWorkingDays } = state;
  const grafanaVariables = useGrafanaVariables(['team', 'project']);
  const { config, isBasePathReady } = useApi();
  const mockForecastClient = useMockAiForecastClient(options);

  const forecastClient = useMemo(() => {
    if (mockForecastClient) {
      return mockForecastClient;
    }
    return createAiForecastApiClientAdapter(config);
  }, [mockForecastClient, config]);

  const { ai, ...customData } = getGrafanaCustomData<MBurndownCustomData>(panelData, initialData);

  const { toggle, drawer } = usePanelAiChat({
    panelId: id,
    aiEnabled: options.aiEnabled,
    dashboard: options.burndown?.dashboard,
    metric: options.burndown?.metric,
    aiData: ai,
    mockConfig: options.aiChatMock,
  });

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

  const { data: aiForecast, loading: aiLoading } = useAiPrediction({
    client: forecastClient,
    enabled: options.aiEnabled !== false && actual.length > 0 && futureDates.length > 0,
    isBasePathReady,
    teamId: grafanaVariables.team as string,
    project: grafanaVariables.project as string,
    boardType: (options.burndown?.dashboard ?? '') as GetMetricAiForecastBoardTypeEnum,
    metricName: (options.burndown?.metric ?? '') as GetMetricAiForecastMetricNameEnum,
    valueMode,
    showNonWorkingDays,
    selectedIssues,
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

        aiForecast: aiLoading ? null : aiForecast,
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
            {toggle}
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
