import { css } from '@emotion/css';
import React from 'react';
import { InfoLineType } from 'types';

import { GrafanaTheme2 } from '@grafana/data';
import { useStyles2 } from '@grafana/ui';

import { InfoLine } from '../InfoLine';

interface Props {
  title?: InfoLineType;
  description?: string;
}

const getStyles = (theme: GrafanaTheme2) => {
  return {
    wrapper: css`
      overflow: auto;
      margin-bottom: 12px;
    `,
    header: css`
      font-size: 1.7rem;
    `,
    description: css``,
  };
};

export const Header: React.FC<Props> = ({ title, description }) => {
  const styles = useStyles2(getStyles);

  if (!title && !description) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      {title && <InfoLine {...title} className={styles.header} />}
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
};
