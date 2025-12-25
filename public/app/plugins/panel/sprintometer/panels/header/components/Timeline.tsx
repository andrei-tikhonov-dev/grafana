import { css, cx } from '@emotion/css';
import React from 'react';

import { ScrollArea, ScrollBar } from '../../../components/shadcn/scroll-area';
import { UiHorizontalGroup } from '../../../components/ui';
import { MDay } from '../types';

import { TimelineWeek } from './TimelineWeek';

interface TimelineProps {
  days: MDay[][];
  width?: number;
  className?: string;
}

const timelineContainerStyles = css`
  overflow-x: auto;
`;

/**
 * Timeline component.
 * Displays a timeline of events grouped by weeks.
 */
export const Timeline: React.FC<TimelineProps> = ({ days, className, width }) => {
  return (
    <ScrollArea style={{ width: width }}>
      <UiHorizontalGroup justify="start" gap="lg" className={cx(timelineContainerStyles, className)}>
        {days.map((currentDays, index) => (
          <TimelineWeek key={`week-${index}`} days={currentDays} />
        ))}
      </UiHorizontalGroup>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};
