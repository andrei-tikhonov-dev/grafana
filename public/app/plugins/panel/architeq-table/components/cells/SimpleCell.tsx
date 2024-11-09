import { css } from '@emotion/css';
import React from 'react';

import { CustomCellRendererProps, useStyles2 } from '@grafana/ui';

const getStyles = () => {
  return {
    cell: css``,
  };
};

export const SimpleCell = ({ value }: CustomCellRendererProps) => {
  const styles = useStyles2(getStyles);

  return <div className={styles.cell}>{String(value)}</div>;
};
