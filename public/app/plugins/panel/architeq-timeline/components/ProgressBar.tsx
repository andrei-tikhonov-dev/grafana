import React from 'react';
import { GrafanaTheme2 } from '@grafana/data';
import { css } from '@emotion/css';
import { useStyles2 } from '@grafana/ui';

type ProgressBarProps = {
  label: string;
  percentComplete: number;
};

const getStyles = (theme: GrafanaTheme2) => ({
  container: css`
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;
    margin-bottom: 24px;
  `,
  label: css`
    font-size: ${theme.typography.bodySmall.fontSize};
    color: ${theme.colors.text.primary};
    text-align: center;
  `,
  progressBar: css`
    position: relative;
    background-color: ${theme.colors.background.secondary};
    border-radius: 10px;
    height: 20px;
    width: 100%;
    overflow: hidden;
  `,
  progress: css`
    background-color: ${theme.colors.primary.main};
    height: 100%;
    border-radius: 10px 0 0 10px;
    transition: width 0.3s ease;
  `,
});

export const ProgressBar: React.FC<ProgressBarProps> = ({ label, percentComplete }) => {
  const styles = useStyles2(getStyles);

  return (
    <div className={styles.container}>
      <div className={styles.progressBar}>
        <div className={styles.progress} style={{ width: `${percentComplete}%` }} />
      </div>
      <span className={styles.label}>{label}</span>
    </div>
  );
};
