import React from 'react';

import { CustomCellRendererProps } from '@grafana/ui';

export const SimpleCell = ({ value }: CustomCellRendererProps) => {
  return <>{String(value)}</>;
};
