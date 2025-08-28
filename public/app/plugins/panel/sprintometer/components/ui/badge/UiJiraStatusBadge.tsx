import * as React from 'react';

import { EJiraStatus } from '../../../types';
import { findInEnum } from '../../../utils/enums';
import { BadgeSize } from '../../shadcn/badge';

import { UiColorBadge } from './UiColorBadge';

interface UiJiraStatusBadgeProps extends Omit<React.ComponentProps<typeof UiColorBadge>, 'color' | 'children'> {
  status: EJiraStatus | string;
  size?: BadgeSize;
}

const STATUS_CONFIG = {
  [EJiraStatus.ToDo]: {
    color: '#7D797B',
    label: 'To Do',
  },
  [EJiraStatus.InProgress]: {
    color: '#0277B9',
    label: 'In Progress',
  },
  [EJiraStatus.InReview]: {
    color: '#0277B9',
    label: 'In Review',
  },
  [EJiraStatus.InTesting]: {
    color: '#0277B9',
    label: 'In Testing',
  },
  [EJiraStatus.Blocked]: {
    color: '#D43758',
    label: 'Blocked',
  },
  [EJiraStatus.ReadyForDeployment]: {
    color: '#7D797B',
    label: 'Ready for Deployment',
  },
  [EJiraStatus.Done]: {
    color: '#2DA222',
    label: 'Done',
  },
  [EJiraStatus.Cancelled]: {
    color: '#7D797B',
    label: 'Cancelled',
  },
  [EJiraStatus.Unknown]: {
    color: '#7D797B',
    label: 'Unknown',
  },
};

export function UiJiraStatusBadge({ status, size = 'xs', ...props }: UiJiraStatusBadgeProps) {
  const normalizedStatus = findInEnum(EJiraStatus, status, EJiraStatus.Unknown);
  const config = STATUS_CONFIG[normalizedStatus];

  const color = config?.color;

  return (
    <UiColorBadge color={color} size={size} {...props}>
      {status}
    </UiColorBadge>
  );
}
