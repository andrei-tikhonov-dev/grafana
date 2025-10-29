import { css } from '@emotion/css';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import * as React from 'react';

import { ScrollArea, ScrollBar } from '../../../components/shadcn/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/shadcn/table';
import { bordersStyles, theme3 } from '../../../theme';
import { customTheme } from '../custom-theme';
import { MTableData } from '../types';

const getWrapperStyles = (width: number) => css`
  padding: ${theme3.tailwind.spacing4} ${theme3.tailwind.spacing} ${theme3.tailwind.spacing4} 0;
  width: ${width}px;
`;

const tableBodyStyles = css`
  & tr:nth-child(even) {
    background-color: ${customTheme.pbColorZebra};
  }
`;

const tableCellStyles = css`
  vertical-align: top;
  border-right: ${theme3.custom.border};

  &:last-child {
    border-right: none;
  }
`;

const tableHeadStyles = css`
  border-right: ${theme3.custom.border};

  &:last-child {
    border-right: none;
  }
`;

type Props = MTableData & { width: number };

export function DataTable({ columns, data, width }: Props) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <ScrollArea className={getWrapperStyles(width)}>
      <Table className={bordersStyles}>
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
        <TableBody className={tableBodyStyles}>
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
