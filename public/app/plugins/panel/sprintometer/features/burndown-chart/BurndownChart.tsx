import { css, cx } from '@emotion/css';
import React, { useMemo, useState } from 'react';

import { PanelProps, SelectableValue } from '@grafana/data';
import { MultiSelect, Select } from '@grafana/ui';

import { theme } from '../../theme';
import { PanelOptions } from '../../types';
import { getGrafanaCustomData } from '../../utils/grafana';

import { BurndownSummary } from './BurndownSummary';
import {
  ISSUES_AMOUNT_COLOR,
  LABEL_ISSUES_AMOUNT,
  LABEL_STORY_POINTS,
  PLACEHOLDER_SELECT_ISSUE,
  PLACEHOLDER_SELECT_VALUE,
  STORY_POINTS_COLOR,
} from './constants';
import { useEcharts } from './hooks/useEcharts';
import { BurndownCustomData, ValueMode } from './types';
import { filterBurndownChartData, getChartOptions, prepareData } from './utils';

interface Props extends PanelProps<PanelOptions> {}

const styles = {
  wrapper: css`
    padding: 10px;
    font-family: ${theme.typography.fontFamily};
    gap: 20px;
    display: flex;
    flex-direction: column;
  `,
  content: css`
    flex: 1 1 auto;
  `,
  header: css`
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

  select: css`
    width: 350px;
  `,
};

export const BurndownChart: React.FC<Props> = ({ width, height, data: panelData }) => {
  const [valueMode, setValueMode] = useState<ValueMode>(ValueMode.StoryPoints);
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);

  const color = valueMode === ValueMode.StoryPoints ? STORY_POINTS_COLOR : ISSUES_AMOUNT_COLOR;

  const customData = getGrafanaCustomData<BurndownCustomData>(panelData);

  const { summary, days, currentDay, issueOptions, valueOptions, data } = useMemo(() => {
    return customData ? prepareData(customData) : ({} as any);
  }, [customData]);

  const { actual, ideal } = filterBurndownChartData(data, valueMode, selectedIssues);

  const option = useMemo(
    () =>
      getChartOptions({
        actual,
        ideal,
        days,
        currentDay,
        nonWorkingDays: [],
        color,
      }),
    [actual, ideal, days, currentDay, color]
  );

  const chartRef = useEcharts({ width, height, option });

  const handleIssuesChange = (values: Array<SelectableValue<string>>) => {
    const stringValues = values.map((v) => v.value!);
    setSelectedIssues(stringValues);
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
      <div className={styles.header}>
        <div className={styles.select}>
          <Select
            options={valueOptions}
            value={valueMode}
            onChange={(value) => setValueMode(value.value as ValueMode)}
            placeholder={PLACEHOLDER_SELECT_VALUE}
          />
        </div>
        <div className={styles.select}>
          <MultiSelect
            options={issueOptions}
            value={issueOptions.filter((option: SelectableValue<string>) => selectedIssues.includes(option.value!))}
            onChange={handleIssuesChange}
            placeholder={PLACEHOLDER_SELECT_ISSUE}
          />
        </div>
      </div>

      <div ref={chartRef} className={styles.content} />

      <div className={styles.summaryContainer}>
        <BurndownSummary name={LABEL_STORY_POINTS} summary={summary.storyPoints} color={STORY_POINTS_COLOR} />
        <BurndownSummary name={LABEL_ISSUES_AMOUNT} summary={summary.issuesAmount} color={ISSUES_AMOUNT_COLOR} />
      </div>
    </div>
  );
};
