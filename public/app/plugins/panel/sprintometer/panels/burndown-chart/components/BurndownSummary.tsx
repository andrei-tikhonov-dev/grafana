import { css } from '@emotion/css';
import React from 'react';

import { UiIcon } from '../../../components/ui';
import { IconName } from '../../../components/ui/icon/types';
import { theme } from '../../../theme';
import { BurndownSummaryType } from '../types';

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
    padding: 16px;
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
    align-items: baseline;
  `,
  statLabel: css`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: ${theme.typography.body.fontSize};
    font-weight: ${theme.typography.body.fontWeight};
    color: ${theme.colors.semantic.textLite};
  `,
  statValue: css`
    font-size: ${theme.typography.h4.fontSize};
    font-weight: ${theme.typography.h4.fontWeight};
    padding-left: 8px;
  `,
  icons: {
    check: css`
      color: ${theme.colors.semantic.success};
    `,
    clock: css`
      color: ${theme.colors.semantic.textLite};
    `,
    target: css`
      color: ${theme.colors.semantic.info};
    `,
  },
};

export const BurndownSummary: React.FC<Props> = ({ name, summary, color }) => {
  const { completed, remaining, total, percentage } = summary;

  const stats = [
    {
      icon: { name: 'Check', style: styles.icons.check },
      label: 'Completed',
      value: completed,
    },
    {
      icon: { name: 'Schedule', style: styles.icons.clock },
      label: 'Remaining',
      value: remaining,
    },
    {
      icon: { name: 'IssueTypeObjective', style: styles.icons.target },
      label: 'Total',
      value: total,
    },
  ];

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>{name}</h2>
        <div className={styles.percentage}>{percentage}%</div>
      </div>

      <div className={styles.progressBarContainer}>
        <div className={styles.progressBar} style={{ width: `${percentage}%`, backgroundColor: color }} />
      </div>

      <div className={styles.statsContainer}>
        {stats.map(({ icon, label, value }) => (
          <div key={label} className={styles.statColumn}>
            <div className={styles.statLabel}>
              <span className={icon.style}>
                <UiIcon name={icon.name as IconName} />
              </span>
              {label}:
            </div>
            <div className={styles.statValue}>{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
