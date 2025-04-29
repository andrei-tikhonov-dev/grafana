import { css } from '@emotion/css';
import React from 'react';

import { GrafanaTheme2 } from '@grafana/data';
import { Button, useStyles2 } from '@grafana/ui';

import { formatRelativeDate } from '../utils';

interface UpdateButtonProps {
  updateUrl: string;
  lastUpdated?: string;
  onUpdate?: () => void;
}

const getStyles = (theme: GrafanaTheme2) => {
  return {
    buttonContainer: css`
      display: flex;
      justify-content: flex-end;
      margin-bottom: 8px;
      align-items: center;
    `,
    lastUpdatedText: css`
      margin-right: 12px;
      font-size: 12px;
      color: ${theme.colors.text.secondary};
    `,
  };
};

export const UpdateButton: React.FC<UpdateButtonProps> = ({ updateUrl, lastUpdated, onUpdate }) => {
  const styles = useStyles2(getStyles);

  return (
    <div className={styles.buttonContainer}>
      {lastUpdated && <span className={styles.lastUpdatedText}>Last update: {formatRelativeDate(lastUpdated)}</span>}
      <Button variant="primary" size="sm" onClick={onUpdate}>
        Update
      </Button>
    </div>
  );
};
