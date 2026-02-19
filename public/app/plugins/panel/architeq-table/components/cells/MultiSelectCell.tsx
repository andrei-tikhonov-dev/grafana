import { css } from '@emotion/css';
import React, { useState } from 'react';

import { GrafanaTheme2, SelectableValue } from '@grafana/data';
import { Checkbox, CustomCellRendererProps, IconButton, Modal, useStyles2 } from '@grafana/ui';

import { LoadingMode } from '../../constants';
import { useParentWidth } from '../../hooks/useParentWidth';
import { useDataTableContext } from '../DataTable/DataTableContext';
import { FormFooter } from '../FormFooter';

const getStyles = (theme: GrafanaTheme2) => ({
  cell: css`
    display: flex;
    align-items: center;
    gap: 10px;
  `,
  form: css`
    display: flex;
    flex-direction: column;
    gap: 16px;
  `,
  checkboxList: css`
    align-items: flex-start;
    border: 1px solid ${theme.colors.border.weak};
    border-radius: ${theme.shape.radius.default};
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 12px;
  `,
});

export const MultiSelectCell: React.FC<CustomCellRendererProps> = (props) => {
  const { value, field } = props;
  const styles = useStyles2(getStyles);
  const { ref } = useParentWidth();
  const { updateData, loading } = useDataTableContext();

  const options: Array<SelectableValue<string>> = field.config.custom?.options ?? [];
  const currentValues: string[] = Array.isArray(value) ? value : [];
  const [isModalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>(currentValues);

  const displayText = currentValues.length === 0 ? 'All' : currentValues.join(', ');

  const handleEdit = () => {
    setSelected(currentValues);
    setModalOpen(true);
  };
  const handleClose = () => setModalOpen(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await updateData?.(selected, props);
    if (ok) {
      handleClose();
    }
  };

  const toggleOption = (val: string) => {
    setSelected((prev) => (prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]));
  };

  return (
    <>
      <div className={styles.cell} ref={ref}>
        {displayText} <IconButton aria-label="Edit" size="xs" name="edit" onClick={handleEdit} />
      </div>
      {isModalOpen && (
        <Modal title={`Edit ${field.name}`} isOpen onDismiss={handleClose}>
          <form onSubmit={handleSave} className={styles.form}>
            <div className={styles.checkboxList}>
              {options.map((opt) => (
                <Checkbox
                  key={String(opt.value)}
                  label={String(opt.label ?? opt.value)}
                  value={selected.includes(String(opt.value))}
                  onChange={() => toggleOption(String(opt.value))}
                />
              ))}
            </div>
            <FormFooter onClose={handleClose} submitLabel="Save" isLoading={loading !== LoadingMode.NONE} />
          </form>
        </Modal>
      )}
    </>
  );
};
