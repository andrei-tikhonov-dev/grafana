import { css } from '@emotion/css';
import React from 'react';

import { GrafanaTheme2 } from '@grafana/data';
import { useStyles2, IconName, Icon, Tooltip } from '@grafana/ui';

import { EditableValue } from './EditableValue';

const getStyles = (theme: GrafanaTheme2) => {
  return {
    card: css`
      background-color: ${theme.colors.background.secondary};
      padding: 12px 16px;
      border-radius: 6px;
    `,
    main: css`
      display: flex;
      gap: 0;
      justify-content: space-evenly;
    `,
    icon: css`
      color: ${theme.colors.error.text};
    `,
    attentionIcon: css`
      color: ${theme.colors.warning.text};
    `,
    title: css`
      gap: 5px;
      display: flex;
      align-items: center;
    `,
  };
};

interface Props {
  title: string;
  icon: IconName;
  firstValue: number;
  secondValue: number;
  firstLabel: string;
  secondLabel: string;
  valuesAreNotEqualAttention?: string;
  firstValueEditable?: boolean;
  secondValueEditable?: boolean;
  onValueUpdate?: (values: { firstValue?: number; secondValue?: number }) => void;
}

export const InfoCard: React.FC<Props> = ({
  title,
  icon,
  firstValue,
  secondValue,
  firstLabel,
  secondLabel,
  firstValueEditable = false,
  secondValueEditable = false,
  onValueUpdate,
  valuesAreNotEqualAttention,
}) => {
  const styles = useStyles2(getStyles);
  const hasWarning = firstValue !== secondValue && valuesAreNotEqualAttention;

  const handleFirstValueChange = (newValue: number) => {
    onValueUpdate?.({ firstValue: newValue });
  };

  const handleSecondValueChange = (newValue: number) => {
    onValueUpdate?.({ secondValue: newValue });
  };

  return (
    <div className={styles.card}>
      <div className={styles.title}>
        <span className={styles.icon}>
          <Icon name={icon} size="lg" />
        </span>
        <span>{title}</span>
        {hasWarning && (
          <Tooltip content={valuesAreNotEqualAttention} placement="top">
            <span className={styles.attentionIcon}>
              <Icon name="exclamation-circle" size="lg" />
            </span>
          </Tooltip>
        )}
      </div>

      <div className={styles.main}>
        <EditableValue
          value={firstValue}
          label={firstLabel}
          editable={firstValueEditable}
          onValueChange={handleFirstValueChange}
        />
        <EditableValue
          value={secondValue}
          label={secondLabel}
          editable={secondValueEditable}
          onValueChange={handleSecondValueChange}
        />
      </div>
    </div>
  );
};
