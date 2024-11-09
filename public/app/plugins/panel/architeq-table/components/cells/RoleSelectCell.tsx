import { css } from '@emotion/css';
import React from 'react';

import { GrafanaTheme2 } from '@grafana/data';
import { CustomCellRendererProps, IconButton, Select, useStyles2 } from '@grafana/ui';

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
    selectCell: css`
      display: flex;
      align-items: center;
      gap: 6px;
      width: 100%;
      height: 24px;
      padding: 0;
    `,
    select: css`
      width: calc(100% - 30px);
    `,
  };
};

export const RoleSelectCell = (props: CustomCellRendererProps) => {
  const { field, rowIndex, value } = props;
  const styles = useStyles2(getStyles);
  const { ref } = useParentWidth();
  const seriesIndex = Number(field.state?.seriesIndex);
  const { addItem, removeItem, hasItem, loading, updateData } = useDataTableContext();

  const { currentRoleId, availableRoles } = value as any;

  const options = React.useMemo(
    () =>
      availableRoles.map((role: any) => ({
        label: role.name,
        value: role.id,
      })),
    [availableRoles]
  );

  const [selectedOption, setSelectedOption] = React.useState(
    options.find((option: any) => option.value === currentRoleId)
  );

  React.useEffect(() => {
    setSelectedOption(options.find((option: any) => option.value === currentRoleId));
  }, [currentRoleId, options]);

  const handleEdit = () => {
    addItem(seriesIndex, rowIndex);
  };

  const handleClose = () => {
    removeItem(seriesIndex, rowIndex);
  };

  const handleSelectChange = async (option: any) => {
    setSelectedOption(option);
    if (!updateData) {
      return;
    }
    const isUpdated = await updateData(option.value, props);
    if (isUpdated) {
      handleClose();
    }
  };

  return hasItem(seriesIndex, rowIndex) ? (
    <div className={styles.selectCell}>
      <div className={styles.select}>
        <Select
          value={selectedOption}
          onChange={handleSelectChange}
          options={options}
          disabled={loading !== LoadingMode.NONE}
        />
      </div>
      <IconButton name="times" size="xs" tooltip="Close" onClick={handleClose} />
    </div>
  ) : (
    <div className={styles.cell} ref={ref}>
      {selectedOption ? selectedOption.label : 'Select role '}
      <IconButton aria-label="Edit" size="xs" name="edit" onClick={handleEdit} />
    </div>
  );
};
