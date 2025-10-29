import { css, cx } from '@emotion/css';
import React from 'react';

import { theme3, roundedBordersStyles } from '../../../theme';

export interface CardProps extends React.ComponentProps<'div'> {}

const styles = {
  container: css`
    background-color: ${theme3.custom.colorCard};
    padding: ${theme3.tailwind.spacing4};
    ${roundedBordersStyles}
  `,
};

export const UiCard: React.FC<CardProps> = ({ children, className }) => {
  return <div className={cx(styles.container, className)}>{children}</div>;
};
