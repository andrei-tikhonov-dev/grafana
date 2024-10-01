import { css } from '@emotion/css';
import React, { ChangeEvent } from 'react';

import { GrafanaTheme2 } from '@grafana/data';
import { CustomCellRendererProps, IconButton, useStyles2 } from '@grafana/ui';

import { LoadingMode } from '../../constants';
import { useParentWidth } from '../../hooks/useParentWidth';
import { FieldValidation, FieldValidationType } from '../../types';
import { useDataTableContext } from '../DataTable/DataTableContext';

const getStyles = (_: GrafanaTheme2) => {
  return {
    cell: css`
      display: flex;
      align-items: center;
      gap: 10px;
    `,
    inputCell: css`
      display: flex;
      align-items: center;
      gap: 6px;
    `,
    input: css`
      height: 25px;
      text-align: left;
      background-color: transparent;
      border-bottom: 1px solid;
      outline: none;
    `,
    inputButtons: css`
      width: 25px;
    `,
  };
};

export const InputCell = (props: CustomCellRendererProps) => {
  const { field, rowIndex, value } = props;
  const styles = useStyles2(getStyles);
  const { parentWidth, ref } = useParentWidth();
  const fieldType = field.type;
  const initialValue = value as number | string;
  const seriesIndex = Number(field.state?.seriesIndex);
  const [inputValue, setInputValue] = React.useState<number | string>(initialValue);
  const [error, setError] = React.useState<string>('');
  const { addItem, removeItem, hasItem, loading, updateData } = useDataTableContext();
  const cellWidth = parentWidth - 55;
  const handleEdit = () => {
    addItem(seriesIndex, rowIndex);
  };

  const validationRules = props.field.config.custom?.validation as FieldValidationType[];

  const handleClose = () => {
    removeItem(seriesIndex, rowIndex);
    setError('');
    setInputValue(initialValue);
  };

  const handleSave = async () => {
    if (error) {
      return;
    }
    if (!updateData) {
      return;
    }
    const isUpdated = await updateData(inputValue, props);
    if (isUpdated) {
      handleClose();
    }
  };

  const validateInput = (value: string | number): string => {
    if (!validationRules) {
      return '';
    }
    for (const rule of validationRules) {
      switch (rule.type) {
        case FieldValidation.MAX:
          if (typeof value === 'number' || !isNaN(Number(value))) {
            const numValue = typeof value === 'number' ? value : Number(value);
            if (rule.value !== undefined && numValue > rule.value) {
              return `Cannot save because value should be less than or equal to ${rule.value}`;
            }
          }
          break;
        case FieldValidation.EMAIL:
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (typeof value === 'string' && !emailRegex.test(value)) {
            return 'Cannot save because the email address is invalid';
          }
          break;
        default:
          break;
      }
    }
    return '';
  };

  const handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setInputValue(value);
    const errorMessage = validateInput(value);
    setError(errorMessage);
  };

  return hasItem(seriesIndex, rowIndex) ? (
    <div className={styles.inputCell}>
      <input
        className={styles.input}
        style={{ width: cellWidth }}
        value={inputValue}
        onChange={handleChange}
        disabled={loading !== LoadingMode.NONE}
        type={fieldType === 'number' ? 'number' : 'text'}
      />
      <IconButton
        name="check"
        size="xs"
        onClick={handleSave}
        disabled={!!error || loading !== LoadingMode.NONE}
        tooltip={error || 'Save'}
      />
      <IconButton name="times" size="xs" tooltip="Close" onClick={handleClose} />
    </div>
  ) : (
    <div className={styles.cell} ref={ref}>
      {inputValue} <IconButton aria-label="Edit" size="xs" name="edit" onClick={handleEdit} />
    </div>
  );
};
