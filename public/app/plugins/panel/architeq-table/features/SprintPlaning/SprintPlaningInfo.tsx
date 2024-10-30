import { css } from '@emotion/css';
import React from 'react';

import { GrafanaTheme2 } from '@grafana/data';
import { useStyles2 } from '@grafana/ui';

import { LoadingMode } from '../../constants';

import { SprintPlaningInfoCard } from './SprintPlaningInfoCard';
import { SprintPlaningInfoType } from './types';

export const INFO_HEIGHT = 190;

const getStyles = (theme: GrafanaTheme2) => {
  return {
    container: css`
      height: ${INFO_HEIGHT}px;
      display: flex;
      margin-bottom: 20px;
    `,
  };
};

interface Props extends SprintPlaningInfoType {
  onUpdate?: (value?: number) => void;
  loading?: LoadingMode;
}

export const SprintPlaningInfo: React.FC<Props> = (props) => {
  const styles = useStyles2(getStyles);

  return (
    <div className={styles.container}>
      <SprintPlaningInfoCard {...props} />
    </div>
  );
};
