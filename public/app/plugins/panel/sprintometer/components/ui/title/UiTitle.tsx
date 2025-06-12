import { css, cx } from '@emotion/css';
import React from 'react';

import { theme } from '../../../theme';

export interface TitleProps extends React.ComponentProps<'div'> {}

const styles = {
  title: css`
    font-size: ${theme.typography.h4.fontSize};
    font-weight: ${theme.typography.h4.fontWeight};
  `,
};

export const UiTitle: React.FC<TitleProps> = ({ children, className }) => {
  return <div className={cx(styles.title, className)}>{children}</div>;
};
