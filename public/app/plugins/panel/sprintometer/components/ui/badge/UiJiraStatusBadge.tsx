import * as React from 'react';

import { EJiraStatus, TJiraStatus } from '../../../types';
import { findInEnum } from '../../../utils/enums';
import { isObject } from '../../../utils/object';
import { BadgeSize } from '../../shadcn/badge';

import { UiColorBadge } from './UiColorBadge';

interface UiJiraStatusBadgeProps extends Omit<React.ComponentProps<typeof UiColorBadge>, 'color' | 'children'> {
  status: TJiraStatus;
  size?: BadgeSize;
}

const STATUS_COLORS = {
  [EJiraStatus.ToDo]: '#7D797B',
  [EJiraStatus.InProgress]: '#0277B9',
  [EJiraStatus.Done]: '#2DA222',
};

export function UiJiraStatusBadge({ status, size = 'xs', ...props }: UiJiraStatusBadgeProps) {
  const statusType = isObject(status) ? status.type : (status as EJiraStatus);
  const statusName = isObject(status) ? status.name : status;
  const normalizedStatus = findInEnum(EJiraStatus, statusType, EJiraStatus.ToDo);
  const color = STATUS_COLORS[normalizedStatus];

  return (
    <UiColorBadge color={color} size={size} {...props}>
      {statusName}
    </UiColorBadge>
  );
}
