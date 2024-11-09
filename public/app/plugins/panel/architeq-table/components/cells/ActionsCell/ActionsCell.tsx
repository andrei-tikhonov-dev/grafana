import React, { useState } from 'react';

import { IconButton, ConfirmModal, CustomCellRendererProps } from '@grafana/ui';

interface ActionsCellProps extends CustomCellRendererProps {
  handleDelete: (rowIndex: number) => void;
}

export const ActionsCell: React.FC<ActionsCellProps> = ({ rowIndex, handleDelete }) => {
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
