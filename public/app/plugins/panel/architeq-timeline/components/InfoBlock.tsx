import { css } from '@emotion/css';
import React from 'react';

import { GrafanaTheme2, IconName } from '@grafana/data';
import { useStyles2 } from '@grafana/ui';

import { InfoLineType, Status } from '../types';

import { InfoLine } from './InfoLine/InfoLine';

type Props = InfoLineType;

const getStyles = (theme: GrafanaTheme2) => {
  return {
    status: css`
      margin-bottom: 8px;
    `,
  };
};

const statusIconNames = {
  [Status.OK]: 'fa6/FaCircleCheck',
  [Status.WARNING]: 'fa6/FaCircleExclamation',
  [Status.CRITICAL]: 'fa6/FaCircleXmark',
};

export const InfoBlock: React.FC<Props> = ({ status, value, icon, name }) => {
  const styles = useStyles2(getStyles);
  const iconName = icon || (status && (statusIconNames[status] as IconName));

  return (
    <div className={styles.status}>
      <InfoLine name={name} value={value} status={status} icon={iconName} />
    </div>
  );
};
