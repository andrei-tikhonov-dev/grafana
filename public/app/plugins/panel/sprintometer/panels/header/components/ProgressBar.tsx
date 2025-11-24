import React from 'react';
import { css, cx } from '@emotion/css';

import { theme3 } from '../../../theme';

const baseProgressBarStyles = css`
  display: flex;
  width: 100%;
  overflow: hidden;
  border-radius: ${theme3.tailwind.radiusMd};
  background-color: transparent;
  position: relative;
`;

const sizeStyles = {
  xs: css`
    height: 0.25rem;
    border-radius: ${theme3.tailwind.radiusSm};
  `,
  sm: css`
    height: 0.5rem;
    border-radius: ${theme3.tailwind.radiusSm};
  `,
  default: css`
    height: 0.75rem;
    border-radius: ${theme3.tailwind.radiusMd};
  `,
  lg: css`
    height: 1rem;
    border-radius: ${theme3.tailwind.radiusMd};
  `,
};

const segmentStyles = css`
  transition: width 0.3s ease-in-out, background-color 0.3s ease-in-out;
  height: 100%;
`;

const completedSegmentStyles = css`
  background-color: ${theme3.custom.colorStatusDefaultBorder};
`;

const remainingSegmentStyles = {
  green: css`
    background-color: ${theme3.custom.colorStatusOnTrackBorder};
  `,
  yellow: css`
    background-color: ${theme3.custom.colorStatusNeedsAttentionBorder};
  `,
  red: css`
    background-color: ${theme3.custom.colorStatusHighRiskBorder};
  `,
};

export type ProgressBarSize = keyof typeof sizeStyles;
export type RemainingColor = keyof typeof remainingSegmentStyles;

export interface ProgressBarProps extends Omit<React.ComponentProps<'div'>, 'children'> {
  value: number;
  size?: ProgressBarSize;
  thresholds?: {
    red: number;
    yellow: number;
  };
}

function getColorForRemaining(remaining: number, thresholds = { red: 85, yellow: 70 }): RemainingColor {
  if (remaining >= thresholds.red) {
    return 'red';
  }
  if (remaining >= thresholds.yellow) {
    return 'yellow';
  }
  return 'green';
}

/**
 * ProgressBar component.
 * Displays a progress bar with color-coded segments based on thresholds.
 */
export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  size = 'default',
  thresholds,
  className,
  ...props
}) => {
  const clampedValue = Math.min(100, Math.max(0, value));
  const remaining = 100 - clampedValue;
  const color = getColorForRemaining(clampedValue, thresholds);

  return (
    <div
      role="progressbar"
      aria-valuenow={clampedValue}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Прогресс: ${clampedValue}%`}
      data-slot="progress-bar"
      className={cx(baseProgressBarStyles, sizeStyles[size], className)}
      {...props}
    >
      {clampedValue > 0 && (
        <div
          className={cx(segmentStyles, completedSegmentStyles)}
          style={{ width: `${clampedValue}%` }}
          aria-hidden="true"
        />
      )}
      {remaining > 0 && (
        <div
          className={cx(segmentStyles, remainingSegmentStyles[color])}
          style={{ width: `${remaining}%` }}
          aria-hidden="true"
        />
      )}
    </div>
  );
};
