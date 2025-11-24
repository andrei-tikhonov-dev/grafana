import React from 'react';

import { UiTypography, UiVerticalGroup } from '../../../components/ui';
import { formatSmartPeriod } from '../../../utils/dateTime';
import { MEvent } from '../types';

interface EventItemProps {
  event: MEvent;
  size?: 'sm' | 'md';
}

/**
 * EventItem component.
 * Displays an event with its period and description.
 */
export const EventItem: React.FC<EventItemProps> = ({ event, size = 'md' }) => {
  const periodText = formatSmartPeriod(event.period);
  const bodyVariant = size === 'sm' ? 'bodySmall' : 'body';

  return (
    <UiVerticalGroup align="start" gap="xs">
      <UiTypography variant={bodyVariant} as="div" color="default">
        <UiTypography variant={bodyVariant} as="span" color="light">
          {periodText}
        </UiTypography>
        &nbsp;&nbsp;
        {event.description}
      </UiTypography>
    </UiVerticalGroup>
  );
};
