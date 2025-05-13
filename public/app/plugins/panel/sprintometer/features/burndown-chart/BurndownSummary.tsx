import { css } from '@emotion/css';
import React from 'react';

import { Icon } from '../../components/ui';
import { theme } from '../../theme';

import { BurndownSummaryType } from './types';

interface Props {
  name: string;
  summary: BurndownSummaryType;
  color: string;
}

const styles = {
  card: css`
    flex: 1 1 auto;
    border: 1px solid ${theme.colors.border.weak};
    border-radius: ${theme.shape.radius.default};
    padding: 16px 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  `,
  header: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  title: css`
    font-size: ${theme.typography.h4.fontSize};
    font-weight: ${theme.typography.h4.fontWeight};
    margin: 0;
  `,
  percentage: css`
    font-size: ${theme.typography.h4.fontSize};
    font-weight: ${theme.typography.h4.fontWeight};
  `,
  progressBarContainer: css`
    width: 100%;
    height: 8px;
    background-color: ${theme.colors.border.weak};
    border-radius: ${theme.shape.radius.default};
  `,
  progressBar: css`
    height: 100%;
    border-radius: ${theme.shape.radius.default};
  `,
  statsContainer: css`
    display: flex;
    justify-content: space-between;
    gap: 20px;
    max-width: 75%;
  `,
  statColumn: css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  `,
  statLabel: css`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: ${theme.typography.body.fontSize};
    font-weight: ${theme.typography.body.fontWeight};
  `,
  statValue: css`
    font-size: ${theme.typography.h1.fontSize};
    font-weight: ${theme.typography.h1.fontWeight};
    padding-left: 22px;
  `,
  checkIcon: css`
    color: ${theme.colors.semantic.success};
  `,
  clockIcon: css`
    color: ${theme.colors.semantic.textLite};
  `,
  targetIcon: css`
    color: ${theme.colors.semantic.info};
  `,
};

export const BurndownSummary: React.FC<Props> = ({ name, summary, color }) => {
  const { completed, remaining, total, percentage } = summary;

  return (
    <div className={styles.card}>
      <div className={styles.progressBarContainer}>
        <div className={styles.progressBar} style={{ width: `${percentage}%`, backgroundColor: `${color}` }} />
      </div>

      <div className={styles.header}>
        <h2 className={styles.title}>{name}</h2>
        <div className={styles.percentage}>{percentage}%</div>
      </div>

      <div className={styles.statsContainer}>
        <div className={styles.statColumn}>
          <div className={styles.statLabel}>
            <span className={styles.checkIcon}>
              <Icon name="Check" />
            </span>{' '}
            Completed
          </div>
          <div className={styles.statValue}>{completed}</div>
        </div>

        <div className={styles.statColumn}>
          <div className={styles.statLabel}>
            <span className={styles.clockIcon}>
              <Icon name="Schedule" />
            </span>{' '}
            Remaining
          </div>
          <div className={styles.statValue}>{remaining}</div>
        </div>

        <div className={styles.statColumn}>
          <div className={styles.statLabel}>
            <span className={styles.targetIcon}>
              <Icon name="IssueTypeObjective" />
            </span>{' '}
            Total
          </div>
          <div className={styles.statValue}>{total}</div>
        </div>
      </div>
    </div>
  );
};
