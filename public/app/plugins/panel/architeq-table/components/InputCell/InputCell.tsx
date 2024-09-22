import { css } from '@emotion/css';
import React, { ChangeEvent } from 'react';

import { GrafanaTheme2 } from '@grafana/data';
import { CustomCellRendererProps, IconButton, useStyles2 } from '@grafana/ui';

import { LoadingMode } from '../../constants';
import { useParentWidth } from '../../hooks/useParentWidth';
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
  const { addItem, removeItem, hasItem, loading, updateData } = useDataTableContext();
  const cellWidth = parentWidth - 55;
  const handleEdit = () => {
    addItem(seriesIndex, rowIndex);
  };

  const handleClose = () => {
    removeItem(seriesIndex, rowIndex);
  };

  const handleSave = async () => {
    if (!updateData) {
      return;
    }
    const isUpdated = await updateData(inputValue, props);
    if (isUpdated) {
      handleClose();
    }
  };

  return hasItem(seriesIndex, rowIndex) ? (
    <div className={styles.inputCell}>
      <input
        className={styles.input}
        style={{ width: cellWidth }}
        value={inputValue}
        onChange={({ target: { value } }: ChangeEvent<HTMLInputElement>) => setInputValue(value)}
        disabled={loading !== LoadingMode.NONE}
        type={fieldType === 'number' ? 'number' : 'text'}
      />
      <IconButton name="check" size="xs" tooltip="Save" onClick={handleSave} />
      <IconButton name="times" size="xs" tooltip="Close" onClick={handleClose} />
    </div>
  ) : (
    <div className={styles.cell} ref={ref}>
      {inputValue} <IconButton aria-label="Edit" size="xs" name="edit" onClick={handleEdit} />
    </div>
  );
};
