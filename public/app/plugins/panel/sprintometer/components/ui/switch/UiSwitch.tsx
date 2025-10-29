import * as SwitchPrimitive from '@radix-ui/react-switch';
import React from 'react';

import { Label } from '../../shadcn/label';
import { Switch } from '../../shadcn/switch';
import { UiEllipsis } from '../ellipsis/UiEllipsis';
import { UiHorizontalGroup } from '../group/UiHorizontalGroup';

interface UiSwitchProps extends React.ComponentProps<typeof SwitchPrimitive.Root> {
  label: string;
}

export function UiSwitch({ id, label, checked, onCheckedChange, ...props }: UiSwitchProps) {
  return (
    <UiHorizontalGroup gap="sm">
      <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} {...props} />
      <Label htmlFor={id}>
        <UiEllipsis>{label}</UiEllipsis>
      </Label>
    </UiHorizontalGroup>
  );
}
