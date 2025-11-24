import { css } from '@emotion/css';
import React from 'react';

import { EEventType } from '../types';

export interface EventTypeIndicatorProps {
  type: EEventType;
}

export const eventColors: Record<EEventType, string> = {
  [EEventType.Important]: '#AB1C17',
  [EEventType.Absence]: '#FCB32A',
  [EEventType.Event]: '#0499D8',
};

const indicatorDotStyles = css`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
`;

/**
 * EventTypeIndicator component.
 * Displays a colored dot indicating the event type.
 */
export const EventTypeIndicator: React.FC<EventTypeIndicatorProps> = ({ type }) => {
  return <div className={indicatorDotStyles} style={{ backgroundColor: eventColors[type] }} />;
};
