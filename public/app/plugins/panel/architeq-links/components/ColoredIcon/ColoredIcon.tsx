import { css } from '@emotion/css';
import React from 'react';

import { useStyles2 } from '@grafana/ui';
import { GrafanaTheme2 } from '@grafana/data';
import { ColoredIconPath } from '../../types';

const getStyles = (theme: GrafanaTheme2) => {
  return {
    icon: css`
      height: 80px;
    `,
  };
};

type Props = {
  path: ColoredIconPath;
  alt?: string;
};

export const ColoredIcon = ({ path, alt }: Props) => {
  const styles = useStyles2(getStyles);
  const publicIconsPath = 'public/plugins/architeq-links-panel/img/icons/';

  return <img className={styles.icon} src={`${publicIconsPath}${path || ColoredIconPath.ART1}`} alt={alt} />;
};
