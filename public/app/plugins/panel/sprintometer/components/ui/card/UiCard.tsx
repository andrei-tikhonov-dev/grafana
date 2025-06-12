import { css, cx } from '@emotion/css';
import React from 'react';

import { theme } from '../../../theme';

export interface CardProps extends React.ComponentProps<'div'> {}

const styles = {
  container: css`
    background-color: ${theme.colors.semantic.background};
    border: 1px solid ${theme.colors.semantic.border};
    padding: 16px;
  `,
};

export const UiCard: React.FC<CardProps> = ({ children, className }) => {
  return <div className={cx(styles.container, className)}>{children}</div>;
};
