import { ChatFeedbackRequestValueEnum } from '@architeq/core-api-client';
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';

import { useAiChatContext } from '../AiChatContext';
import { toFeedbackBoardType, type SubmitFeedbackArgs } from '../api/types';
import { useAiChatStore } from '../store/aiChatStore';

interface UseFeedbackHandlersResult {
  handleFeedback: (localId: string, value: ChatFeedbackRequestValueEnum) => void;
  handleSubmitFeedback: (comment: string) => void;
}

export function useFeedbackHandlers(): UseFeedbackHandlersResult {
  const { instanceId, client, teamId, project, dashboard } = useAiChatContext();

  const { openFeedbackModal, closeFeedbackModal, applyFeedback } = useAiChatStore.getState();

  const submitFeedbackMutation = useMutation({
    mutationFn: async (args: SubmitFeedbackArgs) => {
      return client.submitFeedback(args);
    },
  });

  const handleFeedback = useCallback(
    (localId: string, value: ChatFeedbackRequestValueEnum) => {
      openFeedbackModal(instanceId, localId, value);
    },
    [instanceId, openFeedbackModal]
  );

  const handleSubmitFeedback = useCallback(
    (comment: string) => {
      const { feedbackModal: currentFeedbackModal, chats: currentChats } = useAiChatStore.getState();
      const { instanceId: feedbackInstanceId, targetLocalId, value } = currentFeedbackModal;
      if (!feedbackInstanceId || !targetLocalId || !value) {
        return;
      }

      const currentMessages = currentChats[feedbackInstanceId] || [];
      const message = currentMessages.find((m) => m.localId === targetLocalId);
      if (!message?.messageId) {
        return;
      }

      if (!dashboard) {
        console.error('Dashboard is missing in feedback submit');
        closeFeedbackModal();
        return;
      }

      applyFeedback(feedbackInstanceId, targetLocalId, value, comment);

      submitFeedbackMutation.mutate({
        teamId,
        boardType: toFeedbackBoardType(dashboard),
        chatFeedbackRequest: {
          project,
          messageId: message.messageId,
          value,
          comment,
        },
      });

      closeFeedbackModal();
    },
    [dashboard, teamId, project, closeFeedbackModal, applyFeedback, submitFeedbackMutation]
  );

  return { handleFeedback, handleSubmitFeedback };
}
