import { css } from '@emotion/css';
import { CalendarArrowUp } from 'lucide-react';
import * as React from 'react';

import { Badge, BadgeProps } from '../../../components/shadcn/badge';
import { theme3 } from '../../../theme/theme';

interface PlannedForBadgeProps extends BadgeProps {
  plannedFor: string;
  showIcon?: boolean;
  showLabel?: boolean;
  className?: string;
}

const plannedForStyles = css`
  border: 1px solid ${theme3.shadcn.border};
  background-color: ${theme3.tailwind.colorWhite};
  display: flex;
  align-items: center;
  gap: calc(${theme3.tailwind.spacing} * 1);
`;

export function PlannedForBadge({
  plannedFor,
  showIcon = true,
  showLabel = true,
  size = 'xs',
  variant = 'secondary',
  className,
}: PlannedForBadgeProps) {
  return (
    <Badge size={size} variant={variant} className={`${plannedForStyles} ${className || ''}`}>
      {showIcon && <CalendarArrowUp size={12} />}
      {showLabel ? `Planned for: ${plannedFor}` : plannedFor}
    </Badge>
  );
}
