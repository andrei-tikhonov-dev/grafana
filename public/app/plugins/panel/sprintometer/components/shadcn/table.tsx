import { css, cx } from '@emotion/css';
import * as React from 'react';

import { theme3 } from '../../theme/theme';

const tableContainerStyles = css`
  position: relative;
  width: 100%;
  overflow-x: auto;
`;

const tableStyles = css`
  width: 100%;
  caption-side: bottom;
  font-size: ${theme3.tailwind.textSm};
`;

const tableHeaderStyles = css`
  & tr {
    border-bottom: 1px solid ${theme3.shadcn.border};
  }
`;

const tableBodyStyles = css`
  & tr:last-child {
    border-bottom: 0;
  }
`;

const tableFooterStyles = css`
  background-color: ${theme3.shadcn.muted};
  opacity: 0.5;
  border-top: 1px solid ${theme3.shadcn.border};
  font-weight: ${theme3.tailwind.fontWeightMedium};

  & > tr:last-child {
    border-bottom: 0;
  }
`;

const tableRowStyles = css`
  border-bottom: 1px solid ${theme3.shadcn.border};
  transition: colors 150ms ease-in-out;

  &:hover {
  }

  &[data-state='selected'] {
    background-color: ${theme3.shadcn.muted};
  }
`;

const tableHeadStyles = css`
  color: ${theme3.shadcn.foreground};
  height: 2.5rem;
  padding-left: calc(${theme3.tailwind.spacing} * 2);
  padding-right: calc(${theme3.tailwind.spacing} * 2);
  text-align: left;
  vertical-align: middle;
  font-weight: ${theme3.tailwind.fontWeightMedium};
  white-space: nowrap;

  &:has([role='checkbox']) {
    padding-right: 0;
  }

  & > [role='checkbox'] {
    transform: translateY(2px);
  }
`;

const tableCellStyles = css`
  padding: calc(${theme3.tailwind.spacing} * 2);
  vertical-align: middle;
  white-space: nowrap;

  &:has([role='checkbox']) {
    padding-right: 0;
  }

  & > [role='checkbox'] {
    transform: translateY(2px);
  }
`;

const tableCaptionStyles = css`
  color: ${theme3.shadcn.mutedForeground};
  margin-top: 1rem;
  font-size: ${theme3.tailwind.textSm};
`;

function Table({ className, ...props }: React.ComponentProps<'table'>) {
  return (
    <div data-slot="table-container" className={tableContainerStyles}>
      <table data-slot="table" className={cx(tableStyles, className)} {...props} />
    </div>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<'thead'>) {
  return <thead data-slot="table-header" className={cx(tableHeaderStyles, className)} {...props} />;
}

function TableBody({ className, ...props }: React.ComponentProps<'tbody'>) {
  return <tbody data-slot="table-body" className={cx(tableBodyStyles, className)} {...props} />;
}

function TableFooter({ className, ...props }: React.ComponentProps<'tfoot'>) {
  return <tfoot data-slot="table-footer" className={cx(tableFooterStyles, className)} {...props} />;
}

function TableRow({ className, ...props }: React.ComponentProps<'tr'>) {
  return <tr data-slot="table-row" className={cx(tableRowStyles, className)} {...props} />;
}

function TableHead({ className, ...props }: React.ComponentProps<'th'>) {
  return <th data-slot="table-head" className={cx(tableHeadStyles, className)} {...props} />;
}

function TableCell({ className, ...props }: React.ComponentProps<'td'>) {
  return <td data-slot="table-cell" className={cx(tableCellStyles, className)} {...props} />;
}

function TableCaption({ className, ...props }: React.ComponentProps<'caption'>) {
  return <caption data-slot="table-caption" className={cx(tableCaptionStyles, className)} {...props} />;
}

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };
