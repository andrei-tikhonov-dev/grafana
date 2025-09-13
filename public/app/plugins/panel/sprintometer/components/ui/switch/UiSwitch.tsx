import { css } from '@emotion/css';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import React from 'react';

import { theme3 } from '../../../theme/theme';
import { Label } from '../../shadcn/label';
import { Switch } from '../../shadcn/switch';

const containerStyles = css`
  display: flex;
  align-items: center;
  gap: calc(${theme3.tailwind.spacing} * 2);
`;

interface UiSwitchProps extends React.ComponentProps<typeof SwitchPrimitive.Root> {
  label: string;
}

export function UiSwitch({ id, label, checked, onCheckedChange, ...props }: UiSwitchProps) {
  return (
    <div className={containerStyles}>
      <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} {...props} />
      <Label htmlFor={id}>{label}</Label>
    </div>
  );
}
