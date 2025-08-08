import { css } from '@emotion/css';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import * as React from 'react';

import { ScrollArea, ScrollBar } from '../../../components/shadcn/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/shadcn/table';
import { theme3 } from '../../../theme/theme';
import { UTableData } from '../types';

const getWrapperStyles = (width: number) => css`
  padding: calc(${theme3.tailwind.spacing} * 4);
  width: ${width}px;
`;

const tableCellStyles = css`
  vertical-align: top;
  border-right: 1px solid ${theme3.shadcn.border};

  &:last-child {
    border-right: none;
  }
`;

const tableHeadStyles = css`
  border-right: 1px solid ${theme3.shadcn.border};

  &:last-child {
    border-right: none;
  }
`;

type Props = UTableData & { width: number };

export function DataTable({ columns, data, width }: Props) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <ScrollArea className={getWrapperStyles(width)}>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className={tableHeadStyles}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell className={tableCellStyles} key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className={tableCellStyles}>
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
