import React from 'react';

import { ColumnTypeEnum, UserInterface } from '../../../types';
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
  const user = value as UserInterface;
  return <DefaultCell value={user?.name} />;
};

const renderDateCell = (value: unknown): React.ReactNode => {
  return <DefaultCell value={formatRelativeDate(value as string)} />;
};

const renderDefaultCell = (value: unknown): React.ReactNode => {
  return <DefaultCell value={value} />;
};

const cellRenderers: Record<ColumnTypeEnum, CellRenderer> = {
  [ColumnTypeEnum.Link]: (value) => <LinkCell value={value} />,
  [ColumnTypeEnum.HasChanges]: (value) => <HasChangesCell value={value} />,
  [ColumnTypeEnum.IssueTypeIcon]: (value) => <JiraTypeIconCell value={value} />,
  [ColumnTypeEnum.IssueStatus]: (value) => <JiraChangesHistoryCell value={value} />,
  [ColumnTypeEnum.Changes]: (value) => <JiraChangesHistoryCell value={value} />,
  [ColumnTypeEnum.Sprint]: (value) => <JiraChangesHistoryCell value={value} />,
  [ColumnTypeEnum.User]: renderUserCell,
  [ColumnTypeEnum.Priority]: renderDefaultCell,
  [ColumnTypeEnum.Date]: renderDateCell,
  [ColumnTypeEnum.Default]: renderDefaultCell,
  [ColumnTypeEnum.Number]: renderDefaultCell,
  [ColumnTypeEnum.Boolean]: renderDefaultCell,
  [ColumnTypeEnum.ART]: renderDefaultCell,
  [ColumnTypeEnum.Text]: renderDefaultCell,
  [ColumnTypeEnum.Team]: renderDefaultCell,
};

const getRenderer = (type: string): CellRenderer => {
  const columnType = type as ColumnTypeEnum;
  return cellRenderers[columnType] ?? cellRenderers[ColumnTypeEnum.Default];
};

export const renderCellContent = ({ value, type }: RenderCellProps): React.ReactNode => {
  if (isNullish(value)) {
    return EMPTY_CELL;
  }

  const renderer = getRenderer(type);
  return renderer(value);
};
