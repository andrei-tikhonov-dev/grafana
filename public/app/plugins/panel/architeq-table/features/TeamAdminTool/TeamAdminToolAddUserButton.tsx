import React, { useState } from 'react';

import { Button, Modal } from '@grafana/ui';

import { FilterInputWrapper } from '../../components/FilterInputWrapper';
import { RoleType } from '../../types';

import { TeamAdminToolAddUserForm } from './TeamAdminToolAddUserForm';
import { TeamAdminToolCreateTableType } from './types';

interface Props {
  onHandleCreate: (data: TeamAdminToolCreateTableType) => void;
  roles: RoleType['availableRoles'];
  maxWorkload: number;
}

export const TeamAdminToolAddUserButton: React.FC<Props> = ({ onHandleCreate, roles, maxWorkload }) => {
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
        <Button onClick={handleAddUserClick}>Add team member</Button>
      </FilterInputWrapper>
      {isModalOpen && (
        <Modal title="Add team member" isOpen={isModalOpen} onDismiss={handleCloseModal}>
          <TeamAdminToolAddUserForm
            onClose={handleCloseModal}
            onCreate={onHandleCreate}
            roles={roles}
            maxWorkload={maxWorkload}
          />
        </Modal>
      )}
    </>
  );
};
