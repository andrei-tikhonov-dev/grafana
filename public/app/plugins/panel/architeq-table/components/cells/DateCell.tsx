import { css } from '@emotion/css';
import React from 'react';

import { GrafanaTheme2 } from '@grafana/data';
import { CustomCellRendererProps, DatePickerWithInput, IconButton, useStyles2 } from '@grafana/ui';

import { LoadingMode } from '../../constants';
import { convertDateToBE, convertDateToUI } from '../../utils';
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
    cellInput: css`
      width: 80px;
      flex-basis: 80px;
      flex-grow: 0;
      flex-shrink: 0;
    `,
    input: css`
      height: 24px;
      width: 90px;
      flex-basis: 90px;
      flex-grow: 0;
      flex-shrink: 0;
      margin-top: -4px;
      margin-right: -2px;
      margin-left: -6px;
    `,
    inputButtons: css`
      width: 25px;
    `,
  };
};

export const DateCell = (props: CustomCellRendererProps) => {
  const { field, rowIndex, value } = props;
  const styles = useStyles2(getStyles);
  const seriesIndex = Number(field.state?.seriesIndex);
  const { addItem, removeItem, hasItem, loading, updateData } = useDataTableContext();

  const initialValue = value ? new Date(value as string).toISOString() : '';
  const [inputValue, setInputValue] = React.useState<string>(initialValue);

  const handleEdit = () => {
    addItem(seriesIndex, rowIndex);
  };

  const handleClose = () => {
    removeItem(seriesIndex, rowIndex);
    setInputValue(initialValue);
  };

  const handleSave = async () => {
    if (!updateData) {
      return;
    }
    const isUpdated = await updateData(convertDateToBE(inputValue), props);
    if (isUpdated) {
      handleClose();
    }
  };

  const handleChange = (value: any) => {
    setInputValue(value);
  };

  return hasItem(seriesIndex, rowIndex) ? (
    <div className={styles.inputCell}>
      <div className={styles.input}>
        <DatePickerWithInput
          disabled={loading !== LoadingMode.NONE}
          value={inputValue}
          onChange={(newDate) => handleChange(newDate)}
        />
      </div>
      <IconButton name="check" size="xs" onClick={handleSave} disabled={loading !== LoadingMode.NONE} tooltip="Save" />
      <IconButton name="times" size="xs" tooltip="Close" onClick={handleClose} />
    </div>
  ) : (
    <div className={styles.cell}>
      <div className={styles.cellInput}>{convertDateToUI(inputValue)}</div>
      <IconButton aria-label="Edit" size="xs" name="edit" onClick={handleEdit} />
    </div>
  );
};
