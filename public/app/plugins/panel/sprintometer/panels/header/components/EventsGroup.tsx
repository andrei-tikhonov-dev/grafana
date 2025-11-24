import { css, cx } from '@emotion/css';
import { AlertCircle, Calendar, Clock, LucideIcon, Users, UserX } from 'lucide-react';
import React from 'react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../../components/shadcn/accordion';
import { UiHorizontalGroup, UiTypography, UiVerticalGroup } from '../../../components/ui';
import { roundedBordersStyles, theme3 } from '../../../theme';
import { EAdditionalEventType, EEventGroupType, EEventType, MEventGroup } from '../types';

import { EventItem } from './EventItem';

interface EventGroupConfig {
  icon: LucideIcon;
  color: string;
}

const eventGroupConfigs: Record<EEventGroupType, EventGroupConfig> = {
  [EEventType.Important]: {
    icon: AlertCircle,
    color: '#AB1C17',
  },
  [EEventType.Absence]: {
    icon: UserX,
    color: '#FCB32A',
  },
  [EEventType.Event]: {
    icon: Calendar,
    color: '#0499D8',
  },
  [EAdditionalEventType.Role]: {
    icon: Users,
    color: '#6634FA',
  },
  [EAdditionalEventType.Tomorrow]: {
    icon: Clock,
    color: '#EF522E',
  },
};

export function getEventGroupIcon(type: EEventGroupType): LucideIcon {
  return eventGroupConfigs[type].icon;
}

export function getEventGroupColor(type: EEventGroupType): string {
  return eventGroupConfigs[type].color;
}

interface EventsListProps {
  title: string;
  events: MEventGroup[];
  className?: string;
}

const containerStyles = css`
  flex: 1;
  min-width: 0;
`;

const accordionTriggerStyles = css`
  background-color: ${theme3.tailwind.colorWhite};
  padding: ${theme3.tailwind.spacing4};
  ${roundedBordersStyles}
`;

const accordionContentStyles = css`
  background-color: ${theme3.tailwind.colorWhite};
  padding: ${theme3.tailwind.spacing4};
  margin-bottom: ${theme3.tailwind.spacing8};
  ${roundedBordersStyles}
`;

const accordionItemStyles = css`
  border: none;
`;

const iconStyles = css`
  flex-shrink: 0;
  width: 1.25rem;
  height: 1.25rem;
`;

/**
 * EventsGroup component.
 * Displays a group of events in an accordion.
 */
export const EventsGroup: React.FC<EventsListProps> = ({ title, events, className }) => {
  return (
    <UiVerticalGroup align="stretch" gap="md" className={cx(containerStyles, className)}>
      <UiTypography variant="h3" color="default">
        {title}
      </UiTypography>

      <Accordion type="multiple">
        {events.map((eventGroup, index) => {
          const Icon = getEventGroupIcon(eventGroup.type);
          const iconColor = getEventGroupColor(eventGroup.type);

          return (
            <AccordionItem key={`${eventGroup.type}-${index}`} value={`item-${index}`} className={accordionItemStyles}>
              <AccordionTrigger className={accordionTriggerStyles}>
                <UiHorizontalGroup align="center" gap="sm" justify="start">
                  <Icon className={iconStyles} style={{ color: iconColor }} aria-hidden="true" />
                  <UiTypography variant="bodyBold" as="div" color="light">
                    {eventGroup.summary}
                  </UiTypography>
                </UiHorizontalGroup>
              </AccordionTrigger>
              <AccordionContent className={accordionContentStyles}>
                <UiVerticalGroup align="stretch" gap="sm">
                  {eventGroup.events.map((event, eventIndex) => (
                    <EventItem key={eventIndex} event={event} />
                  ))}
                </UiVerticalGroup>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </UiVerticalGroup>
  );
};
