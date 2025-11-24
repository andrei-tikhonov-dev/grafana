import React from 'react';
import { css } from '@emotion/css';

import { UiHorizontalGroup, UiTypography, UiVerticalGroup } from '../../../components/ui';
import { theme3 } from '../../../theme';
import { formatFullDate } from '../../../utils/dateTime';
import { EEventType, eventTypePriority, MEvent } from '../types';
import { EventItem } from './EventItem';
import { EventTypeIndicator } from './EventTypeIndicator';

interface EventsHoverContentProps {
  date: string;
  groupedEvents: Record<EEventType, MEvent[]>;
}

const eventTypeLabels: Record<EEventType, string> = {
  [EEventType.Important]: 'Important events',
  [EEventType.Absence]: 'Absences',
  [EEventType.Event]: 'Events',
};

const scrollArea = css`
  max-height: ${theme3.tailwind.container3xs};
  padding-right: ${theme3.tailwind.spacing2};
  overflow-y: auto;
`;

/**
 * TimelineDayEvents component.
 * Displays events for a specific day in the timeline hover card.
 */
export const TimelineDayEvents: React.FC<EventsHoverContentProps> = ({ date, groupedEvents }) => {
  return (
    <UiVerticalGroup gap="md" align="start" className={scrollArea}>
      <UiTypography variant="h5" as="div">
        {formatFullDate(date)}
      </UiTypography>
      {eventTypePriority.map((type) => {
        const events = groupedEvents[type];

        if (!events || events.length === 0) {
          return null;
        }

        return (
          <UiVerticalGroup key={type} align="start" gap="xs">
            <UiHorizontalGroup gap="sm" align="center" justify="start">
              <EventTypeIndicator type={type} />
              <UiTypography as="span" variant="bodyBold">
                {eventTypeLabels[type]}
              </UiTypography>
            </UiHorizontalGroup>

            <UiVerticalGroup gap="xs" align="start">
              {events.map((event, index) => (
                <EventItem event={event} key={index} size="sm" />
              ))}
            </UiVerticalGroup>
          </UiVerticalGroup>
        );
      })}
    </UiVerticalGroup>
  );
};
