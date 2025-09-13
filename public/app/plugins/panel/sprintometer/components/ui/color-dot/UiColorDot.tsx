import { css, cx } from '@emotion/css';
import * as React from 'react';

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

interface ColorDotProps {
  color: string;
  size?: keyof typeof colorDotStyles;
  className?: string;
}

export function UiColorDot({ color, size = 'xs', className }: ColorDotProps) {
  const dotColorStyles = css`
    background-color: ${color};
  `;

  return <span className={cx(colorDotStyles[size], dotColorStyles, className)} />;
}
