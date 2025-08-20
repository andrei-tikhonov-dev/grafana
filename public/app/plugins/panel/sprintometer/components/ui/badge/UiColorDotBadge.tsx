import { css, cx } from '@emotion/css';
import * as React from 'react';

import { theme3 } from '../../../theme/theme';
import { Badge, BadgeSize } from '../../shadcn/badge';

const colorDotStyles = {
  xs: css`
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    flex-shrink: 0;
  `,
  sm: css`
    width: 0.625rem;
    height: 0.625rem;
    border-radius: 50%;
    flex-shrink: 0;
  `,
  default: css`
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 50%;
    flex-shrink: 0;
  `,
  lg: css`
    width: 0.875rem;
    height: 0.875rem;
    border-radius: 50%;
    flex-shrink: 0;
  `,
};

const iconSizeStyles = {
  xs: css`
    width: 0.75rem;
    height: 0.75rem;
    flex-shrink: 0;
  `,
  sm: css`
    width: 0.875rem;
    height: 0.875rem;
    flex-shrink: 0;
  `,
  default: css`
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
  `,
  lg: css`
    width: 1.125rem;
    height: 1.125rem;
    flex-shrink: 0;
  `,
};

interface UiColorDotBadgeProps extends Omit<React.ComponentProps<typeof Badge>, 'variant'> {
  color: string;
  icon?: React.ReactNode;
  size?: BadgeSize;
}

export function UiColorDotBadge({ color, icon, children, className, size = 'xs', ...props }: UiColorDotBadgeProps) {
  const customBadgeStyles = css`
    background-color: color-mix(in srgb, ${color} 20%, white 80%);
    border-color: ${color};
    color: ${theme3.shadcn.secondaryForeground};
  `;

  const dotColorStyles = css`
    background-color: ${color};
  `;

  const iconColorStyles = css`
    color: ${color};
    fill: ${color};
  `;

  return (
    <Badge className={cx(customBadgeStyles, className)} size={size} {...props}>
      {icon ? (
        <span className={cx(iconSizeStyles[size], iconColorStyles)}>{icon}</span>
      ) : (
        <span className={cx(colorDotStyles[size], dotColorStyles)} />
      )}
      {children}
    </Badge>
  );
}
