import { css } from '@emotion/css';
import React from 'react';

import { theme2 } from '../../../theme/theme';

export interface PanelTitleProps {
  children?: React.ReactNode;
}

const styles = {
  title: css`
    font-size: ${theme2.typography.fontSize['3xl']};
    font-weight: ${theme2.typography.fontWeight.medium};
  `,
};

export const UiPanelTitle: React.FC<PanelTitleProps> = ({ children }) => {
  return <div className={styles.title}>{children}</div>;
};
