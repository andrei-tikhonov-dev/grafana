import React from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../components/shadcn/dialog';
import { UiButton } from '../../../components/ui';

interface Props {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const NewChatConfirmDialog: React.FC<Props> = ({ open, onConfirm, onCancel }) => (
  <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onCancel()}>
    <DialogContent showCloseButton={false}>
      <DialogHeader>
        <DialogTitle>Start a new chat?</DialogTitle>
        <DialogDescription>This will clear your current conversation.</DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <UiButton variant="outline" onClick={onCancel}>
          Cancel
        </UiButton>
        <UiButton onClick={onConfirm}>Confirm</UiButton>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);
