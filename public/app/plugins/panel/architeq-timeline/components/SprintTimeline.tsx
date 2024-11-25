import { css } from '@emotion/css';
import React from 'react';

import { useStyles2 } from '@grafana/ui';

import { WeekStatus } from '../types';

import { Day } from './Day';

interface Props {
  weeks: WeekStatus[];
}

const getStyles = () => ({
  days: css`
    display: flex;
    gap: 10px;
  `,
  wrapper: css`
    display: flex;
    gap: 60px;
    padding-bottom: 10px;
    overflow: auto;
  `,
});

export const SprintTimeline: React.FC<Props> = ({ weeks }) => {
  const styles = useStyles2(getStyles);

  return (
    <div className={styles.wrapper}>
      {weeks.map((week, weekIndex) => (
        <div key={weekIndex} className={styles.days}>
          {week.days.map((day, dayIndex) => (
            <Day key={dayIndex} {...day} />
          ))}
        </div>
      ))}
    </div>
  );
};
