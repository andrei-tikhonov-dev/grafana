import { css } from '@emotion/css';
import React from 'react';

import { CustomCellRendererProps, useStyles2 } from '@grafana/ui';

const getStyles = () => {
  return {
    cell: css``,
  };
};

export const CapacityCell = ({ value }: CustomCellRendererProps) => {
  const styles = useStyles2(getStyles);
  const { assignSP, plannedSP } = (value || {}) as any;

  return (
    <div className={styles.cell}>
      {String(assignSP)} / {String(plannedSP)}
    </div>
  );
};
