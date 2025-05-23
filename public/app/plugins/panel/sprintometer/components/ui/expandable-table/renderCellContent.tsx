import React from 'react';

import { Ellipsis, HasChangesCell, JiraChangesHostoryCell, JiraTypeIconCell, LinkCell } from '../../../components/ui';
import { ColumnType } from '../../../types';
import { formatRelativeDate } from '../../../utils/dateTime';

export const renders = {
  [ColumnType.Link]: (value: any) => <LinkCell value={value} />,
  [ColumnType.HasChanges]: (value: any) => <HasChangesCell value={value} />,
  [ColumnType.IssueTypeIcon]: (value: any) => <JiraTypeIconCell value={value} />,
  [ColumnType.IssueStatus]: (value: any) => <JiraChangesHostoryCell value={value} />,
  [ColumnType.Sprint]: (value: any) => <JiraChangesHostoryCell value={value} />,

  [ColumnType.User]: (value: any) => <Ellipsis>{value.name}</Ellipsis>,
  [ColumnType.Priority]: (value: any) => <Ellipsis>{value}</Ellipsis>,
  [ColumnType.Date]: (value: any) => <Ellipsis>{formatRelativeDate(value)}</Ellipsis>,
  [ColumnType.Default]: (value: any) => <Ellipsis>{value}</Ellipsis>,
};

export const renderCellContent = ({ value, type }: { value: any; data: any; type: string }) => {
  if (value === undefined || value === null) {
    return <span>&nbsp;</span>;
  }

  const renderer = renders[type as keyof typeof renders] || renders[ColumnType.Default];
  return renderer(value);
};
