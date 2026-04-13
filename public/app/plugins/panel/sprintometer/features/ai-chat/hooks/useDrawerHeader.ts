import { useCallback, useState } from 'react';

import { useAiChatContext } from '../AiChatContext';
import { useAiChatStore } from '../store/aiChatStore';
import { usePromptEditorStore } from '../store/promptEditorStore';
import { createCooldownKey, isBannerEligible, recordBannerInteraction } from '../utils/cooldown';

interface NewChatDialog {
  isOpen: boolean;
  open: () => void;
  confirm: () => void;
  cancel: () => void;
}

interface UseDrawerHeaderResult {
  view: 'chat' | 'editor';
  openEditor: () => void;
  openChat: () => void;
  newChatDialog: NewChatDialog;
}

export function useDrawerHeader(instanceId: string): UseDrawerHeaderResult {
  const view = usePromptEditorStore((s) => s.view);
  const openEditor = usePromptEditorStore((s) => s.openEditor);
  const openChat = usePromptEditorStore((s) => s.closeEditor);
  const { userId, teamId, boardType, project } = useAiChatContext();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { clearMessages, resetRequestState } = useAiChatStore.getState();

  const openDialog = useCallback(() => {
    setIsDialogOpen(true);
  }, []);

  const confirmDialog = useCallback(() => {
    const cooldownKey = createCooldownKey(userId, teamId, boardType, project);
    if (!isBannerEligible(cooldownKey)) {
      recordBannerInteraction(cooldownKey);
    }

    clearMessages(instanceId);
    resetRequestState(instanceId);
    setIsDialogOpen(false);
  }, [instanceId, clearMessages, resetRequestState, userId, teamId, boardType, project]);

  const cancelDialog = useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  return {
    view,
    openEditor,
    openChat,
    newChatDialog: {
      isOpen: isDialogOpen,
      open: openDialog,
      confirm: confirmDialog,
      cancel: cancelDialog,
    },
  };
}
