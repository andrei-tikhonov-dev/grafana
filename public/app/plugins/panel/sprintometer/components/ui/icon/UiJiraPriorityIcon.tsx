import { AlertTriangle, ArrowUp, ArrowDown, Minus, ChevronUp, ChevronDown, CircleAlert, X } from 'lucide-react';
import React from 'react';

import { EJiraPriority } from '../../../types';
import { findInEnum } from '../../../utils/enums';

export interface JiraPriorityIconProps {
  name: EJiraPriority | string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  style?: React.CSSProperties;
  className?: string;
}

const priorityIcons = {
  [EJiraPriority.Blocker]: X,
  [EJiraPriority.Critical]: CircleAlert,
  [EJiraPriority.Highest]: ArrowUp,
  [EJiraPriority.High]: ChevronUp,
  [EJiraPriority.Major]: AlertTriangle,
  [EJiraPriority.Medium]: Minus,
  [EJiraPriority.Minor]: ChevronDown,
  [EJiraPriority.Low]: ArrowDown,
};

export const priorityColors: Record<EJiraPriority, string> = {
  [EJiraPriority.Blocker]: '#D04437',
  [EJiraPriority.Critical]: '#D04437',
  [EJiraPriority.Highest]: '#F15C75',
  [EJiraPriority.High]: '#F79232',
  [EJiraPriority.Major]: '#F79232',
  [EJiraPriority.Medium]: '#F6C342',
  [EJiraPriority.Minor]: '#14892C',
  [EJiraPriority.Low]: '#4A90A4',
};

export const UiJiraPriorityIcon: React.FC<JiraPriorityIconProps> = ({ name, size = 'sm', style, ...props }) => {
  const normalizedName = findInEnum(EJiraPriority, name, EJiraPriority.Medium);
  const IconComponent = priorityIcons[normalizedName];
  const color = priorityColors[normalizedName];

  const sizeMap = {
    xs: 12,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 28,
  };

  const iconSize = typeof size === 'string' ? sizeMap[size] || 16 : size;

  return <IconComponent size={iconSize} color={color} style={{ ...style }} {...props} />;
};
