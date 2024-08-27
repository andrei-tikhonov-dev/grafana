import { css } from '@emotion/css';
import React from 'react';

import { CustomCellRendererProps, useStyles2 } from '@grafana/ui';

const getStyles = () => {
  return {
    cell: css``,
  };
};

export const DaysCell = ({ value }: CustomCellRendererProps) => {
  const styles = useStyles2(getStyles);

  return (
    <div className={styles.cell}>
      {String(value)} {value === 1 ? 'day' : 'days'}
    </div>
  );
};
