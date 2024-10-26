import { css } from '@emotion/css';
import React from 'react';

import { GrafanaTheme2 } from '@grafana/data';
import { Checkbox, useStyles2 } from '@grafana/ui';

import { RequestMethod } from '../constants';
import { useRequest } from '../hooks/useRequest';
import { GoalType } from '../types';

type Props = {
  data: GoalType[];
  title?: string;
  updateUrl?: string;
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

export const Goals: React.FC<Props> = ({ data, title, updateUrl }) => {
  const styles = useStyles2(getStyles);

  const { updateRequest } = useRequest({
    update: {
      url: updateUrl,
      method: RequestMethod.POST,
    },
  });

  const handleUpdate = async (value: boolean, id: string | number) => {
    const payload = { value, id };
    console.log(payload);
    return updateRequest(payload);
  };

  const renderCheckbox = (goal: GoalType) => {
    return (
      <Checkbox
        value={goal.isCompleted}
        label={goal.text}
        onChange={(event: any) => handleUpdate(event.target.checked, goal.id)}
      />
    );
  };

  return (
    <div className={styles.container}>
      {title && <h4>{title}</h4>}
      {data.map(renderCheckbox)}
    </div>
  );
};
