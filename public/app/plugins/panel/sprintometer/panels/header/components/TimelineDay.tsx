import { css, cx } from '@emotion/css';
import React from 'react';

import { HoverCard, HoverCardContent, HoverCardTrigger } from '../../../components/shadcn/hover-card';
import { UiTypography, UiVerticalGroup } from '../../../components/ui';
import { theme3 } from '../../../theme';
import { formatDateParts } from '../../../utils/dateTime';
import { EDayState, EEventType, eventTypePriority, MDay, MEvent } from '../types';

import { EventTypeIndicator } from './EventTypeIndicator';
import { TimelineDayEvents } from './TimelineDayEvents';

interface TimelineDayCellProps extends MDay {}

const cellStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 60px;
  height: 125px;
  border: 1px solid #ede8e8;
  padding: ${theme3.tailwind.spacing2} ${theme3.tailwind.spacing};
  cursor: default;
  box-sizing: border-box;
`;

const currentStateStyles = css`
  background-color: #ef532f;
  color: #ffffff;
`;

const defaultStateStyles = css`
  background-color: #ffffff;
  color: #7a7a7d;
`;

const inactiveStateStyles = css`
  background-color: #e4e0e0;
  color: #969496;
`;

const indicatorsContainerStyles = css`
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: center;
  min-height: 12px;
`;

/**
 * TimelineDay component.
 * Displays a single day in the timeline.
 */
export const TimelineDay: React.FC<TimelineDayCellProps> = ({ date, events, state }) => {
  const stateStylesMap: Record<EDayState, string> = {
    [EDayState.Current]: currentStateStyles,
    [EDayState.Default]: defaultStateStyles,
    [EDayState.Inactive]: inactiveStateStyles,
  };
  const { day, month, weekday } = formatDateParts(date);

  const eventTypes = [...new Set(events.map((e) => e.type))];
  const orderedEventTypes = eventTypePriority.filter((type) => eventTypes.includes(type));

  const groupedEvents = orderedEventTypes.reduce(
    (acc, type) => {
      acc[type] = events.filter((e) => e.type === type);
      return acc;
    },
    {} as Record<EEventType, MEvent[]>
  );

  const hasEvents = events.length > 0;

  const cellContent = (
    <div className={cx(cellStyles, stateStylesMap[state])}>
      <UiTypography variant="bodySmall" color="inherit">
        {weekday}
      </UiTypography>

      <div className={indicatorsContainerStyles}>
        {orderedEventTypes.map((type) => (
          <EventTypeIndicator key={type} type={type} />
        ))}
      </div>

      <UiVerticalGroup gap="xs" align="center">
        <UiTypography variant="h5Bold" color="inherit">
          {day}
        </UiTypography>
        <UiTypography variant="bodySmall" color="inherit">
          {month}
        </UiTypography>
      </UiVerticalGroup>
    </div>
  );

  if (!hasEvents) {
    return cellContent;
  }

  return (
    <HoverCard>
      <HoverCardTrigger asChild>{cellContent}</HoverCardTrigger>
      <HoverCardContent align="center">
        <TimelineDayEvents date={date} groupedEvents={groupedEvents} />
      </HoverCardContent>
    </HoverCard>
  );
};
