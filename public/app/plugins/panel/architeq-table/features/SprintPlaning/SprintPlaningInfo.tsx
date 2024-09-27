import { css } from '@emotion/css';
import React, { ReactElement } from 'react';

import { dateTime, GrafanaTheme2 } from '@grafana/data';
import { Icon, useStyles2 } from '@grafana/ui';

import { LoadingMode } from '../../constants';
import { Status } from '../../types';

import { SprintPlaningInfoCard } from './SprintPlaningInfoCard';
import { SprintPlaningInfoType } from './types';

export const INFO_HEIGHT = 260;

const getStyles = (theme: GrafanaTheme2) => {
  return {
    container: css`
      height: ${INFO_HEIGHT}px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 20px;
    `,
    info: css`
      display: flex;
    `,
    infoItem: css`
      display: flex;
      gap: 5px;

      &:not(:last-of-type)::after {
        content: '•';
        margin-left: 10px;
        margin-right: 10px;
        color: ${theme.colors.text.secondary};
      }
    `,
    label: css`
      display: flex;
      gap: 4px;
      align-items: baseline;
    `,
    statusLine: css`
      display: flex;
      gap: 4px;
      align-items: center;
    `,
    cardContainer: css`
      display: flex;
      gap: 16px;
    `,
    statusOk: css`
      color: ${theme.colors.success.text};
    `,
    statusCritical: css`
      color: ${theme.colors.error.text};
    `,
    statusWarning: css`
      color: ${theme.colors.warning.text};
    `,
  };
};

interface Props extends SprintPlaningInfoType {
  onUpdate?: (value?: number) => void;
  loading?: LoadingMode;
}

export const SprintPlaningInfo: React.FC<Props> = (props) => {
  const styles = useStyles2(getStyles);
  const sprintStatusStories = props.sprintStatus.storiesInfo;

  const StatusIcons: Record<string, ReactElement> = {
    [Status.OK]: (
      <span className={styles.statusOk}>
        <Icon name="check-circle" />
      </span>
    ),
    [Status.WARNING]: (
      <span className={styles.statusWarning}>
        <Icon name="exclamation-circle" />
      </span>
    ),
    [Status.CRITICAL]: (
      <span className={styles.statusCritical}>
        <Icon name="times-circle" />
      </span>
    ),
  };

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.infoItem}>
          <strong className={styles.label}>Sprint: </strong>
          {props.sprintName}
        </div>
        <div className={styles.infoItem}>
          <strong className={styles.label}>
            <Icon name="calendar-alt" size="sm" /> Start:{' '}
          </strong>
          {dateTime(props.startDate).format('DD MMM, YYYY')}
        </div>
        <div className={styles.infoItem}>
          <strong className={styles.label}>
            <Icon name="calendar-alt" size="sm" /> End:{' '}
          </strong>
          {dateTime(props.endDate).format('DD MMM, YYYY')}
        </div>
      </div>

      <div className={styles.statusLine}>
        {StatusIcons[sprintStatusStories?.status]}
        {sprintStatusStories?.message}
      </div>

      <div className={styles.cardContainer}>
        <SprintPlaningInfoCard {...props} />
      </div>
    </div>
  );
};
