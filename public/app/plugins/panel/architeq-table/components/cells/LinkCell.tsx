import { css } from '@emotion/css';
import React from 'react';

import { CustomCellRendererProps, useStyles2 } from '@grafana/ui';

import { useDataTableContext } from '../DataTable/DataTableContext';

const getStyles = () => {
  return {
    cell: css``,
  };
};

export const LinkCell = ({ value }: CustomCellRendererProps) => {
  const styles = useStyles2(getStyles);
  const { baseUrl } = useDataTableContext();

  return (
    <div className={styles.cell}>
      {baseUrl ? (
        <a href={`${baseUrl}/${value}`} style={{ textDecoration: 'underline' }} target="_blank" rel="noreferrer">
          {String(value)}
        </a>
      ) : (
        String(value)
      )}
    </div>
  );
};
