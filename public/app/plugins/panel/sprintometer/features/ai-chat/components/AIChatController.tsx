import {
  ChatFeedbackRequestValueEnum,
  SendMetricChatMessageBoardTypeEnum,
  SendMetricChatMessageMetricNameEnum,
  SubmitBoardChatFeedbackBoardTypeEnum,
} from '@architeq/core-api-client';
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
  dashboard?: SendMetricChatMessageBoardTypeEnum;
  metric?: SendMetricChatMessageMetricNameEnum;
  metricContext?: string;
  client: AiChatClient;
  thinkingStages: string[];
  feedbackReasons: { up: string[]; down: string[] };
  strings: AiChatStrings;
  startPrompts: string[];
  instanceId: string;
}

const THINKING_STAGE_INTERVAL = 3000;

export const AIChatController: React.FC<Props> = ({
  teamId,
  project,
  dashboard,
  metric,
  metricContext,
  client,
  thinkingStages,
  feedbackReasons,
  strings,
  startPrompts,
  instanceId,
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

  const messages = chats[instanceId]?.[openMode] || [];
  const [pendingInputText, setPendingInputText] = useState<string>();
  const [pendingUserLocalId, setPendingUserLocalId] = useState<string>();
  const thinkingIntervalRef = useRef<number>();

  const createMessageArgs = (message: string, history: ReturnType<typeof buildApiHistory>): SendMessageArgs => ({
    teamId,
    boardType: dashboard!,
    metricName: metric!,
    chatMessageRequest: {
      metricContext,
      project,
      message,
      history,
    },
  });

  const initializeRequest = () => {
    const controller = new AbortController();
    setAbortController(controller);
    setLoading(true);
    setThinkingStageIndex(0);
    return controller;
  };

  const cleanupPendingMessages = () => {
    const pending = messages.find((m) => m.status === EAiChatStatus.Pending);
    if (pending) {
      removeMessage(pending.localId);
    }

    if (pendingUserLocalId) {
      const userMsg = messages.find((m) => m.localId === pendingUserLocalId);
      if (userMsg) {
        setPendingInputText(userMsg.content);
        removeMessage(pendingUserLocalId);
      }
      setPendingUserLocalId(undefined);
    }
  };

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
      }, THINKING_STAGE_INTERVAL);

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

  const executeSendMessage = (message: string, history: ReturnType<typeof buildApiHistory>, pendingLocalId: string) => {
    const requiredFields: Record<string, unknown> = {
      dashboard,
      metric,
      teamId,
      project,
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([_, value]) => !value)
      .map(([key]) => key);

    if (missingFields.length > 0) {
      const errorMessage = `Configuration error. Missing: ${missingFields.join(', ')}`;
      failAssistantMessage(pendingLocalId, errorMessage);
      setLoading(false);
      return;
    }

    const controller = initializeRequest();
    const args = createMessageArgs(message, history);

    sendMessageMutation.mutate({
      args,
      signal: controller.signal,
      pendingLocalId,
    });
  };

  const handleSendMessage = (message: string) => {
    const uiMessage = message || strings.autoSummaryMessage;
    const userLocalId = appendUserMessage(uiMessage);
    setPendingUserLocalId(userLocalId);

    const pendingLocalId = appendAssistantPending();
    const history = buildApiHistory(messages);

    setLastRequest({
      message,
      historySnapshot: history,
      kind: message ? 'user' : 'summary',
    });

    executeSendMessage(message, history, pendingLocalId);
  };

  const handleCancel = () => {
    const { abortController } = useAiChatStore.getState();
    abortController?.abort();
    cleanupPendingMessages();
    resetRequestState();
  };

  const handleRetry = () => {
    if (!lastRequest) {
      return;
    }

    const errorMsg = messages.find((m) => m.status === EAiChatStatus.Error);
    if (errorMsg) {
      removeMessage(errorMsg.localId);
    }

    const pendingLocalId = appendAssistantPending();
    executeSendMessage(lastRequest.message, lastRequest.historySnapshot, pendingLocalId);
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

    applyFeedback(targetLocalId, value, comment);

    if (!dashboard) {
      console.error('Dashboard is missing in feedback submit');
      return;
    }

    submitFeedbackMutation.mutate({
      teamId,
      boardType: dashboard as unknown as SubmitBoardChatFeedbackBoardTypeEnum,
      chatFeedbackRequest: {
        project,
        messageId: message.messageId,
        value,
        comment,
      },
    });

    closeFeedbackModal();
  };

  const currentThinkingStage = thinkingStages[thinkingStageIndex] || thinkingStages[0];
  const isPositiveFeedback = feedbackModal.value === ChatFeedbackRequestValueEnum.Up;
  const feedbackReasonsForValue = isPositiveFeedback ? feedbackReasons.up : feedbackReasons.down;
  const feedbackTitle = isPositiveFeedback ? strings.feedbackTitleUp : strings.feedbackTitleDown;

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
