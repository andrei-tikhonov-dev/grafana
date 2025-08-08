import { css, cx } from '@emotion/css';
import React, { useState, useEffect, useCallback } from 'react';

import { UiEllipsis, UiIcon, renderCellContent } from '../';
import { theme } from '../../../theme';
import { TTable, TColumnSize } from '../../../types';

type RowId = number;

interface ExpandableTableProps<T extends { id: RowId }, U = any> extends TTable<T, U> {
  renderCell?: (props: { data: any; type: string; value: any }) => React.ReactNode;
  initialExpandedRows?: Record<RowId, boolean>;
  disableExpand?: boolean;
}

interface TableColumn {
  size?: TColumnSize;
  hidden?: boolean;
  key: string;
  title?: string;
  type: string;
}

const COLUMN_SIZES: Record<TColumnSize, string> = {
  xs: '42px',
  sm: '100px',
  md: '150px',
  lg: '200px',
  xl: '250px',
  '2xl': '300px',
  '3xl': '350px',
};

const DEFAULT_COLUMN_WIDTH = 'minmax(100px, 1fr)';
const EXPAND_TOGGLE_WIDTH = '40px';

const getColumnWidth = (size?: TColumnSize): string => {
  return size ? COLUMN_SIZES[size] : DEFAULT_COLUMN_WIDTH;
};

const generateGridTemplate = (columns: TableColumn[], includeToggle = false): string => {
  const visibleColumns = columns.filter((col) => !col.hidden);
  const columnWidths = visibleColumns.map((col) => getColumnWidth(col.size)).join(' ');

  return includeToggle ? `${EXPAND_TOGGLE_WIDTH} ${columnWidths}` : columnWidths;
};

const useExpandableRows = (
  data: Array<{ id: RowId }>,
  initialExpanded: Record<RowId, boolean>,
  disableExpand: boolean
) => {
  const [expandedRows, setExpandedRows] = useState<Record<RowId, boolean>>(initialExpanded);

  useEffect(() => {
    if (disableExpand) {
      const allExpanded = data.reduce((acc, item) => {
        acc[item.id] = true;
        return acc;
      }, {} as Record<RowId, boolean>);
      setExpandedRows(allExpanded);
    }
  }, [disableExpand, data]);

  const toggleRow = useCallback(
    (id: RowId) => {
      if (!disableExpand) {
        setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
      }
    },
    [disableExpand]
  );

  return { expandedRows, toggleRow };
};

const tableStyles = {
  outerTable: css`
    display: grid;
    width: 100%;
    margin-bottom: 16px;
  `,
  row: css`
    display: contents;
  `,
  cell: css`
    padding: 8px;
    display: flex;
    align-items: center;
    color: ${theme.colors.semantic.textLite};
  `,
  cellDisabled: css`
    padding: 8px;
    display: flex;
    align-items: center;
    color: ${theme.colors.semantic.textLite};
    background-color: ${theme.colors.semantic.background};
  `,
  headerCell: css`
    padding: 8px;
    font-weight: bold;
  `,
  toggleButton: css`
    cursor: pointer;
    background: none;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    font-size: 12px;
    padding: 0;
  `,
};

const innerTableStyles = {
  wrapper: css`
    grid-column: 1 / -1;
    padding: 16px;
    margin-bottom: 16px;
    margin-right: 16px;
  `,
  wrapperExpand: css`
    padding-left: 90px;
    background-color: ${theme.colors.semantic.background};
  `,
  wrapperNoExpand: css`
    padding-left: 100px;
    background-color: transparent;
  `,
  table: css`
    display: grid;
    width: 100%;
    border: 1px solid ${theme.colors.border.weak};
    overflow: auto;
  `,
  row: css`
    background-color: white;
    display: contents;
  `,
  cell: css`
    padding: 8px;
    display: flex;
    align-items: center;
    color: ${theme.colors.semantic.textLite};
    background-color: white;
  `,
  cellAlternate: css`
    padding: 8px;
    display: flex;
    align-items: center;
    color: ${theme.colors.semantic.textLite};
    background-color: ${theme.colors.semantic.background};
  `,
  headerCell: css`
    padding: 8px;
    font-weight: bold;
    border-bottom: 1px solid ${theme.colors.border.weak};
  `,
};

interface ExpandToggleProps {
  isExpanded: boolean;
  onClick: () => void;
  disabled: boolean;
}

