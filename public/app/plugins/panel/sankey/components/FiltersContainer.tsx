import { css } from '@emotion/css';
import React from 'react';

import { useStyles2 } from '@grafana/ui';

const getStyles = () => {
  return {
    container: css`
      padding: 4px;
      display: flex;
      gap: 12px;
      margin-bottom: 12px;
    `,
  };
};

export const FiltersContainer = ({ children }: { children: React.ReactNode }) => {
  const styles = useStyles2(getStyles);

  return <div className={styles.container}>{children}</div>;
};
