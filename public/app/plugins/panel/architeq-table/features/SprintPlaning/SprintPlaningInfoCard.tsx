import { css } from '@emotion/css';
import React, { ChangeEvent, useState } from 'react';

import { GrafanaTheme2 } from '@grafana/data';
import { Icon, IconButton, Tooltip, useStyles2 } from '@grafana/ui';

import { LoadingMode } from '../../constants';

import { SprintPlaningInfoType } from './types';

const iconArrow =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzgiIGhlaWdodD0iMzciIHZpZXdCb3g9IjAgMCAzOCAzNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTM3LjAyNDcgMTkuNTkwMkwyMC4yMTc1IDM2LjM5NzVDMTkuOTMxOCAzNi42ODQ4IDE5LjU0MzcgMzYuODQ1MiAxOS4xMzczIDM2Ljg0NTJIMi4zMjk5OUMxLjcxMjY4IDM2Ljg0NTIgMS4xNTM0NiAzNi40NzM5IDAuOTE4MTgxIDM1LjkwMjVDMC42ODEzMjggMzUuMzMxIDAuODEyNzU0IDM0LjY3NCAxLjI0OTcyIDM0LjIzN0wxNi45NzY3IDE4LjUxTDEuMjQ5NzkgMi43ODI5OEMwLjgxMjgyNiAyLjM0NjAyIDAuNjgxNCAxLjY4ODk2IDAuOTE4MjUzIDEuMTE3NTZDMS4xNTM1MyAwLjU0NjA5IDEuNzEyNzUgMC4xNzQ4MDQgMi4zMzAwNiAwLjE3NDgwNEgxOS4xMzczQzE5LjU0MzggMC4xNzQ4MDQgMTkuOTMxOCAwLjMzNTIzNSAyMC4yMTc2IDAuNjIyNTFMMzcuMDI0OSAxNy40Mjk4QzM3LjYyMjIgMTguMDI3MiAzNy42MjIyIDE4Ljk5MjggMzcuMDI0NyAxOS41OTAyWiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==';

const getStyles = (theme: GrafanaTheme2) => {
  return {
    container: css`
      background-color: ${theme.colors.background.canvas};
      border-radius: 8px;
      padding: 16px;
    `,

    tableContainer: css`
      display: grid;
      grid-template-columns: 1fr 60px 1fr;
      width: 100%;
    `,

    tableTitle: css`
      font-size: ${theme.typography.h4.fontSize};
      font-weight: bold;
    `,

    item: css`
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
      gap: 8px;
      padding: 0;
      font-size: ${theme.typography.h5.fontSize};
    `,

    icon: css`
      color: ${theme.colors.border.medium};
    `,

    description: css`
      text-wrap: nowrap;
      font-size: ${theme.typography.bodySmall.fontSize};
      color: ${theme.colors.text.secondary};
    `,

    value: css`
      font-size: ${theme.typography.h1.fontSize};
      line-height: ${theme.typography.h1.lineHeight};
      display: flex;
      gap: 8px;
    `,

    input: css`
      font-size: ${theme.typography.h1.fontSize};
      background: none;
      border-bottom: 1px solid ${theme.colors.border.medium};
      outline: none;
      max-width: 110px;
      padding: 0;
      margin-top: -1px;
      text-align: right;
      line-height: ${theme.typography.h1.lineHeight};
    `,

    warning: css`
      color: ${theme.colors.warning.text};
      padding-left: 8px;
    `,

    cell: css`
      width: 100%;
      padding: 0;
    `,

    cellRow: css`
      display: contents;
    `,

    cellWhiteBackground: css`
      background-color: ${theme.colors.background.primary};
    `,

    cellLeftAligned: css`
      text-align: left;
    `,

    cellCentered: css`
      justify-self: center;
      text-align: center;
    `,

    cellWithIcon: css`
      display: flex;
      justify-content: center;
      align-items: center;
      background-image: url(${iconArrow});
      background-repeat: no-repeat;
      background-position: center;
    `,

    cellContainer: css`
      padding: 4px 16px;
    `,
  };
};

interface Props extends SprintPlaningInfoType {
  onUpdate?: (value?: number) => void;
  valuesAreNotEqualAttention?: string;
  loading?: LoadingMode;
}

