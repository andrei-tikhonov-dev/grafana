import React from 'react';

import { icons } from './Icon';

type IconSize = 'sm' | 'md' | 'lg';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconNameType;
  size?: IconSize;
}

export interface JiraTypeIconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  size?: IconSize;
}

export type IconNameType = keyof typeof icons;
