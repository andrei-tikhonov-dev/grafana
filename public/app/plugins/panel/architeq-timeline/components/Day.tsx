import { css } from '@emotion/css';
import React, { ReactElement } from 'react';

import { GrafanaTheme2 } from '@grafana/data';
import { useStyles2 } from '@grafana/ui';

import { DayStatus } from '../types';

interface Props extends DayStatus {}

const dayOfWeekMapper: { [key: number]: string } = {
  1: 'Mon',
  2: 'Tue',
  3: 'Wed',
  4: 'Thu',
  5: 'Fri',
  6: 'Sat',
  7: 'Sun',
};

const getStyles = (theme: GrafanaTheme2) => ({
  wrapper: css`
    width: 85px;
    height: 42px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  `,
  day: css`
    height: 20px;
    width: 100%;
    display: flex;
    gap: 0;
  `,
  finished: css`
    width: 100%;
    height: 12px;
    background-color: ${theme.colors.warning.main};
  `,
  notStarted: css`
    width: 100%;
    height: 12px;
    background-color: ${theme.colors.secondary.main};
  `,
});

export const Day: React.FC<Props> = ({ status, dayOfWeek }) => {
  const styles = useStyles2(getStyles);

  const statusMapper: { [key: string]: ReactElement } = {
    FINISHED: <div className={styles.finished} />,
    IN_PROGRESS: (
      <>
        <div className={styles.finished} />
        <div className={styles.notStarted} />
      </>
    ),
    NOT_STARTED: <div className={styles.notStarted} />,
  };

  return (
    <div className={styles.wrapper}>
      {dayOfWeekMapper[dayOfWeek]}
      <div className={styles.day}>{statusMapper[status]}</div>
    </div>
  );
};
