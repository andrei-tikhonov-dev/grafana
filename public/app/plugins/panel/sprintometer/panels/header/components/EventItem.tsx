import React from 'react';

import { UiHorizontalGroup, UiTypography, UiVerticalGroup, UiAvatarGroup } from '../../../components/ui';
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
    <UiHorizontalGroup align="start" justify="space-between" gap="sm" style={{ width: '100%' }}>
      <UiVerticalGroup align="start" gap="xs">
        <UiTypography variant={bodyVariant} as="div" color="default">
          <UiTypography variant={bodyVariant} as="span" color="light">
            {periodText}
          </UiTypography>
          &nbsp;&nbsp;
          {event.description}
        </UiTypography>
      </UiVerticalGroup>
      {event.members && event.members.length > 0 && (
        <UiAvatarGroup maxVisible={3} users={event.members} size={size === 'sm' ? 'sm' : 'md'} />
      )}
    </UiHorizontalGroup>
  );
};
