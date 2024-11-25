import { css, cx } from '@emotion/css';
import React from 'react';

import { dateTime, GrafanaTheme2 } from '@grafana/data';
import { Tooltip, useStyles2 } from '@grafana/ui';

import { DayStatus } from '../types';

import { InfoLine } from './InfoLine';

const dayOfWeekMapper: { [key: number]: string } = {
  1: 'Mon',
  2: 'Tue',
  3: 'Wed',
  4: 'Thu',
  5: 'Fri',
  6: 'Sat',
  7: 'Sun',
};

const formatDateWithDay = (date?: string, dayOfWeek?: number): string => {
  if (dayOfWeek === undefined) {
    return dateTime(date).format('ddd DD MMM');
  }

  const dayName = dayOfWeekMapper[dayOfWeek];

  if (!date) {
    return dayName;
  }

  const formattedDate = dateTime(date).format('DD MMM');

  return `${dayName} ${formattedDate}`;
};

interface Props extends DayStatus {}

const getStyles = (theme: GrafanaTheme2) => {
  return {
    container: css`
      min-height: 60px;
      min-width: 120px;
      display: flex;
      gap: 4px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: ${theme.isDark ? theme.colors.text.primary : theme.colors.background.primary};
      border-radius: 4px;
    `,
    events: css`
      font-size: 18px;
      min-height: 20px;
      min-width: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
    `,
    finished: css`
      background-color: ${theme.colors.secondary.main};
    `,
    inProgress: css`
      border: 1px solid ${theme.colors.info.main};
      color: ${theme.colors.info.main};
    `,
    notStarted: css`
      background-color: ${theme.colors.info.main};
    `,
    holiday: css`
      background-color: ${theme.colors.success.main};
    `,
    blocked: css`
      background-color: ${theme.colors.secondary.main};
    `,
    offDay: css`
      background-color: ${theme.colors.secondary.main};
    `,
  };
};

export const Day: React.FC<Props> = ({ status, dayOfWeek, date, events }) => {
  const styles = useStyles2(getStyles);

  const statusClassMap: { [key: string]: string } = {
    FINISHED: styles.finished,
    IN_PROGRESS: styles.inProgress,
    NOT_STARTED: styles.notStarted,
    HOLIDAY: styles.holiday,
    BLOCKED: styles.blocked,
    OFF_DAY: styles.offDay,
  };

  const statusClass = statusClassMap[status] || '';
  return (
    <div className={cx(styles.container, statusClass)}>
      <div>{formatDateWithDay(date, dayOfWeek)}</div>
      <div className={styles.events}>
        {events?.map(({ icon, ...rest }) => (
          <div key={rest.name}>
            <Tooltip content={<InfoLine {...rest} />}>
              <div>
                <InfoLine icon={icon} />
              </div>
            </Tooltip>
          </div>
        ))}
      </div>
    </div>
  );
};
