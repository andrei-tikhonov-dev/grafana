import { css, cx } from '@emotion/css';
import * as React from 'react';

import { theme3 } from '../../../theme/theme';
import { Badge, BadgeSize } from '../../shadcn/badge';

interface UiColorBadgeProps extends Omit<React.ComponentProps<typeof Badge>, 'variant'> {
  color?: string;
  icon?: React.ReactNode;
  size?: BadgeSize;
}

export function UiColorBadge({
  color = theme3.custom.colorPrimary,
  icon,
  children,
  className,
  size = 'xs',
  ...props
}: UiColorBadgeProps) {
  const customBadgeStyles = css`
    background-color: color-mix(in srgb, ${color} 20%, white 80%);
    border-color: ${color};
  `;

  const badgeStyles = css`
    background-color: ${color};
    color: ${theme3.tailwind.colorWhite};
  `;

  return (
    <Badge className={cx(customBadgeStyles, badgeStyles, className)} size={size} {...props}>
      {children}
    </Badge>
  );
}
