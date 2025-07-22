import { css } from '@emotion/css';
import React from 'react';

import { Label } from '../../../components/shadcn/label';
import { Switch } from '../../../components/shadcn/switch';
import { theme2 } from '../../../theme/theme';

const containerStyles = css`
  display: flex;
  align-items: center;
  gap: ${theme2.spacing.sm};
`;

export function SwitchDemo() {
  return (
    <div className={containerStyles}>
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Switch</Label>
    </div>
  );
}
