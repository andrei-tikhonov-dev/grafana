import { css, cx } from '@emotion/css';
import React, { useState, useEffect } from 'react';

import { Ellipsis, Icon } from '../';
import { theme } from '../../../theme';
import { Table, ColumnSize } from '../../../types';

const columnSizeToWidth = (size?: ColumnSize): string => {
  switch (size) {
    case 'xs':
      return '42px';
    case 'sm':
      return '100px';
    case 'md':
      return '150px';
    case 'lg':
      return '200px';
    case 'xl':
      return '250px';
    case '2xl':
      return '300px';
    case '3xl':
      return '350px';
    default:
      return 'minmax(0, 1fr)';
  }
};

// Generate grid template columns based on column sizes
const generateGridTemplateColumns = (
  columns: Array<{ size?: ColumnSize; hidden?: boolean }>,
  includeExpandToggle = false
): string => {
  const visibleColumns = columns.filter((col) => !col.hidden);
  const columnWidths = visibleColumns.map((col) => columnSizeToWidth(col.size)).join(' ');

  return includeExpandToggle ? `40px ${columnWidths}` : columnWidths;
};

export interface ExpandableTableProps<T extends { id: number | string }, U = any> extends Table<T, U> {
  CellContent: React.ComponentType<{ data: any; type: string; value: any }>;
  initialExpandedRows?: Record<string | number, boolean>;
  disableExpand?: boolean;
}

const styles = {
  // Outer table styles
  outerTable: css`
    display: grid;
    width: 100%;
    margin-bottom: 16px;
  `,
  outerRow: css`
    display: contents;
  `,
  outerCell: css`
    padding: 8px;
    display: flex;
    align-items: center;
    color: ${theme.colors.semantic.textLite};
  `,
  outerCellDisabled: css`
    padding: 8px;
    display: flex;
    align-items: center;
    color: ${theme.colors.semantic.textLite};
    background-color: ${theme.colors.semantic.background};
  `,
  outerHeaderCell: css`
    padding: 8px;
    font-weight: bold;
  `,
  // Inner table styles
  innerTableWrapper: css`
    grid-column: 1 / -1;
    padding: 16px;
    margin-bottom: 16px;
  `,
  innerTableWrapperExpand: css`
    padding-left: 90px;
    background-color: ${theme.colors.semantic.background};
  `,
  innerTableWrapperNoExpand: css`
    padding-left: 100px;
    background-color: transparent;
  `,
  innerTable: css`
    display: grid;
    width: 100%;
    border: 1px solid ${theme.colors.border.weak};
    overflow: hidden;
  `,
  innerRow: css`
    background-color: white;
    display: contents;
  `,
  innerCell: css`
    padding: 8px;
    display: flex;
    align-items: center;
    color: ${theme.colors.semantic.textLite};
    background-color: white;
  `,
  innerCellAlternate: css`
    padding: 8px;
    display: flex;
    align-items: center;
    color: ${theme.colors.semantic.textLite};
    background-color: ${theme.colors.semantic.background};
  `,
  innerHeaderCell: css`
    padding: 8px;
    font-weight: bold;
    border-bottom: 1px solid ${theme.colors.border.weak};
  `,
  innerHeaderCellExpand: css`
    background-color: ${theme.colors.semantic.background};
  `,
  innerHeaderCellNoExpand: css`
    background-color: transparent;
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

export function ExpandableTable<
  T extends { id: number | string } & Record<string, any>,
  U extends Record<string, any> = Record<string, any>
>({
  columns,
  innerColumns,
  data,
  CellContent,
  initialExpandedRows = {},
  disableExpand = false,
}: ExpandableTableProps<T, U>) {
  const [expandedRows, setExpandedRows] = useState<Record<string | number, boolean>>(initialExpandedRows);

  useEffect(() => {
    if (disableExpand) {
      const allExpanded: Record<string | number, boolean> = {};
      data.forEach((item) => {
        allExpanded[item.id] = true;
      });
      setExpandedRows(allExpanded);
    }
  }, [disableExpand, data]);

  const toggleRow = (id: string | number) => {
    if (!disableExpand) {
      setExpandedRows((prev) => ({
        ...prev,
        [id]: !prev[id],
      }));
    }
  };

  // Filter out hidden columns
  const visibleOuterColumns = columns.filter((col) => !col.hidden);
  const visibleInnerColumns = innerColumns.filter((col) => !col.hidden);

  const outerGridTemplateColumns = generateGridTemplateColumns(columns, !disableExpand);
  const innerGridTemplateColumns = generateGridTemplateColumns(innerColumns);

  return (
    <div className={styles.outerTable} style={{ gridTemplateColumns: outerGridTemplateColumns }}>
      {/* Header row */}
      <div className={styles.outerRow}>
        {!disableExpand && <div className={styles.outerHeaderCell}></div>}
        {visibleOuterColumns.map((column, i) => (
          <div key={`header-${i}`} className={styles.outerHeaderCell}>
            <Ellipsis>{column.title || ''}</Ellipsis>
          </div>
        ))}
      </div>

      {/* Data rows */}
      {data.map((item) => (
        <React.Fragment key={`row-${item.id}`}>
          {/* Outer row */}
          <div className={styles.outerRow}>
            {!disableExpand && (
              <div className={styles.outerCell}>
                <button className={styles.toggleButton} onClick={() => toggleRow(item.id)}>
                  {expandedRows[item.id] ? (
                    <Icon name="ArrowDropUp" size="md" />
                  ) : (
                    <Icon name="ArrowDropDown" size="md" />
                  )}
                </button>
              </div>
            )}
            {visibleOuterColumns.map((column, i) => (
              <div key={`cell-${item.id}-${i}`} className={disableExpand ? styles.outerCellDisabled : styles.outerCell}>
                <CellContent data={item} type={column.type} value={item[column.key]} />
              </div>
            ))}
          </div>

          {/* Inner table  */}
          {(expandedRows[item.id] || disableExpand) && item.innerData && (
            <div
              className={cx(
                styles.innerTableWrapper,
                disableExpand ? styles.innerTableWrapperNoExpand : styles.innerTableWrapperExpand
              )}
            >
              <div className={styles.innerTable} style={{ gridTemplateColumns: innerGridTemplateColumns }}>
                {/* Inner table header */}
                <div className={styles.innerRow}>
                  {visibleInnerColumns.map((column, i) => (
                    <div key={`inner-header-${i}`} className={styles.innerHeaderCell}>
                      <Ellipsis>{column.title || ''}</Ellipsis>
                    </div>
                  ))}
                </div>

                {/* Inner table rows */}
                {item.innerData.map((innerItem: U, rowIndex: number) => (
                  <div key={`inner-row-${(innerItem as any).id}`} className={styles.innerRow}>
                    {visibleInnerColumns.map((column, i) => (
                      <div
                        key={`inner-cell-${(innerItem as any).id}-${i}`}
                        className={
                          disableExpand
                            ? rowIndex % 2 === 0
                              ? styles.innerCellAlternate
                              : styles.innerCell
                            : rowIndex % 2 === 1
                            ? styles.innerCellAlternate
                            : styles.innerCell
                        }
                      >
                        <CellContent value={innerItem[column.key]} data={innerItem} type={column.type} />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
