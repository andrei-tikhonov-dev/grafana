import React from 'react';

import { UiEllipsis } from '../../ellipsis/UiEllipsis';

import { CellProps } from './types';

export const DefaultCell: React.FC<CellProps> = ({ value }) => {
  return <UiEllipsis>{typeof value === 'object' ? JSON.stringify(value) : value}</UiEllipsis>;
};
