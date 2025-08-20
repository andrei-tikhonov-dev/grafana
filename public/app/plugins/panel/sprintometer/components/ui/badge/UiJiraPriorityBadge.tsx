import { css, cx } from '@emotion/css';
import React from 'react';

import { theme3 } from '../../../theme/theme';
import { EJiraPriority } from '../../../types';
import { Badge, BadgeProps } from '../../shadcn/badge';
import { UiJiraPriorityIcon } from '../icon/UiJiraPriorityIcon';

const priorityBadgeStyle = css`
  border: 1px solid ${theme3.shadcn.border};
  background-color: ${theme3.tailwind.colorWhite};

  &::after {
    content: '\\00a0';
    width: 0;
    overflow: hidden;
    margin-left: -0.25rem;
  }
`;

export interface UiJiraPriorityBadgeProps extends Omit<BadgeProps, 'children'> {
  priority: EJiraPriority | string;
  showText?: boolean;
  iconSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
}

export const UiJiraPriorityBadge: React.FC<UiJiraPriorityBadgeProps> = ({
  priority,
  showText = false,
  iconSize,
  variant = 'secondary',
  size = 'xs',
  className,
  ...badgeProps
}) => {
  return (
    <Badge variant={variant} size={size} className={cx(!showText && priorityBadgeStyle, className)} {...badgeProps}>
      <UiJiraPriorityIcon name={priority} size={iconSize} />
      {showText && <span>{priority}</span>}
    </Badge>
  );
};
