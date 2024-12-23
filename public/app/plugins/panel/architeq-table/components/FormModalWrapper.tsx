import React, { useState, ReactNode } from 'react';

import { Button, Modal } from '@grafana/ui';

import { HeaderItem } from './HeaderItem';

interface Props {
  children: (props: { onClose: () => void }) => ReactNode;
  title: string;
}

export const FormModalWrapper: React.FC<Props> = ({ children, title }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <HeaderItem>
        <Button onClick={openModal}>{title}</Button>
      </HeaderItem>
      {isModalOpen && (
        <Modal title={title} isOpen={isModalOpen} onDismiss={closeModal}>
          {children({ onClose: closeModal })}
        </Modal>
      )}
    </>
  );
};