const ExpandToggle: React.FC<ExpandToggleProps> = ({ isExpanded, onClick, disabled }) => {
  if (disabled) {
    return null;
  }

  return (
    <div className={tableStyles.cell}>
      <button className={tableStyles.toggleButton} onClick={onClick}>
        <UiIcon name={isExpanded ? 'ArrowDropUp' : 'ArrowDropDown'} size="md" />
      </button>
    </div>
  );
};

interface TableHeaderProps {
  columns: TableColumn[];
  showToggle: boolean;
}

const TableHeader: React.FC<TableHeaderProps> = ({ columns, showToggle }) => (
  <div className={tableStyles.row}>
    {showToggle && <div className={tableStyles.headerCell}></div>}
    {columns
      .filter((col) => !col.hidden)
      .map((column, index) => (
        <div key={`header-${index}`} className={tableStyles.headerCell}>
          <UiEllipsis>{column.title || ''}</UiEllipsis>
        </div>
      ))}
  </div>
);

interface TableRowProps<T> {
  item: T;
  columns: TableColumn[];
  renderCell: (props: { data: any; type: string; value: any }) => React.ReactNode;
  disableExpand: boolean;
}

const TableRow = <T extends Record<string, any>>({ item, columns, renderCell, disableExpand }: TableRowProps<T>) => {
  const visibleColumns = columns.filter((col) => !col.hidden);

  return (
    <>
      {visibleColumns.map((column, index) => (
        <div key={`cell-${item.id}-${index}`} className={disableExpand ? tableStyles.cellDisabled : tableStyles.cell}>
          {renderCell({ data: item, type: column.type, value: item[column.key] })}
        </div>
      ))}
    </>
  );
};

interface InnerTableProps<U> {
  data: U[];
  columns: TableColumn[];
  renderCell: (props: { data: any; type: string; value: any }) => React.ReactNode;
  disableExpand: boolean;
  gridTemplate: string;
}

const InnerTable = <U extends Record<string, any>>({
  data,
  columns,
  renderCell,
  disableExpand,
  gridTemplate,
}: InnerTableProps<U>) => {
  const visibleColumns = columns.filter((col) => !col.hidden);

  return (
    <div
      className={cx(
        innerTableStyles.wrapper,
        disableExpand ? innerTableStyles.wrapperNoExpand : innerTableStyles.wrapperExpand
      )}
    >
      <div className={innerTableStyles.table} style={{ gridTemplateColumns: gridTemplate }}>
        <div className={innerTableStyles.row}>
          {visibleColumns.map((column, index) => (
            <div key={`inner-header-${index}`} className={innerTableStyles.headerCell}>
              <UiEllipsis>{column.title || ''}</UiEllipsis>
            </div>
          ))}
        </div>

        {data.map((innerItem, rowIndex) => (
          <div key={`inner-row-${(innerItem as any).id}`} className={innerTableStyles.row}>
            {visibleColumns.map((column, index) => {
              const isAlternate = disableExpand ? rowIndex % 2 === 0 : rowIndex % 2 === 1;

              return (
                <div
                  key={`inner-cell-${(innerItem as any).id}-${index}`}
                  className={isAlternate ? innerTableStyles.cellAlternate : innerTableStyles.cell}
                >
                  {renderCell({
                    value: innerItem[column.key],
                    data: innerItem,
                    type: column.type,
                  })}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export function UiExpandableTable<
  T extends { id: RowId } & Record<string, any>,
  U extends Record<string, any> = Record<string, any>
>({
  columns,
  innerColumns,
  data,
  renderCell = renderCellContent,
  initialExpandedRows = {},
  disableExpand = false,
}: ExpandableTableProps<T, U>) {
  const { expandedRows, toggleRow } = useExpandableRows(data, initialExpandedRows, disableExpand);

  const outerGridTemplate = generateGridTemplate(columns, !disableExpand);
  const innerGridTemplate = generateGridTemplate(innerColumns);

  return (
    <div className={tableStyles.outerTable} style={{ gridTemplateColumns: outerGridTemplate }}>
      <TableHeader columns={columns} showToggle={!disableExpand} />

      {data.map((item) => (
        <React.Fragment key={`row-${item.id}`}>
          <div className={tableStyles.row}>
            <ExpandToggle
              isExpanded={expandedRows[item.id]}
              onClick={() => toggleRow(item.id)}
              disabled={disableExpand}
            />
            <TableRow item={item} columns={columns} renderCell={renderCell} disableExpand={disableExpand} />
          </div>

          {(expandedRows[item.id] || disableExpand) && item.innerData && (
            <InnerTable
              data={item.innerData}
              columns={innerColumns}
              renderCell={renderCell}
              disableExpand={disableExpand}
              gridTemplate={innerGridTemplate}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
