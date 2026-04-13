import React, { useEffect, useMemo } from 'react';

import { useAiChatContext } from '../AiChatContext';
import { useAiChatMessaging } from '../hooks/useAiChatMessaging';
import { usePresetMode } from '../hooks/usePresetMode';
import { useFeedbackHandlers } from '../hooks/useFeedbackHandlers';
import { useThinkingStageRotation } from '../hooks/useThinkingStageRotation';
import { useAiChatStore } from '../store/aiChatStore';
import { usePromptEditorStore } from '../store/promptEditorStore';

import { AIChatView } from './AIChatView';
import { FeedbackModal } from './FeedbackModal';
import { SystemPromptEditor } from './SystemPromptEditor';

export const AiChatController: React.FC = () => {
  const { aiServiceClient, userId, teamId, boardType } = useAiChatContext();
  const view = usePromptEditorStore((s) => s.view);

  const { handleSendMessage, handleCancel, handleRetry, restoredInputText } = useAiChatMessaging();
  const thinkingStageText = useThinkingStageRotation();
  const { handleFeedback, handleSubmitFeedback } = useFeedbackHandlers();
  usePresetMode(handleSendMessage);

  // Relay preset query from DrawerHeader (sibling component rendered in Drawer title).
  // Direct callback passing is not possible due to component tree structure.
  const pendingQuery = useAiChatStore((s) => s.pendingQuery);

  useEffect(() => {
    if (pendingQuery) {
      handleSendMessage(pendingQuery);
      useAiChatStore.getState().setPendingQuery(null);
    }
  }, [pendingQuery, handleSendMessage]);

  const editorCtx = useMemo(() => ({ teamId, boardType, userId }), [teamId, boardType, userId]);

  if (view === 'editor') {
    return (
      <SystemPromptEditor
        client={aiServiceClient}
        ctx={editorCtx}
      />
    );
  }

  return (
    <>
      <AIChatView
        restoredInputText={restoredInputText}
        thinkingStageText={thinkingStageText}
        onSendMessage={handleSendMessage}
        onCancel={handleCancel}
        onRetry={handleRetry}
        onFeedback={handleFeedback}
      />
      <FeedbackModal onSubmit={handleSubmitFeedback} />
    </>
  );
};
