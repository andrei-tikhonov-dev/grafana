import React, { useState } from 'react';

import { Button, Modal } from '@grafana/ui';

import { FilterInputWrapper } from '../../components/FilterInputWrapper';

import { AddHolidaysForm } from './AddHolidaysForm';
import { TeamHolidaysToolCreateTableType } from './types';

interface Props {
  onHandleCreate: (data: TeamHolidaysToolCreateTableType) => void;
}

export const AddHolidayButton: React.FC<Props> = ({ onHandleCreate }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleAddUserClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <FilterInputWrapper>
        <Button onClick={handleAddUserClick}>Add holiday</Button>
      </FilterInputWrapper>
      {isModalOpen && (
        <Modal title="Add holiday" isOpen={isModalOpen} onDismiss={handleCloseModal}>
          <AddHolidaysForm onClose={handleCloseModal} onCreate={onHandleCreate} />
        </Modal>
      )}
    </>
  );
};
