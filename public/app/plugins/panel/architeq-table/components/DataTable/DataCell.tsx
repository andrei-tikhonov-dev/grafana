import { css } from '@emotion/css';
import React, { ChangeEvent } from 'react';

import { CustomCellRendererProps, IconButton, Input, useStyles2 } from '@grafana/ui';

import { LoadingMode } from '../../constants';

import { useDataCellContext } from './DataCellContext';

const getStyles = () => {
  return {
    cell: css`
      cursor: pointer;
    `,
    inputCell: css`
      display: flex;
      align-items: center;
      gap: 8px;
    `,
  };
};

export const DataCell = (props: CustomCellRendererProps) => {
  const styles = useStyles2(getStyles);
  const initialValue = Number(props.value);
  const seriesIndex = Number(props.field.state?.seriesIndex);
  const [value, setValue] = React.useState<number | string>(initialValue);
  const rowIndex = props.rowIndex;
  const { addItem, removeItem, hasItem, updateData, loading } = useDataCellContext();

  const handleEdit = () => {
    addItem(seriesIndex, rowIndex);
  };

  const handleClose = () => {
    removeItem(seriesIndex, rowIndex);
  };

  const handleSave = async () => {
    const isUpdated = await updateData(Number(value), props);
    if (isUpdated) {
      handleClose();
    }
  };

  return hasItem(seriesIndex, rowIndex) ? (
    <div className={styles.inputCell}>
      <Input
        width={8}
        value={value}
        onChange={({ target: { value } }: ChangeEvent<HTMLInputElement>) => setValue(value)}
        disabled={loading !== LoadingMode.NONE}
        type="number"
      />
      <IconButton name="check" size="xs" tooltip="Save" onClick={handleSave} />
      <IconButton name="times" size="xs" tooltip="Close" onClick={handleClose} />
    </div>
  ) : (
    <div onClick={handleEdit} className={styles.cell}>
      {value}
    </div>
  );
};
