import { css } from '@emotion/css';
import React, { ChangeEvent, useState } from 'react';

import { GrafanaTheme2 } from '@grafana/data';
import { Checkbox, CustomCellRendererProps, useStyles2 } from '@grafana/ui';

import { LoadingMode } from '../../constants';
import { useDataTableContext } from '../DataTable/DataTableContext';

const getStyles = (_: GrafanaTheme2) => {
  return {
    cell: css``,
    checkbox: css``,
  };
};

export const CheckboxCell = (props: CustomCellRendererProps) => {
  const styles = useStyles2(getStyles);
  const initialValue = Boolean(props.value);
  const [checked, setChecked] = useState<boolean>(initialValue);
  const { updateData, loading } = useDataTableContext();

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const newChecked = event.target.checked;
    setChecked(newChecked);

    if (updateData) {
      await updateData(newChecked, props);
    }
  };

  return (
    <div className={styles.cell}>
      <Checkbox type="checkbox" checked={checked} onChange={handleChange} disabled={loading !== LoadingMode.NONE} />
    </div>
  );
};
