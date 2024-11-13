import { css } from '@emotion/css';
import cn from 'classnames';
import React from 'react';

import { GrafanaTheme2 } from '@grafana/data';
import { useStyles2 } from '@grafana/ui';

import { InfoLineType, Status } from '../../types';

import { DynamicIcon } from './DynamicIcon';

type Props = Pick<InfoLineType, 'status' | 'icon'>;

const getStyles = (theme: GrafanaTheme2) => {
  return {
    status: css`
      display: flex;
      align-self: center;
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

export const InfoIcon: React.FC<Props> = ({ status, icon }) => {
  const styles = useStyles2(getStyles);

  const statusClass = cn(styles.status, {
    [styles.ok]: status === Status.OK,
    [styles.warning]: status === Status.WARNING,
    [styles.critical]: status === Status.CRITICAL,
  });

  return <span className={statusClass}>{icon && <DynamicIcon iconName={icon} />}</span>;
};
