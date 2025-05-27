import React from 'react';

import { UiEllipsis } from '../../ellipsis/UiEllipsis';
import { UiLink } from '../../link/UiLink';

import { CellProps } from './types';

export const LinkCell: React.FC<CellProps> = ({ value }) => {
  return (
    <UiLink url={value.url}>
      <UiEllipsis>{value.text}</UiEllipsis>
    </UiLink>
  );
};
