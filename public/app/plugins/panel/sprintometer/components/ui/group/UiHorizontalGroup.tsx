import { css, cx } from '@emotion/css';
import * as React from 'react';

import { theme3 } from '../../../theme';

type AlignItems = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
type JustifyContent = 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly';
type Gap = 'none' | 'xs' | 'sm' | 'md' | 'lg';

const gapValues: Record<Gap, string> = {
  none: '0',
  xs: theme3.tailwind.spacing,
  sm: theme3.tailwind.spacing2,
  md: theme3.tailwind.spacing4,
  lg: theme3.tailwind.spacing8,
};
interface UiHorizontalGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: AlignItems;
  justify?: JustifyContent;
  gap?: Gap;
}

function UiHorizontalGroup({
  className,
  align = 'center',
  justify = 'center',
  gap = 'md',
  ...props
}: UiHorizontalGroupProps) {
  const groupStyles = css`
    display: flex;
    justify-content: ${justify};
    align-items: ${align};
    gap: ${gapValues[gap]};
  `;

  return <div className={cx(groupStyles, className)} {...props} />;
}

export { UiHorizontalGroup };
export type { UiHorizontalGroupProps };
