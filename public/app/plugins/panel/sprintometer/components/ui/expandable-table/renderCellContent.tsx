import React from 'react';

import { ColumnType, User } from '../../../types';
import { formatRelativeDate } from '../../../utils/dateTime';
import { isNullish } from '../../../utils/helpers';

import { DefaultCell } from './components/DefaultCell';
import { HasChangesCell } from './components/HasChangesCell';
import { JiraChangesHistoryCell } from './components/JiraChangesHistoryCell';
import { JiraTypeIconCell } from './components/JiraTypeIconCell';
import { LinkCell } from './components/LinkCell';

interface RenderCellProps {
  value: unknown;
  data: unknown;
  type: string;
}

type CellRenderer = (value: any) => React.ReactNode;

const EMPTY_CELL = <span>&nbsp;</span>;

const renderUserCell = (value: unknown): React.ReactNode => {
  const user = value as User;
  return <DefaultCell value={user?.name} />;
};

const renderDateCell = (value: unknown): React.ReactNode => {
  return <DefaultCell value={formatRelativeDate(value as string)} />;
};

const renderDefaultCell = (value: unknown): React.ReactNode => {
  return <DefaultCell value={value} />;
};

const cellRenderers: Record<ColumnType, CellRenderer> = {
  [ColumnType.Link]: (value) => <LinkCell value={value} />,
  [ColumnType.HasChanges]: (value) => <HasChangesCell value={value} />,
  [ColumnType.IssueTypeIcon]: (value) => <JiraTypeIconCell value={value} />,
  [ColumnType.IssueStatus]: (value) => <JiraChangesHistoryCell value={value} />,
  [ColumnType.Changes]: (value) => <JiraChangesHistoryCell value={value} />,
  [ColumnType.Sprint]: (value) => <JiraChangesHistoryCell value={value} />,
  [ColumnType.User]: renderUserCell,
  [ColumnType.Priority]: renderDefaultCell,
  [ColumnType.Date]: renderDateCell,
  [ColumnType.Default]: renderDefaultCell,
  [ColumnType.Number]: renderDefaultCell,
  [ColumnType.Boolean]: renderDefaultCell,
  [ColumnType.ART]: renderDefaultCell,
  [ColumnType.Text]: renderDefaultCell,
  [ColumnType.Team]: renderDefaultCell,
};

const getRenderer = (type: string): CellRenderer => {
  const columnType = type as ColumnType;
  return cellRenderers[columnType] ?? cellRenderers[ColumnType.Default];
};

export const renderCellContent = ({ value, type }: RenderCellProps): React.ReactNode => {
  if (isNullish(value)) {
    return EMPTY_CELL;
  }

  const renderer = getRenderer(type);
  return renderer(value);
};
