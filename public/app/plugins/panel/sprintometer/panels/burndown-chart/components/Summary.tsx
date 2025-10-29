import { css } from '@emotion/css';
import React from 'react';

import { UiHorizontalGroup, UiIcon, UiTypography, UiVerticalGroup } from '../../../components/ui';
import { IconName } from '../../../components/ui/icon/types';
import { roundedBordersStyles, theme3 } from '../../../theme';
import { MSummary } from '../types';

interface Props {
  name: string;
  summary: MSummary;
  color: string;
}

const styles = {
  card: css`
    flex: 1 1 auto;
    padding: 16px;
    ${roundedBordersStyles}
  `,
  progressBarContainer: css`
    width: 100%;
    height: 8px;
    background-color: ${theme3.shadcn.border};
    border-radius: ${theme3.tailwind.radiusSm};
  `,
  progressBar: css`
    height: 100%;
    border-radius: ${theme3.tailwind.radiusSm};
  `,
  statsContainer: css`
    max-width: 75%;
  `,
  icons: {
    check: css`
      color: ${theme3.tailwind.colorGreen600};
    `,
    clock: css`
      color: ${theme3.shadcn.mutedForeground};
    `,
    target: css`
      color: ${theme3.tailwind.colorBlue600};
    `,
  },
};

export const Summary: React.FC<Props> = ({ name, summary, color }) => {
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
    <UiVerticalGroup align="start" className={styles.card}>
      <UiHorizontalGroup
        justify="space-between"
        className={css`
          width: 100%;
        `}
      >
        <UiTypography variant="title" as="span">
          {name}
        </UiTypography>
        <UiTypography variant="title" as="span">
          {percentage}%
        </UiTypography>
      </UiHorizontalGroup>

      <div className={styles.progressBarContainer}>
        <div className={styles.progressBar} style={{ width: `${percentage}%`, backgroundColor: color }} />
      </div>

      <UiHorizontalGroup justify="space-between" gap="lg">
        {stats.map(({ icon, label, value }) => (
          <UiHorizontalGroup key={label}>
            <UiHorizontalGroup gap="xs">
              <UiIcon className={icon.style} name={icon.name as IconName} />
              <UiHorizontalGroup gap="xs" align="baseline">
                <UiTypography as="span" variant="body" color="light">
                  {label}:
                </UiTypography>
                <UiTypography as="span" variant="h4">
                  {value}
                </UiTypography>
              </UiHorizontalGroup>
            </UiHorizontalGroup>
          </UiHorizontalGroup>
        ))}
      </UiHorizontalGroup>
    </UiVerticalGroup>
  );
};
