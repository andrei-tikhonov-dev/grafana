import { css } from '@emotion/css';
import { ArrowLeft, SquarePen, X } from 'lucide-react';
import React from 'react';

import { UiButton } from '../../../components/ui';
import { theme3 } from '../../../theme';
import { useDrawerHeader } from '../hooks/useDrawerHeader';
import { useAiChatStore } from '../store/aiChatStore';

import { DrawerDropdownMenu } from './DrawerDropdownMenu';
import { NewChatConfirmDialog } from './NewChatConfirmDialog';

interface Props {
  instanceId: string;
  presetQueries: string[];
  onPresetSelect: (query: string) => void;
  onClose: () => void;
}

const styles = {
  header: css`
    display: flex;
    align-items: center;
    width: 100%;
    gap: ${theme3.tailwind.spacing2};
    padding: ${theme3.tailwind.spacing2};
  `,
  title: css`
    flex: 1;
    text-align: center;
    font-size: ${theme3.tailwind.textBase};
    font-weight: 600;
    color: ${theme3.shadcn.foreground};
  `,
  actions: css`
    display: flex;
    align-items: center;
    gap: ${theme3.tailwind.spacing};
  `,
};

export const DrawerHeader: React.FC<Props> = ({ instanceId, presetQueries, onPresetSelect, onClose }) => {
  const { view, openEditor, openChat, newChatDialog } = useDrawerHeader(instanceId);
  const messages = useAiChatStore((s) => s.chats[instanceId] || []);
  const hasMessages = messages.length > 0;

  const isEditor = view === 'editor';
  const title = isEditor ? 'Edit system prompt' : 'AI Chat';

  return (
    <>
      <div className={styles.header}>
        {isEditor ? (
          <UiButton variant="ghost" size="sm" onClick={openChat}>
            <ArrowLeft size={16} />
          </UiButton>
        ) : (
          <DrawerDropdownMenu presetQueries={presetQueries} onEditPrompt={openEditor} onPresetSelect={onPresetSelect} />
        )}

        <span className={styles.title}>{title}</span>

        <div className={styles.actions}>
          <UiButton variant="ghost" size="sm" onClick={newChatDialog.open} disabled={!hasMessages}>
            <SquarePen size={16} />
          </UiButton>
          <UiButton variant="ghost" size="sm" onClick={onClose}>
            <X size={16} />
          </UiButton>
        </div>
      </div>

      <NewChatConfirmDialog
        open={newChatDialog.isOpen}
        onConfirm={newChatDialog.confirm}
        onCancel={newChatDialog.cancel}
      />
    </>
  );
};
