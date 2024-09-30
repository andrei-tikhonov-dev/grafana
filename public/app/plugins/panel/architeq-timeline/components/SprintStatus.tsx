import { css } from '@emotion/css';
import React from 'react';

import { GrafanaTheme2 } from '@grafana/data';
import { Icon, useStyles2 } from '@grafana/ui';

import { Status } from '../types';

type Props = {
  status: Status;
  message: string;
};

const getStyles = (theme: GrafanaTheme2) => {
  return {
    status: css`
      display: flex;
      gap: 5px;
      align-items: baseline;
    `,
    ok: css`
      color: ${theme.colors.success.text};
    `,
    warning: css`
      color: ${theme.colors.warning.text};
    `,
    critical: css`
      color: ${theme.colors.error.text};
    `,
  };
};

export const SprintStatus: React.FC<Props> = ({ status, message }) => {
  const styles = useStyles2(getStyles);

  const renderIconAndStyle = () => {
    switch (status) {
      case Status.OK:
        return (
          <span className={styles.ok}>
            <Icon name="check-circle" />
          </span>
        );
      case Status.WARNING:
        return (
          <span className={styles.warning}>
            <Icon name="exclamation-triangle" />
          </span>
        );
      case Status.CRITICAL:
        return (
          <span className={styles.critical}>
            <Icon name="times-circle" />
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.status}>
      {renderIconAndStyle()}
      {message}
    </div>
  );
};