export const SprintPlaningInfoCard: React.FC<Props> = ({
  storyPointsAssigned,
  storyPointsAvailable,
  personDaysReported,
  personDaysScheduled,
  valuesAreNotEqualAttention,
  teamVelocityFactor,
  onUpdate,
  loading,
}) => {
  const styles = useStyles2(getStyles);
  const hasWarning = personDaysReported !== personDaysScheduled;
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(personDaysReported);

  const handleSave = () => {
    if (onUpdate) {
      onUpdate(value);
    }
    setIsEditing(false);
  };

  const handleClose = () => {
    setValue(personDaysReported);
    setIsEditing(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.tableContainer}>
        <div className={`${styles.cell} ${styles.cellLeftAligned}`}>
          <div className={styles.cellContainer}>
            <div className={styles.tableTitle}>
              Total Person-Days
              {hasWarning && valuesAreNotEqualAttention && (
                <span className={styles.warning}>
                  <Tooltip content={valuesAreNotEqualAttention} placement="top">
                    <Icon size="md" name="exclamation-triangle" />
                  </Tooltip>
                </span>
              )}
            </div>
          </div>
        </div>
        <div className={`${styles.cell} ${styles.cellCentered}`}>
          <div className={styles.cellContainer}> </div>
        </div>
        <div className={`${styles.cell} ${styles.cellLeftAligned}`}>
          <div className={styles.cellContainer}>
            <div className={styles.tableTitle}>
              <div>Total Story Points</div>
            </div>
          </div>
        </div>

        <div className={`${styles.cell} ${styles.cellLeftAligned} ${styles.cellWhiteBackground}`}>
          <div className={styles.cellContainer}>
            <div className={styles.item}>
              <span className={styles.icon}>
                <Icon size="xl" name="calendar-alt" />
              </span>
              <span>Scheduled</span>
              <span className={styles.value}>{personDaysScheduled}</span>
            </div>
            <div className={styles.description}>Team's total PD from calendar</div>
          </div>
        </div>
        <div className={`${styles.cell} ${styles.cellCentered} ${styles.cellWhiteBackground}`}>
          <div className={styles.cellContainer}></div>
        </div>
        <div className={`${styles.cell} ${styles.cellLeftAligned} ${styles.cellWhiteBackground}`}>
          <div className={styles.cellContainer}>
            <div className={styles.item}>
              <span className={styles.icon}>
                <Icon size="xl" name="users-alt" />
              </span>
              <span>Assigned</span>
              <span className={styles.value}>{storyPointsAssigned}</span>
            </div>
            <div className={styles.description}>Sum of estimated task SP from JIRA</div>
          </div>
        </div>

        <div className={`${styles.cell} ${styles.cellLeftAligned}`}>
          <div className={styles.cellContainer}>
            <div className={styles.item}>
              <span className={styles.icon}>
                <Icon size="xl" name="document-info" />
              </span>
              <span>Reported</span>
              {isEditing ? (
                <div className={styles.value}>
                  <input
                    className={styles.input}
                    value={value}
                    onChange={({ target: { value } }: ChangeEvent<HTMLInputElement>) => setValue(Number(value))}
                    disabled={loading !== LoadingMode.NONE}
                    type="number"
                  />
                  <IconButton name="check" size="md" tooltip="Save" onClick={handleSave} />
                  <IconButton name="times" size="md" tooltip="Close" onClick={handleClose} />
                </div>
              ) : (
                <div>
                  <div className={styles.value}>
                    {personDaysReported}
                    <IconButton name="edit" size="md" tooltip="Edit" onClick={() => setIsEditing(true)} />
                  </div>
                </div>
              )}
            </div>
            <div className={styles.description}>Confirmed or adjusted team PD</div>
          </div>
        </div>
        <div className={`${styles.cell} ${styles.cellCentered} ${styles.cellWithIcon}`}>
          <div className={styles.cellContainer}></div>
        </div>
        <div className={`${styles.cell} ${styles.cellLeftAligned}`}>
          <div className={styles.cellContainer}>
            <div className={styles.item}>
              <span className={styles.icon}>
                <Icon size="xl" name="clock-nine" />
              </span>
              <span>Available</span>
              <span className={styles.value}>{storyPointsAvailable}</span>
            </div>
            <div className={styles.description}>Reported PD × team velocity factor ({teamVelocityFactor} SP/PD)</div>
          </div>
        </div>
      </div>
    </div>
  );
};
