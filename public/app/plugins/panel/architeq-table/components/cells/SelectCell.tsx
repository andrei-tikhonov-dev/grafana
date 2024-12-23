import { css } from '@emotion/css';
import React from 'react';

import { GrafanaTheme2, SelectableValue } from '@grafana/data';
import { CustomCellRendererProps, IconButton, Select, useStyles2 } from '@grafana/ui';

import { LoadingMode } from '../../constants';
import { useParentWidth } from '../../hooks/useParentWidth';
import { OptionType } from '../../types';
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
    selectWrapper: css`
      flex-grow: 1;
    `,
  };
};

export const SelectCell = (props: CustomCellRendererProps) => {
  const { field, rowIndex, value } = props;
  const styles = useStyles2(getStyles);
  const { parentWidth, ref } = useParentWidth();
  const seriesIndex = Number(field.state?.seriesIndex);
  const { addItem, removeItem, hasItem, loading, updateData } = useDataTableContext();

  const options = field.config.custom?.options as OptionType[] | [];

  const initialValue = (value as string) || '';
  const [inputValue, setInputValue] = React.useState<string>(initialValue);
  const [error, setError] = React.useState<string>('');
  const cellWidth = parentWidth - 55;

  const handleEdit = () => {
    addItem(seriesIndex, rowIndex);
  };

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

  const currentOption = options.find((opt) => opt.value === String(inputValue));
  const displayName = currentOption ? currentOption.label : 'Select';

  return hasItem(seriesIndex, rowIndex) ? (
    <div className={styles.inputCell}>
      <div className={styles.selectWrapper} style={{ width: cellWidth }}>
        <Select
          isSearchable={false}
          options={options}
          value={currentOption || null}
          onChange={(v: SelectableValue<string>) => setInputValue(v.value ?? '')}
          isDisabled={loading !== LoadingMode.NONE}
          placeholder="Select an option"
        />
      </div>
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
      {displayName} <IconButton aria-label="Edit" size="xs" name="edit" onClick={handleEdit} />
    </div>
  );
};
