import { css } from '@emotion/css';
import React from 'react';

import { theme } from '../../../theme';

export interface TextProps {
  children?: React.ReactNode;
}

const styles = {
  title: css`
    font-size: ${theme.typography.body.fontSize};
    font-weight: ${theme.typography.body.fontWeight};
  `,
};

export const UiText: React.FC<TextProps> = ({ children }) => {
  return <div className={styles.title}>{children}</div>;
};
