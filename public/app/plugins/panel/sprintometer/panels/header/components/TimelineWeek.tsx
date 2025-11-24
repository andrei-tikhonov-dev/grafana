import React from 'react';
import { css, cx } from '@emotion/css';

import { MDay } from '../types';
import { TimelineDay } from './TimelineDay';

interface TimelineWeekRowProps {
  days: MDay[];
  className?: string;
}

const weekRowStyles = css`
  display: flex;
  flex-direction: row;
  gap: 0;
`;

/**
 * TimelineWeek component.
 * Displays a row of days for a week in the timeline.
 */
export const TimelineWeek: React.FC<TimelineWeekRowProps> = ({ days, className }) => {
  return (
    <div className={cx(weekRowStyles, className)}>
      {days.map((dayProps, index) => (
        <TimelineDay key={`${dayProps.date}-${index}`} {...dayProps} />
      ))}
    </div>
  );
};
