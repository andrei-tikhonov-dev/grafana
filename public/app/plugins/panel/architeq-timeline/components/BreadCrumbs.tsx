import { css } from '@emotion/css';
import React from 'react';

import { useStyles2, TextLink, Card } from '@grafana/ui';

import { BreadCrumbsType } from '../types';

const getStyles = () => ({
  container: css`
    margin-bottom: 12px;
  `,
  breadcrumbs: css`
    display: flex;
    align-items: center;
    gap: 5px;
  `,
  separator: css`
    margin: 0 5px;
  `,
});

export const BreadCrumbs: React.FC<BreadCrumbsType> = ({ items }) => {
  const styles = useStyles2(getStyles);

  return (
    <div className={styles.container}>
      <Card isCompact>
        <nav className={styles.breadcrumbs}>
          {items.map((item, index) => (
            <React.Fragment key={index}>
              {item.link ? <TextLink href={item.link}>{item.label}</TextLink> : <span>{item.label}</span>}
              {index < items.length - 1 && <span className={styles.separator}>/</span>}
            </React.Fragment>
          ))}
        </nav>
      </Card>
    </div>
  );
};
