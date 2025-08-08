import React from 'react';

import { EColumnType, TUser } from '../../../types';
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
  const user = value as TUser;
  return <DefaultCell value={user?.name} />;
};

const renderDateCell = (value: unknown): React.ReactNode => {
  return <DefaultCell value={formatRelativeDate(value as string)} />;
};

const renderDefaultCell = (value: unknown): React.ReactNode => {
  return <DefaultCell value={value} />;
};

const cellRenderers: Record<EColumnType, CellRenderer> = {
  [EColumnType.Link]: (value) => <LinkCell value={value} />,
  [EColumnType.HasChanges]: (value) => <HasChangesCell value={value} />,
  [EColumnType.IssueTypeIcon]: (value) => <JiraTypeIconCell value={value} />,
  [EColumnType.IssueStatus]: (value) => <JiraChangesHistoryCell value={value} />,
  [EColumnType.Changes]: (value) => <JiraChangesHistoryCell value={value} />,
  [EColumnType.Sprint]: (value) => <JiraChangesHistoryCell value={value} />,
  [EColumnType.User]: renderUserCell,
  [EColumnType.Priority]: renderDefaultCell,
  [EColumnType.Date]: renderDateCell,
  [EColumnType.Default]: renderDefaultCell,
  [EColumnType.Number]: renderDefaultCell,
  [EColumnType.Boolean]: renderDefaultCell,
  [EColumnType.ART]: renderDefaultCell,
  [EColumnType.Text]: renderDefaultCell,
  [EColumnType.Team]: renderDefaultCell,
};

const getRenderer = (type: string): CellRenderer => {
  const columnType = type as EColumnType;
  return cellRenderers[columnType] ?? cellRenderers[EColumnType.Default];
};

export const renderCellContent = ({ value, type }: RenderCellProps): React.ReactNode => {
  if (isNullish(value)) {
    return EMPTY_CELL;
  }

  const renderer = getRenderer(type);
  return renderer(value);
};
