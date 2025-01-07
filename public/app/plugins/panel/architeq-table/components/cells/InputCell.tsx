import { css } from '@emotion/css';
import React, { ChangeEvent, forwardRef } from 'react';

import { GrafanaTheme2 } from '@grafana/data';
import { CustomCellRendererProps, IconButton, useStyles2 } from '@grafana/ui';

import { LoadingMode } from '../../constants';
import { useParentWidth } from '../../hooks/useParentWidth';
import { CellCustomOptionsType, FieldValidation, FieldValidationType } from '../../types';
import { useDataTableContext } from '../DataTable/DataTableContext';

const getStyles = (_: GrafanaTheme2) => ({
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
});

const InputCellEditor = ({
  value,
  fieldType,
  valueType,
  onSave,
  onClose,
  onChange,
  error,
  isLoading,
  width,
  align,
}: {
  value: string | number;
  field: any;
  fieldType: string;
  valueType?: string;
  onSave: () => void;
  onClose: () => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error: string;
  isLoading: boolean;
  width: number;
  align: 'left' | 'right' | 'center';
}) => {
  const styles = useStyles2(getStyles);
  const inputType = fieldType === 'number' || valueType === 'numberWithDecimal' ? 'number' : 'text';

  return (
    <div className={styles.inputCell}>
      <input
        className={styles.input}
        style={{ width, textAlign: align }}
        value={value}
        onChange={onChange}
        disabled={isLoading}
        type={inputType}
      />
      <IconButton name="check" size="xs" onClick={onSave} disabled={!!error || isLoading} tooltip={error || 'Save'} />
      <IconButton name="times" size="xs" tooltip="Close" onClick={onClose} />
    </div>
  );
};

const InputCellDisplay = forwardRef<HTMLDivElement, { value: string | number; onEdit: () => void }>(
  ({ value, onEdit }, ref) => {
    const styles = useStyles2(getStyles);

    return (
      <div className={styles.cell} ref={ref}>
        {value} <IconButton aria-label="Edit" size="xs" name="edit" onClick={onEdit} />
      </div>
    );
  }
);
InputCellDisplay.displayName = 'InputCellDisplay';

const useValidation = (validationRules: FieldValidationType[], valueType?: string) => {
  const validate = (value: string | number): string => {
    if (!validationRules) {
      return '';
    }
    for (const rule of validationRules) {
      switch (rule.type) {
        case FieldValidation.MAX:
          if ((valueType === 'numberWithDecimal' || typeof value === 'number') && !isNaN(Number(value))) {
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

  return { validate };
};

export const InputCell = (props: CustomCellRendererProps) => {
  const { field, rowIndex, value } = props;
  const { parentWidth, ref } = useParentWidth();
  const cellWidth = parentWidth - 55;

  const fieldType = field.type;
  const customOptions = field.config.custom as CellCustomOptionsType;
  const valueType = customOptions?.valueType;
  const align = customOptions?.align || 'left';

  const initialValue = valueType === 'numberWithDecimal' && typeof value === 'number' ? value.toFixed(2) : value;

  const seriesIndex = Number(field.state?.seriesIndex);
  const [inputValue, setInputValue] = React.useState<any>(initialValue);
  const [error, setError] = React.useState<string>('');
  const { addItem, removeItem, hasItem, loading, updateData } = useDataTableContext();

  const { validate } = useValidation(customOptions?.validation || [], valueType);

  const handleEdit = () => addItem(seriesIndex, rowIndex);
  const handleClose = () => {
    removeItem(seriesIndex, rowIndex);
    setError('');
    setInputValue(initialValue);
  };

  const handleSave = async () => {
    if (error || !updateData) {
      return;
    }
    const finalValue = valueType === 'numberWithDecimal' ? parseFloat(inputValue) : inputValue;
    const isUpdated = await updateData(finalValue, props);
    if (isUpdated) {
      handleClose();
    }
  };

  const handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setInputValue(value);
    setError(validate(value));
  };

  return hasItem(seriesIndex, rowIndex) ? (
    <InputCellEditor
      value={inputValue}
      field={field}
      fieldType={fieldType}
      valueType={valueType}
      onSave={handleSave}
      onClose={handleClose}
      onChange={handleChange}
      error={error}
      isLoading={loading !== LoadingMode.NONE}
      width={cellWidth}
      align={align}
    />
  ) : (
    <InputCellDisplay value={inputValue} onEdit={handleEdit} ref={ref} />
  );
};
