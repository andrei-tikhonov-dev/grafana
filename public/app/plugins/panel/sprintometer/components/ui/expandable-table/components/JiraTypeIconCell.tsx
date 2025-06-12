import React from 'react';

import { JiraIssueTypeData } from '../../../../types';
import { UiJiraTypeIcon } from '../../icon/UiJiraTypeIcon';
import { UiTooltip } from '../../tooltip/UiTooltip';

import { CellProps } from './types';

export interface JiraTypeIconCellProps extends CellProps {
  value: JiraIssueTypeData['type'] | JiraIssueTypeData;
}

export const JiraTypeIconCell: React.FC<JiraTypeIconCellProps> = ({ value }) => {
  const content = typeof value === 'string' ? value : value.name;
  const name = typeof value === 'string' ? value : value.type;

  return (
    <UiTooltip content={content}>
      <span>
        <UiJiraTypeIcon name={name} />
      </span>
    </UiTooltip>
  );
};
