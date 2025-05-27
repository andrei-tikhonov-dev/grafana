import React from 'react';

import { theme } from '../../../../theme';
import { UiIcon } from '../../icon/UiIcon';

import { CellProps } from './types';

export const HasChangesCell: React.FC<CellProps> = ({ value }) => {
  if (value !== true) {
    return null;
  }

  return (
    <span style={{ color: theme.colors.semantic.warning }}>
      <UiIcon name="Warning" size="md" />
    </span>
  );
};
