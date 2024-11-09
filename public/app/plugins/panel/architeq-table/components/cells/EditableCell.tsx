import { css } from '@emotion/css';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';

import { GrafanaTheme2 } from '@grafana/data';
import { CustomCellRendererProps, IconButton, useStyles2 } from '@grafana/ui';

import { LoadingMode } from '../../constants';
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
      text-align: right;
      background-color: transparent;
      border-bottom: 1px solid;
      outline: none;
    `,
    inputButtons: css`
      width: 25px;
    `,
  };
};

export const EditableCell = (props: CustomCellRendererProps) => {
  const styles = useStyles2(getStyles);
  const cellRef = useRef<HTMLDivElement>(null);
  const [parentWidth, setParentWidth] = useState<number | undefined>(undefined);
  const initialValue = Number(props.value);
  const seriesIndex = Number(props.field.state?.seriesIndex);
  const [value, setValue] = React.useState<number | string>(initialValue);
  const rowIndex = props.rowIndex;
  const { addItem, removeItem, hasItem, updateData, loading } = useDataTableContext();

  useEffect(() => {
    if (cellRef.current) {
      const parentParentElement = cellRef.current.parentElement?.parentElement;
      if (parentParentElement) {
        setParentWidth(parentParentElement.offsetWidth);
      }
    }
  }, [cellRef.current]);

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
    const isUpdated = await updateData(Number(value), props);
    if (isUpdated) {
      handleClose();
    }
  };

  return hasItem(seriesIndex, rowIndex) ? (
    <div className={styles.inputCell}>
      <input
        className={styles.input}
        style={{ width: `calc(${parentWidth}px - 55px)` }}
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
    <div className={styles.cell} ref={cellRef}>
      {value} <IconButton aria-label="Edit" size="xs" name="edit" onClick={handleEdit} />
    </div>
  );
};
