import { css } from '@emotion/css';
import React, { useState } from 'react';

import { GrafanaTheme2 } from '@grafana/data';
import { IconButton, useStyles2 } from '@grafana/ui';

const getStyles = (theme: GrafanaTheme2) => {
  return {
    valueContainer: css`
      display: flex;
      flex-direction: column;
      align-items: center;
      min-width: 150px;
      &:first-of-type {
        border-right: 1px dotted ${theme.colors.border.strong};
      }
    `,
    value: css`
      font-size: ${theme.typography.h1.fontSize};
      height: 55px;
    `,
    label: css`
      font-size: ${theme.typography.body.fontSize};
      display: flex;
      gap: 5px;
    `,
    icon: css`
      color: ${theme.colors.error.text};
    `,
    iconEdit: css`
      color: ${theme.colors.warning.text};
    `,
    input: css`
      background-color: ${theme.colors.background.secondary};
      max-width: 110px;
      font-size: ${theme.typography.h1.fontSize};
      text-align: center;
      color: ${theme.colors.error.text};
      border-bottom: 1px solid;
    `,
  };
};

interface EditableValueProps {
  value: number;
  label: string;
  editable: boolean;
  onValueChange: (newValue: number) => void;
}

export const EditableValue: React.FC<EditableValueProps> = ({ value, label, editable, onValueChange }) => {
  const styles = useStyles2(getStyles);
  const [isEditing, setIsEditing] = useState(false);
  const [newValue, setNewValue] = useState(value);

  const handleConfirm = () => {
    onValueChange(newValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setNewValue(value);
    setIsEditing(false);
  };

  return (
    <div className={styles.valueContainer}>
      {isEditing ? (
        <div className={styles.value}>
          <input
            className={styles.input}
            value={newValue}
            onChange={(e) => setNewValue(Number(e.currentTarget.value))}
          />
        </div>
      ) : (
        <div className={styles.value}>{value}</div>
      )}
      <div className={styles.label}>
        <div>{label}</div>
        <div>
          {editable && !isEditing && (
            <IconButton
              variant="destructive"
              aria-label="Edit"
              name="edit"
              size="xs"
              onClick={() => setIsEditing(true)}
            />
          )}
          {isEditing && (
            <>
              <IconButton aria-label="Confirm" name="check" size="xs" onClick={handleConfirm} />
              <IconButton aria-label="Cancel" name="times" size="xs" onClick={handleCancel} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
