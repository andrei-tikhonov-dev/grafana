import { css, cx } from '@emotion/css';
import React from 'react';

import { useStyles2 } from '@grafana/ui';

import { WeekStatus } from '../types';

import { Day } from './Day';

interface Props {
  weeks: WeekStatus[];
}

const getStyles = () => ({
  day: css`
    width: 85px;
    height: 32px;
    display: flex;
  `,
  week: css`
    display: flex;
    gap: 4px;
  `,
  wrapper: css`
    display: flex;
    gap: 24px;
    padding-bottom: 10px;
    overflow: auto;
  `,
});

export const SprintTimeline: React.FC<Props> = ({ weeks }) => {
  const styles = useStyles2(getStyles);

  return (
    <div className={cx(styles.wrapper, css``)}>
      {weeks.map((week, weekIndex) => (
        <div key={weekIndex} className={styles.week}>
          {week.days.map((day, dayIndex) => (
            <Day key={dayIndex} status={day.status} dayOfWeek={day.dayOfWeek} />
          ))}
        </div>
      ))}
    </div>
  );
};
