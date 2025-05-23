import React from 'react';

import { theme } from '../../../../theme';
import { Icon } from '../../icon/Icon';

import { CellProps } from './types';

export const HasChangesCell: React.FC<CellProps> = ({ value }) => {
  if (value !== true) {
    return null;
  }

  return (
    <span style={{ color: theme.colors.semantic.warning }}>
      <Icon name="Warning" size="md" />
    </span>
  );
};
