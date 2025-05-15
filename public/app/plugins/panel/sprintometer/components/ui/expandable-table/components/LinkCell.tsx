import React from 'react';

import { Ellipsis } from '../../ellipsis/Ellipsis';
import { Link } from '../../link/Link';

import { CellProps } from './types';

export const LinkCell: React.FC<CellProps> = ({ value }) => {
  return (
    <Link url={value.url}>
      <Ellipsis>{value.text}</Ellipsis>
    </Link>
  );
};
