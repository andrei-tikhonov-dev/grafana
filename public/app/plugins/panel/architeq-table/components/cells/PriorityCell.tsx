import { css } from '@emotion/css';
import { PriorityIcon, PriorityType } from 'architeq-library';
import React from 'react';

import { CustomCellRendererProps, useStyles2 } from '@grafana/ui';

import { InfoLineType } from '../../types';
import { InfoLine } from '../InfoLine';

const getStyles = () => {
  return {
    cell: css`
      display: flex;
      align-items: center;
      gap: 5px;
    `,
  };
};

const icons: Record<string, PriorityType> = {
  Minor: 'Minor',
  Major: 'Major',
  Critical: 'Critical',
  Blocker: 'Blocker',
};

export const PriorityCell = ({ value }: CustomCellRendererProps) => {
  const styles = useStyles2(getStyles);

  if (typeof value === 'object') {
    return <InfoLine {...(value as InfoLineType)} />;
  }

  const type = String(value);
  return (
    <div className={styles.cell}>
      <PriorityIcon name={icons[type] || 'Minor'} /> {type}
    </div>
  );
};
