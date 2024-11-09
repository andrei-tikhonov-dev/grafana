import { css } from '@emotion/css';
import React from 'react';

import { GrafanaTheme2 } from '@grafana/data';
import { CustomCellRendererProps, DatePickerWithInput, IconButton, useStyles2 } from '@grafana/ui';

import { LoadingMode } from '../../constants';
import { useParentWidth } from '../../hooks/useParentWidth';
import { convertDateToBE, convertDateToFE } from '../../utils';
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
      height: 26px;
      margin-top: -2px;
      margin-right: -2px;
    `,
    inputButtons: css`
      width: 25px;
    `,
  };
};

export const DateCell = (props: CustomCellRendererProps) => {
  const { field, rowIndex, value } = props;
  const styles = useStyles2(getStyles);
  const { parentWidth, ref } = useParentWidth();
  const seriesIndex = Number(field.state?.seriesIndex);
  const { addItem, removeItem, hasItem, loading, updateData } = useDataTableContext();
  const cellWidth = parentWidth - 55;

  const initialValue = value as string;
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

  const handleChange = (value: string) => {
    setInputValue(value);
  };

  return hasItem(seriesIndex, rowIndex) ? (
    <div className={styles.inputCell}>
      <div className={styles.input} style={{ width: cellWidth }}>
        <DatePickerWithInput
          disabled={loading !== LoadingMode.NONE}
          value={String(inputValue)}
          onChange={(newDate) => handleChange(String(newDate))}
        />
      </div>
      <IconButton name="check" size="xs" onClick={handleSave} disabled={loading !== LoadingMode.NONE} tooltip="Save" />
      <IconButton name="times" size="xs" tooltip="Close" onClick={handleClose} />
    </div>
  ) : (
    <div className={styles.cell} ref={ref}>
      {convertDateToFE(inputValue)} <IconButton aria-label="Edit" size="xs" name="edit" onClick={handleEdit} />
    </div>
  );
};
