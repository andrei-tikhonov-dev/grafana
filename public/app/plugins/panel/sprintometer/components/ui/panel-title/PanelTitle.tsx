import { css } from '@emotion/css';
import React from 'react';

import { theme } from '../../../theme';

export interface PanelTitleProps {
  children?: React.ReactNode;
}

const styles = {
  title: css`
    font-size: ${theme.typography.h3.fontSize};
    font-weight: ${theme.typography.h3.fontWeight};
  `,
};

export const PanelTitle: React.FC<PanelTitleProps> = ({ children }) => {
  return <div className={styles.title}>{children}</div>;
};
