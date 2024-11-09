import { css } from '@emotion/css';
import React from 'react';

import { CustomCellRendererProps, useStyles2 } from '@grafana/ui';

import { Capacity } from '../../types';

const getStyles = () => {
  return {
    cell: css``,
  };
};

export const CapacityCell = ({ value }: CustomCellRendererProps) => {
  const styles = useStyles2(getStyles);
  const { assignedSP, availableSP } = value as Capacity;

  return (
    <div className={styles.cell}>
      {String(assignedSP)} / {String(availableSP)}
    </div>
  );
};
