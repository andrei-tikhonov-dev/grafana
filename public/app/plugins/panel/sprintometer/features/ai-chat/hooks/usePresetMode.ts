import { useEffect } from 'react';

import { EAiChatMode } from '../api/types';
import { useAiChatStore, EMPTY_REQUEST_STATE } from '../store/aiChatStore';
import { useAiChatContext } from '../AiChatContext';

export function usePresetMode(handleSendMessage: (message: string) => void): void {
  const { instanceId } = useAiChatContext();
  const openMode = useAiChatStore((s) => s.openMode);
  const messages = useAiChatStore((s) => s.chats[instanceId] || []);
  const isLoading = useAiChatStore((s) => (s.requestStates[instanceId] || EMPTY_REQUEST_STATE).isLoading);
  const pendingOpenQuery = useAiChatStore((s) => s.pendingOpenQuery);

  useEffect(() => {
    if (openMode === EAiChatMode.Preset && pendingOpenQuery !== null && !isLoading) {
      handleSendMessage(pendingOpenQuery);
      useAiChatStore.setState({ pendingOpenQuery: null });
    }
  }, [openMode, messages.length, isLoading, handleSendMessage, pendingOpenQuery]);
}
