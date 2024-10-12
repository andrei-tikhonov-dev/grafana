import { css } from '@emotion/css';
import React from 'react';

import { GrafanaTheme2 } from '@grafana/data';
import { getLocationSrv } from '@grafana/runtime';
import { Button, useStyles2 } from '@grafana/ui';

type Props = {};

const getStyles = (theme: GrafanaTheme2) => {
  return {
    container: css`
      display: flex;
      gap: 5px;
      align-items: baseline;
      margin-bottom: 12px;
    `,
  };
};

const setVariable = async (variableName: string, value: string) => {
  const locationService = getLocationSrv();
  await locationService.update({
    query: { [`var-${variableName}`]: value },
    partial: true,
  });
};

export const SprintSelector: React.FC<Props> = () => {
  const styles = useStyles2(getStyles);

  return (
    <div className={styles.container}>
      <Button size="sm" onClick={() => setVariable('sprintId', 'default')}>
        KIB Sprint 131
      </Button>
      <Button size="sm" onClick={() => setVariable('sprintId', 'kib1')}>
        KIB Sprint 132
      </Button>
    </div>
  );
};
