import { css, cx } from '@emotion/css';
import React from 'react';

import { panelContainerStyles } from '../../../theme';
import { UiVerticalGroup } from '../group/UiVerticalGroup';
import { UiTypography } from '../typography/UiTypography';

interface UiPanelContainerProps {
  children: React.ReactNode;
  width: number;
  height: number;
  title: string;
}

export const UiPanelContainer: React.FC<UiPanelContainerProps> = ({ title, height, children }) => {
  return (
    <UiVerticalGroup
      align="stretch"
      className={cx(
        panelContainerStyles,
        css`
          height: ${height}px;
          min-width: 998px;
        `
      )}
    >
      <UiTypography variant="panelTitle">{title}</UiTypography>
      {children}
    </UiVerticalGroup>
  );
};
