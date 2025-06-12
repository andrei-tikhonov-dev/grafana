import { css, cx } from '@emotion/css';
import React from 'react';

import { theme } from '../../../theme';

export interface TextProps extends React.ComponentProps<'div'> {}

const styles = {
  title: css`
    font-size: ${theme.typography.body.fontSize};
    font-weight: ${theme.typography.body.fontWeight};
  `,
};

export const UiText: React.FC<TextProps> = ({ children, className }) => {
  return <div className={cx(styles.title, className)}>{children}</div>;
};
