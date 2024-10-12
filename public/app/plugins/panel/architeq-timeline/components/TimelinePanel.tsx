import { css, cx } from '@emotion/css';
import React from 'react';

import { dateTime, GrafanaTheme2, PanelProps } from '@grafana/data';
import { Icon, useStyles2 } from '@grafana/ui';

import { PanelOptions, SprintMeta } from '../types';

import { Goals } from './Goals';
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
      gap: 24px;
      margin-bottom: 24px;
    `,
    infoItem: css`
      display: flex;
      gap: 5px;
      align-items: center;
    `,
    timeline: css`
      margin-bottom: 24px;
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
      margin-bottom: 12px;
    `,
  };
};

export const TimelinePanel: React.FC<Props> = ({ options, data, width, height, fieldConfig, id }) => {
  const styles = useStyles2(getStyles);
  const meta = data.series[0]?.meta as SprintMeta;
  const {
    name,
    team,
    from,
    till,
    weeks,
    goals,
    sprintOnTarget,
    infoStatus,
    completedIssues,
    totalIssues,
    description,
  } = meta.custom;
  const descriptionIssues =
    completedIssues !== undefined && totalIssues !== undefined
      ? `${completedIssues} of ${totalIssues} issues have been completed`
      : '';

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
      <h1>
        {options.header} {name}
      </h1>
      <div className={styles.info}>
        <div className={styles.infoItem}>
          <Icon name="users-alt" size="md" />
          <strong>Team:</strong>
          {team}
        </div>
        <div className={styles.infoItem}>
          <Icon name="calendar-alt" size="md" />
          <strong>Start:</strong>
          {dateTime(from).format('DD MMM, YYYY')}
        </div>
        <div className={styles.infoItem}>
          <Icon name="calendar-alt" size="md" />
          <strong>End:</strong>
          {dateTime(till).format('DD MMM, YYYY')}
        </div>
      </div>
      {goals && <Goals data={goals} title={options.goalsTitle} />}

      {weeks && (
        <div className={styles.timeline}>
          <SprintTimeline weeks={weeks} />
        </div>
      )}

      <footer className={styles.footer}>
        {sprintOnTarget && <SprintStatus status={sprintOnTarget.status} message={sprintOnTarget.message} />}
        {infoStatus && <SprintStatus status={infoStatus.status} message={infoStatus.message} />}
        {descriptionIssues && <div>{descriptionIssues}</div>}
        {description && <div>{description}</div>}
      </footer>
    </div>
  );
};
