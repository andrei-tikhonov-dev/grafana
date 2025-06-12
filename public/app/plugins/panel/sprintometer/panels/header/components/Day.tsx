import { css, cx } from '@emotion/css';
import * as React from 'react';

import { theme2 } from '../../../theme/theme';
import { DateType } from '../../../types';
import { formatDay, formatDayOfWeek } from '../../../utils/dateTime';
import { EventInterface, EventTypeEnum } from '../types';

const CIRCLE_OVERLAP_OFFSET = -3;
const MAX_VISIBLE_CIRCLES = 3;

const EVENT_TYPE_TO_CIRCLE_MAPPING = {
  [EventTypeEnum.Event]: 'first',
  [EventTypeEnum.Deadline]: 'second',
  [EventTypeEnum.TimeOff]: 'third',
} as const;

const dayWrapperStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme2.spacing.xs};
`;

const dayOfWeekStyles = css`
  font-size: ${theme2.typography.fontSize.xs};
  font-weight: ${theme2.typography.fontWeight.medium};
  color: ${theme2.colors.text.secondary};
`;

const dayBaseStyles = css`
  border-radius: ${theme2.radii.sm};
  width: 36px;
  height: 46px;
  line-height: ${theme2.typography.lineHeight.tight};
  border: 1px solid;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: ${theme2.typography.fontSize.xs};
  font-weight: ${theme2.typography.fontWeight.regular};
  white-space: nowrap;
  flex-shrink: 0;
  overflow: visible;
  outline: none;
  cursor: pointer;
  position: relative;
`;

const circlesContainerStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: ${theme2.spacing.xs};
  height: 10px;
`;

const circleBaseStyles = css`
  width: ${theme2.spacing.sm};
  height: ${theme2.spacing.sm};
  border-radius: 50%;
  border: 1px solid ${theme2.colors.gray.white};
  flex-shrink: 0;
`;

const circleStyles = {
  first: css`
    background-color: ${theme2.colors.palette.primaryBlue};
    z-index: 3;
  `,
  second: css`
    background-color: ${theme2.colors.brand.secondary};
    margin-left: ${CIRCLE_OVERLAP_OFFSET}px;
    z-index: 2;
  `,
  third: css`
    background-color: ${theme2.colors.palette.amber};
    margin-left: ${CIRCLE_OVERLAP_OFFSET}px;
    z-index: 1;
  `,
} as const;

const dayVariantStyles = {
  default: css`
    border-color: ${theme2.colors.border.default};
    background-color: ${theme2.colors.background.surface};
    color: ${theme2.colors.text.primary};

    &:hover {
      background-color: ${theme2.colors.background.subtle};
    }
  `,
  inactive: css`
    border-color: ${theme2.colors.gray.light};
    background-color: ${theme2.colors.gray.light};
    color: ${theme2.colors.text.secondary};
  `,
  current: css`
    border-color: ${theme2.colors.brand.primary};
    background-color: ${theme2.colors.brand.primary};
    color: ${theme2.colors.text.inverted};

    &:hover {
      background-color: ${theme2.colors.brand.primary};
    }
  `,
} as const;

type DayVariant = keyof typeof dayVariantStyles;
type CircleVariant = keyof typeof circleStyles;

interface DayProps extends React.ComponentProps<'div'> {
  date: DateType;
  events?: EventInterface[];
  variant?: DayVariant;
}

interface CircleGroupProps {
  visibleCircles: CircleVariant[];
}

const getUniqueEventTypes = (events: EventInterface[]): EventTypeEnum[] => {
  const uniqueTypes = new Set(events.map((event) => event.type));
  return Array.from(uniqueTypes) as EventTypeEnum[];
};

const getVisibleCircles = (eventTypes: EventTypeEnum[]): CircleVariant[] => {
  return eventTypes
    .map((type) => EVENT_TYPE_TO_CIRCLE_MAPPING[type])
    .filter(Boolean)
    .slice(0, MAX_VISIBLE_CIRCLES);
};

const Circle: React.FC<{ variant: CircleVariant; isFirst: boolean }> = ({ variant, isFirst }) => {
  const circleStyle = isFirst
    ? circleStyles[variant]
    : css`
        ${circleStyles[variant]};
        margin-left: ${CIRCLE_OVERLAP_OFFSET}px;
      `;

  return <div className={cx(circleBaseStyles, circleStyle)} />;
};

const CircleGroup: React.FC<CircleGroupProps> = ({ visibleCircles }) => {
  if (visibleCircles.length === 0) {
    return null;
  }

  return (
    <div className={circlesContainerStyles}>
      {visibleCircles.map((circleVariant, index) => (
        <Circle key={`${circleVariant}-${index}`} variant={circleVariant} isFirst={index === 0} />
      ))}
    </div>
  );
};

function Day({ className, variant = 'default', date, events = [], ...props }: DayProps) {
  const combinedStyles = cx(dayBaseStyles, dayVariantStyles[variant], className);
  const dayOfWeek = formatDayOfWeek(date);

  const uniqueEventTypes = getUniqueEventTypes(events);
  const visibleCircles = getVisibleCircles(uniqueEventTypes);

  return (
    <div className={dayWrapperStyles}>
      <div className={dayOfWeekStyles}>{dayOfWeek}</div>
      <div className={combinedStyles} {...props}>
        {formatDay(date)}
        <CircleGroup visibleCircles={visibleCircles} />
      </div>
    </div>
  );
}

export { Day };
export type { DayProps, DayVariant };
