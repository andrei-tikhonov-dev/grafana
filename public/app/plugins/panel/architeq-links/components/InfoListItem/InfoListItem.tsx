import { css } from '@emotion/css';
import React from 'react';

import { GrafanaTheme2 } from '@grafana/data';
import { Icon, useStyles2 } from '@grafana/ui';

import { InfoListItemType } from '../../types';

const getStyles = (theme: GrafanaTheme2) => {
  return {
    container: css`
      display: flex;
      gap: 8px;
    `,
    name: css`
      font-weight: bold;
    `,
    value: css``,
    icon: css``,
  };
};

interface Props extends InfoListItemType {}

export const InfoListItem = ({ name, icon, value, status }: Props) => {
  const styles = useStyles2(getStyles);

  return (
    <div className={styles.container}>
      {icon && (
        <div className={styles.icon}>
          <Icon name={icon} size="sm" />
        </div>
      )}
      <div>
        {name && <span className={styles.name}>{name}</span>}
        {value && <span className={styles.value}> {value} </span>}
      </div>
    </div>
  );
};
