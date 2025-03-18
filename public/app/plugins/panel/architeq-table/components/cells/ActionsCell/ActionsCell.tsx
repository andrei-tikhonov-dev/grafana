import React, { useState } from 'react';

import { IconButton, ConfirmModal, CustomCellRendererProps } from '@grafana/ui';

import { CellCustomOptionsType } from '../../../types';

interface ActionsCellProps extends CustomCellRendererProps {
  handleDelete: (rowIndex: number) => void;
}

export const ActionsCell: React.FC<ActionsCellProps> = (props) => {
  const { rowIndex, handleDelete, field } = props;
  const customOptions = field.config.custom as CellCustomOptionsType;
  const isEditable = customOptions?.isEditable === undefined ? true : customOptions.isEditable(rowIndex);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onDeleteClick = () => {
    setIsModalOpen(true);
  };

  const onConfirmDelete = () => {
    handleDelete(rowIndex);
    setIsModalOpen(false);
  };

  const onCancelDelete = () => {
    setIsModalOpen(false);
  };

  if (!isEditable) {
    return null;
  }

  return (
    <>
      <IconButton name="trash-alt" size="md" onClick={onDeleteClick} aria-label="Delete" />
      {isModalOpen && (
        <ConfirmModal
          isOpen={isModalOpen}
          title="Confirm Deletion"
          body="Are you sure you want to delete this item?"
          confirmText="Delete"
          onConfirm={onConfirmDelete}
          onDismiss={onCancelDelete}
        />
      )}
    </>
  );
};
