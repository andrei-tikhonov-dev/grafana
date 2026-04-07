import { css } from '@emotion/css';
import React, { useState } from 'react';

import { GrafanaTheme2 } from '@grafana/data';
import { CustomCellRendererProps, IconButton, Modal, Tooltip, useStyles2 } from '@grafana/ui';

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
  textarea: css`
    width: 100%;
    min-height: 150px;
    padding: 8px;
    border: 1px solid ${theme.colors.border.weak};
    border-radius: ${theme.shape.radius.default};
    background-color: ${theme.colors.background.primary};
    color: ${theme.colors.text.primary};
    font-size: ${theme.typography.body.fontSize};
    resize: vertical;

    &:focus {
      outline: none;
      border-color: ${theme.colors.primary.border};
    }
  `,
  displayText: css`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
});

export const TextAreaCell: React.FC<CustomCellRendererProps> = (props) => {
  const { value } = props;
  const styles = useStyles2(getStyles);
  const { ref } = useParentWidth();
  const { updateData, loading } = useDataTableContext();

  const currentValue = value != null ? String(value) : '';
  const [isModalOpen, setModalOpen] = useState(false);
  const [textValue, setTextValue] = useState(currentValue);

  const handleEdit = () => {
    setTextValue(currentValue);
    setModalOpen(true);
  };
  const handleClose = () => setModalOpen(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await updateData?.(textValue, props);
    if (ok) {
      handleClose();
    }
  };

  return (
    <>
      <div className={styles.cell} ref={ref}>
        <Tooltip content={currentValue} placement="top">
          <span className={styles.displayText}>{currentValue}</span>
        </Tooltip>
        <IconButton aria-label="Edit" size="xs" name="edit" onClick={handleEdit} />
      </div>
      {isModalOpen && (
        <Modal title={`Edit ${props.field.name}`} isOpen onDismiss={handleClose}>
          <form onSubmit={handleSave} className={styles.form}>
            <textarea
              className={styles.textarea}
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
              autoFocus
            />
            <FormFooter onClose={handleClose} submitLabel="Save" isLoading={loading !== LoadingMode.NONE} />
          </form>
        </Modal>
      )}
    </>
  );
};
