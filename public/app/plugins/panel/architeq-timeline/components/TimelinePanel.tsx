import { css, cx } from '@emotion/css';
import React from 'react';

import { dateTime, GrafanaTheme2, PanelProps } from '@grafana/data';
import { Icon, useStyles2 } from '@grafana/ui';

import { PanelOptions, SprintMeta } from '../types';

import { SprintStatus } from './SprintStatus';
import { SprintTimeline } from './SprintTimeline';

interface Props extends PanelProps<PanelOptions> {}

const getStyles = (theme: GrafanaTheme2) => {
  return {
    wrapper: css`
      position: relative;
      overflow: auto;
    `,
    info: css`
      display: flex;
      gap: 3rem;
    `,
    infoItem: css`
      display: flex;
      gap: 5px;
      align-items: center;
    `,
    timeline: css`
      padding: 24px 0;
    `,
    status: css`
      display: flex;
      gap: 5px;
      align-items: baseline;
    `,
    statusOk: css`
      color: ${theme.colors.success.text};
    `,
    statusBad: css`
      color: ${theme.colors.error.text};
    `,
    footer: css`
      display: flex;
      flex-direction: column;
    `,
  };
};

export const TimelinePanel: React.FC<Props> = ({ data, width, height }) => {
  const styles = useStyles2(getStyles);
  const meta = data.series[0]?.meta as SprintMeta;
  const { name, team, from, till, weeks, sprintOnTarget, completedIssues, totalIssues } = meta.custom;

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
      <div className={styles.info}>
        <div className={styles.infoItem}>
          <strong>Sprint:</strong>
          {name}
        </div>
        <div className={styles.infoItem}>
          <Icon name="users-alt" size="md" />
          <strong>Team:</strong>
          {team}
        </div>
        <div className={styles.infoItem}>
          <Icon name="calendar-alt" size="md" />
          <strong>Date:</strong>
          {dateTime(from).format('DD MMM, YYYY')} - {dateTime(till).format('DD MMM, YYYY')}
        </div>
      </div>
      <div className={styles.timeline}>
        <SprintTimeline weeks={weeks} />
      </div>
      <div className={styles.footer}>
        <SprintStatus status={sprintOnTarget.status} message={sprintOnTarget.message} />
        <div>
          {completedIssues} of {totalIssues} issues have been completed
        </div>
      </div>
    </div>
  );
};
