import { css } from '@emotion/css';
import React from 'react';

import { GrafanaTheme2 } from '@grafana/data';
import { useStyles2 } from '@grafana/ui';

import { LinkCardRowType } from '../../types';
import { LinkCard } from '../LinkCard';

const getStyles = (theme: GrafanaTheme2) => {
  return {
    container: css`
      padding: 4px;
    `,
    title: css`
      padding-bottom: 12px;
    `,
    row: css`
      display: flex;
      gap: 24px;
    `,
  };
};

interface Props extends LinkCardRowType {}

export const LinkCardRow = ({ cards, title, size, tooltip }: Props) => {
  const styles = useStyles2(getStyles);

  return (
    <>
      <div className={styles.container}>
        {title && <h3 className={styles.title}>{title}</h3>}
        <div className={styles.row}>{cards?.map((card) => <LinkCard {...card} key={card.title} />)}</div>
      </div>
    </>
  );
};
