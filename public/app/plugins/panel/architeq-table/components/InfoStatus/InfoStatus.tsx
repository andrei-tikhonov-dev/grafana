import { css } from '@emotion/css';
import React from 'react';

import { GrafanaTheme2 } from '@grafana/data';
import { Icon, Tooltip, useStyles2 } from '@grafana/ui';

import { InfoStatusType, Status } from '../../types';

interface InfoStatusProps extends InfoStatusType {
  title: string;
}

const getStyles = (theme: GrafanaTheme2) => ({
  tableTitle: css`
    font-size: ${theme.typography.h4.fontSize};
    font-weight: bold;
    display: flex;
    align-items: center;
  `,
  warning: css`
    color: ${theme.colors.warning.text};
    padding-left: 8px;
  `,
});

export const InfoStatus: React.FC<InfoStatusProps> = ({ title, status, message }) => {
  const styles = useStyles2(getStyles);

  return (
    <div className={styles.tableTitle}>
      {title}
      {status !== Status.OK && message && (
        <span className={styles.warning}>
          <Tooltip content={message} placement="top">
            <Icon size="md" name={status === Status.WARNING ? 'exclamation-triangle' : 'exclamation-circle'} />
          </Tooltip>
        </span>
      )}
    </div>
  );
};
