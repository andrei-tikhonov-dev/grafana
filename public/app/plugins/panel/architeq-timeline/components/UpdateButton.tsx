import { css } from '@emotion/css';
import React from 'react';

import { GrafanaTheme2 } from '@grafana/data';
import { Button, useStyles2 } from '@grafana/ui';

import { formatRelativeDate } from '../utils';
import { LoadingMode } from '../constants';

interface UpdateButtonProps {
  canUpdate: boolean;
  lastUpdated?: string;
  buttonText?: string;
  loading: LoadingMode;
  onUpdate?: () => void;
}

const getStyles = (theme: GrafanaTheme2) => ({
  buttonContainer: css`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 8px;
    margin-right: 55px;
  `,
  lastUpdatedText: css`
    margin-right: 12px;
    font-size: 12px;
    color: ${theme.colors.text.secondary};
  `,
});

export const UpdateButton: React.FC<UpdateButtonProps> = ({
  canUpdate,
  buttonText,
  lastUpdated,
  onUpdate,
  loading,
}) => {
  const styles = useStyles2(getStyles);
  const isLoading = loading !== LoadingMode.NONE;

  const getStatusText = (): string | null => {
    if (isLoading) return 'Please wait, updating data...';
    if (lastUpdated) return `Last update: ${formatRelativeDate(lastUpdated)}`;
    return null;
  };

  const statusText = getStatusText();

  return (
    <div className={styles.buttonContainer}>
      {statusText && <span className={styles.lastUpdatedText}>{statusText}</span>}
      {canUpdate && (
        <Button
          icon={isLoading ? 'spinner' : 'sync'}
          variant="primary"
          size="sm"
          onClick={onUpdate}
          disabled={isLoading}
        >
          {buttonText || 'Update'}
        </Button>
      )}
    </div>
  );
};
