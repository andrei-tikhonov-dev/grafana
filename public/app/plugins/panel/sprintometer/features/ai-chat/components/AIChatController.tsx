import { ChatFeedbackRequestValueEnum } from '@architeq/core-api-client';
import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useRef, useState } from 'react';

import {
  AiChatClient,
  AiChatStrings,
  EAiChatMode,
  EAiChatStatus,
  SendMessageArgs,
  SubmitFeedbackArgs,
} from '../api/types';
import { useAiChatStore } from '../store/aiChatStore';
import { toAiChatError } from '../utils/errors';
import { buildApiHistory } from '../utils/history';

import { AIChatView } from './AIChatView';
import { FeedbackModal } from './FeedbackModal';

interface Props {
  teamId: string;
  project: string;
  client: AiChatClient;
  thinkingStages: string[];
  feedbackReasons: { up: string[]; down: string[] };
  strings: AiChatStrings;
  startPrompts: string[];
}

export const AIChatController: React.FC<Props> = ({
  teamId,
  project,
  client,
  thinkingStages,
  feedbackReasons,
  strings,
  startPrompts,
}) => {
  const {
    openMode,
    chats,
    isLoading,
    thinkingStageIndex,
    lastRequest,
    feedbackModal,
    appendUserMessage,
    appendAssistantPending,
    resolveAssistantMessage,
    failAssistantMessage,
    removeMessage,
    setLoading,
    setThinkingStageIndex,
    setAbortController,
    setLastRequest,
    resetRequestState,
    openFeedbackModal,
    closeFeedbackModal,
    applyFeedback,
  } = useAiChatStore();

  const messages = chats[openMode];

  const [pendingInputText, setPendingInputText] = useState<string>();
  const [pendingUserLocalId, setPendingUserLocalId] = useState<string>();
  const thinkingIntervalRef = useRef<number>();

  // Send message mutation
  const sendMessageMutation = useMutation<
    Awaited<ReturnType<AiChatClient['sendMessage']>>,
    Error,
    { args: SendMessageArgs; signal?: AbortSignal; pendingLocalId: string }
  >({
    mutationFn: async ({ args, signal }) => {
      return client.sendMessage(args, signal ? { signal } : undefined);
    },
    onSuccess: (response, { pendingLocalId }) => {
      resolveAssistantMessage(
        pendingLocalId,
        response.messageId || '',
        response.content || '',
        response.suggestedPrompts
      );
      resetRequestState();
    },
    onError: (error, { pendingLocalId }) => {
      const chatError = toAiChatError(error);
      if (!chatError.isAbort) {
        failAssistantMessage(pendingLocalId, chatError.message);
        setLoading(false);
      }
    },
  });

  // Submit feedback mutation
  const submitFeedbackMutation = useMutation({
    mutationFn: async (args: SubmitFeedbackArgs) => {
      return client.submitFeedback(args);
    },
  });

  // Thinking stage rotation
  useEffect(() => {
    if (isLoading) {
      thinkingIntervalRef.current = window.setInterval(() => {
        setThinkingStageIndex((thinkingStageIndex + 1) % thinkingStages.length);
      }, 3000);

      return () => {
        if (thinkingIntervalRef.current) {
          clearInterval(thinkingIntervalRef.current);
        }
      };
    }
    return undefined;
  }, [isLoading, thinkingStageIndex, thinkingStages.length, setThinkingStageIndex]);

  // Auto-summary on autoSummary open
  useEffect(() => {
    if (openMode === EAiChatMode.AutoSummary && messages.length === 0 && !isLoading) {
      handleSendMessage('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openMode]);

  const handleSendMessage = (message: string) => {
    // Create abort controller
    const controller = new AbortController();
    setAbortController(controller);

    // Append user message
    const uiMessage = message || strings.autoSummaryMessage;

    const userLocalId = appendUserMessage(uiMessage);
    setPendingUserLocalId(userLocalId);

    // Append pending assistant message
    const pendingLocalId = appendAssistantPending();

    // Build history (before adding current message)
    const history = buildApiHistory(messages);

    // Create request snapshot for retry
    setLastRequest({
      message,
      historySnapshot: history,
      kind: message ? 'user' : 'summary',
    });

    // Start loading
    setLoading(true);
    setThinkingStageIndex(0);

    // Send message
    sendMessageMutation.mutate({
      args: {
        teamId,
        chatMessageRequest: {
          project,
          message,
          history,
        },
      },
      signal: controller.signal,
      pendingLocalId,
    });
  };

  const handleCancel = () => {
    const { abortController } = useAiChatStore.getState();
    if (abortController) {
      abortController.abort();
    }

    // Remove pending assistant message
    const pending = messages.find((m) => m.status === EAiChatStatus.Pending);
    if (pending) {
      removeMessage(pending.localId);
    }

    // Remove user message and restore to input
    if (pendingUserLocalId) {
      const userMsg = messages.find((m) => m.localId === pendingUserLocalId);
      if (userMsg) {
        setPendingInputText(userMsg.content);
        removeMessage(pendingUserLocalId);
      }
      setPendingUserLocalId(undefined);
    }

    resetRequestState();
  };

  const handleRetry = () => {
    if (lastRequest) {
      // Remove error message
      const errorMsg = messages.find((m) => m.status === EAiChatStatus.Error);
      if (errorMsg) {
        removeMessage(errorMsg.localId);
      }

      // Resend with same history snapshot
      const controller = new AbortController();
      setAbortController(controller);

      const pendingLocalId = appendAssistantPending();

      setLoading(true);
      setThinkingStageIndex(0);

      sendMessageMutation.mutate({
        args: {
          teamId,
          chatMessageRequest: {
            project,
            message: lastRequest.message,
            history: lastRequest.historySnapshot,
          },
        },
        signal: controller.signal,
        pendingLocalId,
      });
    }
  };

  const handlePromptClick = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const handleFeedback = (localId: string, value: ChatFeedbackRequestValueEnum) => {
    openFeedbackModal(localId, value);
  };

  const handleSubmitFeedback = (comment: string) => {
    const { targetLocalId, value } = feedbackModal;
    if (!targetLocalId || !value) {
      return;
    }

    const message = messages.find((m) => m.localId === targetLocalId);
    if (!message?.messageId) {
      return;
    }

    // Apply feedback to message (lock it)
    applyFeedback(targetLocalId, value, comment);

    // Submit to backend
    submitFeedbackMutation.mutate({
      teamId,
      chatFeedbackRequest: {
        messageId: message.messageId,
        value,
        comment,
      },
    });

    closeFeedbackModal();
  };

  const currentThinkingStage = thinkingStages[thinkingStageIndex] || thinkingStages[0];
  const feedbackReasonsForValue =
    feedbackModal.value === ChatFeedbackRequestValueEnum.Up ? feedbackReasons.up : feedbackReasons.down;
  const feedbackTitle =
    feedbackModal.value === ChatFeedbackRequestValueEnum.Up ? strings.feedbackTitleUp : strings.feedbackTitleDown;

  return (
    <>
      <AIChatView
        openMode={openMode}
        messages={messages}
        isLoading={isLoading}
        thinkingStageText={currentThinkingStage}
        pendingInputText={pendingInputText}
        startTitle={strings.startTitle}
        startSubtitle={strings.startSubtitle}
        startPrompts={startPrompts}
        inputPlaceholder={strings.inputPlaceholder}
        sendLabel={strings.send}
        cancelLabel={strings.cancel}
        retryLabel={strings.retry}
        onSendMessage={handleSendMessage}
        onCancel={handleCancel}
        onRetry={handleRetry}
        onPromptClick={handlePromptClick}
        onFeedback={handleFeedback}
      />

      <FeedbackModal
        isOpen={feedbackModal.isOpen}
        title={feedbackTitle}
        reasons={feedbackReasonsForValue}
        otherLabel={strings.other}
        submitLabel={strings.submit}
        otherHint={strings.feedbackHintOther}
        onSubmit={handleSubmitFeedback}
        onClose={closeFeedbackModal}
      />
    </>
  );
};
