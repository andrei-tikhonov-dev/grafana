import React from 'react';

import { JiraIssueType } from '../../../../types';
import { JiraTypeIcon } from '../../icon/JiraTypeIcon';
import { Tooltip } from '../../tooltip/Tooltip';

import { CellProps } from './types';

export interface JiraTypeIconCellProps extends CellProps {
  value: JiraIssueType['type'] | JiraIssueType;
}

export const JiraTypeIconCell: React.FC<JiraTypeIconCellProps> = ({ value }) => {
  const content = typeof value === 'string' ? value : value.name;
  const name = typeof value === 'string' ? value : value.type;

  return (
    <Tooltip content={content}>
      <span>
        <JiraTypeIcon name={name} />
      </span>
    </Tooltip>
  );
};
