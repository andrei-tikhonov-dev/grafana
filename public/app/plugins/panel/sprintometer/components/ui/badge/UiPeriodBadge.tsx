import { css, cx } from '@emotion/css';
import * as React from 'react';

import { theme3 } from '../../../theme/theme';
import { Badge, BadgeProps } from '../../shadcn/badge';

interface PlannedForBadgeProps extends BadgeProps {
  children: React.ReactNode;
  label?: string;
  className?: string;
}

const badgeStyles = css`
  border: 1px solid ${theme3.shadcn.border};
  background-color: ${theme3.tailwind.colorWhite};
  display: flex;
  align-items: center;
  gap: calc(${theme3.tailwind.spacing} * 1);
`;

export function UiPeriodBadge({ size = 'xs', variant = 'secondary', children, className }: PlannedForBadgeProps) {
  return (
    <Badge size={size} variant={variant} className={cx(badgeStyles, className)}>
      {children}
    </Badge>
  );
}
