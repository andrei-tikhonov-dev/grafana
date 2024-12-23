import { css } from '@emotion/css';
import React from 'react';

import { useStyles2 } from '@grafana/ui';

const getStyles = () => {
  return {
    cell: css`
      padding: 4px;
    `,
  };
};

export const HeaderItem = ({ children }: { children: React.ReactNode }) => {
  const styles = useStyles2(getStyles);

  return <div className={styles.cell}>{children}</div>;
};
