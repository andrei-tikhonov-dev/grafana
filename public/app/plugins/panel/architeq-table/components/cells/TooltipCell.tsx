import React from 'react';

import { Tooltip, CustomCellRendererProps } from '@grafana/ui';

export const TooltipCell = ({ value }: CustomCellRendererProps) => {
  const text = Array.isArray(value) ? value.join(', ') : String(value);
  return (
    <Tooltip content={text}>
      <span>{text}</span>
    </Tooltip>
  );
};
