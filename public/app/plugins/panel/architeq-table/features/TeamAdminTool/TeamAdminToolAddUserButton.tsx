import React, { useState } from 'react';

import { Button, Modal } from '@grafana/ui';

import { FilterInputWrapper } from '../../components/FilterInputWrapper';

import { TeamAdminToolAddUserForm } from './TeamAdminToolAddUserForm';
import { TeamAdminToolCreateTableType, TeamAdminToolRoleType } from './types';

interface Props {
  onHandleCreate: (data: TeamAdminToolCreateTableType) => void;
  roles: TeamAdminToolRoleType[];
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
