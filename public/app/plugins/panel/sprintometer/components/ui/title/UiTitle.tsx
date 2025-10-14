import { css, cx } from '@emotion/css';
import React from 'react';

import { theme } from '../../../theme';

export interface TitleProps extends React.ComponentProps<'div'> {}

const titleStyles = css`
  font-size: ${theme.typography.h4.fontSize};
  font-weight: ${theme.typography.h4.fontWeight};
`;

export const UiTitle = React.forwardRef<HTMLDivElement, TitleProps>(({ children, className, ...rest }, ref) => {
  return (
    <div ref={ref} className={cx(titleStyles, className)} {...rest}>
      {children}
    </div>
  );
});

UiTitle.displayName = 'UiTitle';
