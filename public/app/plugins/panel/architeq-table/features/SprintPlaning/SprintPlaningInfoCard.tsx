import { css } from '@emotion/css';
import React, { ChangeEvent, useState } from 'react';

import { GrafanaTheme2 } from '@grafana/data';
import { Icon, IconButton, useStyles2 } from '@grafana/ui';

import { LoadingMode } from '../../constants';
import { Status } from '../../types';

import { SprintPlaningInfoStatus } from './SprintPlaningInfoStatus';
import { SprintPlaningInfoType } from './types';

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
      padding-right: 56px;
    `,

    editableValue: css`
      padding-right: 28px;
    `,

    inputValue: css`
      padding-right: 0;
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
      color: ${theme.colors.border.medium};
      margin-right: 30px;
    `,

    cellContainer: css`
      padding: 4px 16px;
    `,
  };
};

interface Props extends SprintPlaningInfoType {
  onUpdate?: (value?: number) => void;
  loading?: LoadingMode;
}

export const SprintPlaningInfoCard: React.FC<Props> = ({
  storyPointsAssigned,
  storyPointsAvailable,
  personDaysReported,
  personDaysScheduled,
  teamVelocityFactor,
  onUpdate,
  sprintStatus,
  loading,
}) => {
  const styles = useStyles2(getStyles);
  const hasPDWarning = personDaysReported !== personDaysScheduled;
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(personDaysReported);
  const totalStoryPointsInfo = sprintStatus.assignedAvailableRatioInfo;
  const totalPersonDaysInfo = {
    status: hasPDWarning ? Status.WARNING : Status.OK,
    message: 'Total person-days from calendar and reported values are inconsistent.',
  };

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
              <SprintPlaningInfoStatus
                title="Total Person-Days"
                status={totalPersonDaysInfo.status}
                message={totalPersonDaysInfo.message}
              />
            </div>
          </div>
        </div>
        <div className={`${styles.cell} ${styles.cellCentered}`}>
          <div className={styles.cellContainer}> </div>
        </div>
        <div className={`${styles.cell} ${styles.cellLeftAligned}`}>
          <div className={styles.cellContainer}>
            <SprintPlaningInfoStatus
              title="Total Story Points"
              status={totalStoryPointsInfo?.status}
              message={totalStoryPointsInfo?.message}
            />
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
            <div className={styles.description}>Team&apos;s total PD from calendar</div>
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
                <div className={`${styles.value} ${styles.inputValue}`}>
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
                  <div className={`${styles.value} ${styles.editableValue}`}>
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
          <div className={styles.cellContainer}>
            <Icon size="xxxl" name="arrow-right" />
          </div>
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
