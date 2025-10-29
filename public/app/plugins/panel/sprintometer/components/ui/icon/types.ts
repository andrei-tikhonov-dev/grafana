import React from 'react';

import { icons } from './UiIcon';

type IconSize = 'sm' | 'md' | 'lg';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  className?: string;
  size?: IconSize;
}

export interface JiraTypeIconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  size?: IconSize;
}

export type IconName = keyof typeof icons;
