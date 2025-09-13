import { css, cx } from '@emotion/css';
import * as React from 'react';

import { theme3 } from '../../../theme/theme';

interface UiFiltersContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  suffix?: React.ReactNode;
}

export function UiFiltersContainer({ children, suffix, className, ...props }: UiFiltersContainerProps) {
  const containerStyles = css`
    display: flex;
    align-items: center;
    gap: calc(${theme3.tailwind.spacing} * 8);
    padding: calc(${theme3.tailwind.spacing} * 8) calc(${theme3.tailwind.spacing} * 8)
      calc(${theme3.tailwind.spacing} * 4) 0;
  `;

  const suffixStyles = css`
    margin-left: auto;
  `;

  return (
    <div className={cx(containerStyles, className)} {...props}>
      {children}
      {suffix && <div className={suffixStyles}>{suffix}</div>}
    </div>
  );
}
