import { css } from '@emotion/css';
import React from 'react';

import { GrafanaTheme2 } from '@grafana/data';
import { Checkbox, useStyles2 } from '@grafana/ui';

import { GoalType } from '../types';

type Props = {
  data: GoalType[];
  title?: string;
};

const getStyles = (theme: GrafanaTheme2) => {
  return {
    container: css`
      display: flex;
      gap: 5px;
      align-items: baseline;
      margin-bottom: 24px;
      flex-direction: column;
      background-color: ${theme.colors.background.canvas};
      border-radius: 8px;
      padding: 16px;
    `,
  };
};

export const Goals: React.FC<Props> = ({ data, title }) => {
  const styles = useStyles2(getStyles);

  const renderCheckbox = (goal: GoalType) => {
    return <Checkbox value={goal.isCompleted} label={goal.text} />;
  };

  return (
    <div className={styles.container}>
      {title && <h4>{title}</h4>}
      {data.map(renderCheckbox)}
    </div>
  );
};
