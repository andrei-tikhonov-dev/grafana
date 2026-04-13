import { useMutation } from '@tanstack/react-query';
import { useCallback, useRef, useState } from 'react';

import { useAiChatContext } from '../AiChatContext';
import { type AiChatClient, type SendBoardMessageArgs, EAiChatStatus, toBoardChatBoardType } from '../api/types';
import { useAiChatStore } from '../store/aiChatStore';
import { toAiChatError } from '../utils/errors';
import { buildApiHistory } from '../utils/history';

interface UseAiChatMessagingResult {
  handleSendMessage: (message: string) => void;
  handleCancel: () => void;
  handleRetry: () => void;
  restoredInputText: string | undefined;
}

export function useAiChatMessaging(): UseAiChatMessagingResult {
  const {
    instanceId,
    client,
    strings,
    teamId,
    project,
    dashboard,
    metricContext,
    from,
    to,
    userId,
    panelIds,
    dashboardPanelSettings,
  } = useAiChatContext();

  const {
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
  } = useAiChatStore.getState();

  const [restoredInputText, setRestoredInputText] = useState<string>();
  const pendingUserLocalIdRef = useRef<string>();

  const createMessageArgs = useCallback(
    (message: string, history: ReturnType<typeof buildApiHistory>): SendBoardMessageArgs => ({
      teamId,
      boardType: toBoardChatBoardType(dashboard!),
      boardChatMessageRequest: {
        project,
        message,
        panelIds: panelIds as SendBoardMessageArgs['boardChatMessageRequest']['panelIds'],
        userId,
        metricContext,
        from,
        to,
        history,
        dashboardPanelSettings,
      },
    }),
    [teamId, dashboard, project, panelIds, userId, metricContext, from, to, dashboardPanelSettings]
  );

  const initializeRequest = useCallback(
    (iid: string) => {
      const existing = useAiChatStore.getState().requestStates[iid];
      existing?.abortController?.abort();

      const controller = new AbortController();
      setAbortController(iid, controller);
      setLoading(iid, true);
      setThinkingStageIndex(iid, 0);
      return controller;
    },
    [setAbortController, setLoading, setThinkingStageIndex]
  );

  const cleanupPendingMessages = useCallback(() => {
    const currentMessages = useAiChatStore.getState().chats[instanceId] || [];
    const pending = currentMessages.find((m) => m.status === EAiChatStatus.Pending);
    if (pending) {
      removeMessage(instanceId, pending.localId);
    }

    if (pendingUserLocalIdRef.current) {
      const userMsg = currentMessages.find((m) => m.localId === pendingUserLocalIdRef.current);
      if (userMsg) {
        setRestoredInputText(userMsg.content);
        removeMessage(instanceId, pendingUserLocalIdRef.current);
      }
      pendingUserLocalIdRef.current = undefined;
    }
  }, [instanceId, removeMessage]);

  const sendMessageMutation = useMutation<
    Awaited<ReturnType<AiChatClient['sendBoardMessage']>>,
    Error,
    {
      args: SendBoardMessageArgs;
      signal?: AbortSignal;
      pendingLocalId: string;
      scopeInstanceId: string;
    }
  >({
    mutationFn: async ({ args, signal }) => {
      return client.sendBoardMessage(args, signal ? { signal } : undefined);
    },
    onSuccess: (response, { pendingLocalId, scopeInstanceId }) => {
      resolveAssistantMessage(
        scopeInstanceId,
        pendingLocalId,
        response.messageId || '',
        response.content || '',
        response.suggestedPrompts
      );
      resetRequestState(scopeInstanceId);
    },
    onError: (error, { pendingLocalId, scopeInstanceId }) => {
      const chatError = toAiChatError(error, strings);
      if (!chatError.isAbort) {
        failAssistantMessage(scopeInstanceId, pendingLocalId, chatError.message);
        resetRequestState(scopeInstanceId);
      }
    },
  });

  const executeSendMessage = useCallback(
    (message: string, history: ReturnType<typeof buildApiHistory>, pendingLocalId: string, scopeInstanceId: string) => {
      const requiredFields: Record<string, unknown> = {
        dashboard,
        teamId,
        project,
      };

      const missingFields = Object.entries(requiredFields)
        .filter(([_, value]) => !value)
        .map(([key]) => key);

      if (missingFields.length > 0) {
        const errorMessage = `Configuration error. Missing: ${missingFields.join(', ')}`;
        failAssistantMessage(scopeInstanceId, pendingLocalId, errorMessage);
        setLoading(scopeInstanceId, false);
        return;
      }

      const controller = initializeRequest(scopeInstanceId);
      const args = createMessageArgs(message, history);

      sendMessageMutation.mutate({
        args,
        signal: controller.signal,
        pendingLocalId,
        scopeInstanceId,
      });
    },
    [
      dashboard,
      teamId,
      project,
      failAssistantMessage,
      setLoading,
      initializeRequest,
      createMessageArgs,
      sendMessageMutation,
    ]
  );

  const handleSendMessage = useCallback(
    (message: string) => {
      const state = useAiChatStore.getState();
      const isAlreadyLoading = state.requestStates[instanceId]?.isLoading;
      if (isAlreadyLoading) {
        return;
      }
      const currentMessages = state.chats[instanceId] || [];
      const uiMessage = message || strings.presetFallbackMessage;
      const userLocalId = appendUserMessage(instanceId, uiMessage);
      pendingUserLocalIdRef.current = userLocalId;

      const pendingLocalId = appendAssistantPending(instanceId);
      const history = buildApiHistory(currentMessages);

      setLastRequest(instanceId, {
        message,
        historySnapshot: history,
        kind: message ? 'user' : 'summary',
      });

      executeSendMessage(message, history, pendingLocalId, instanceId);
    },
    [
      instanceId,
      strings.presetFallbackMessage,
      appendUserMessage,
      appendAssistantPending,
      setLastRequest,
      executeSendMessage,
    ]
  );

  const handleCancel = useCallback(() => {
    resetRequestState(instanceId);
    cleanupPendingMessages();
  }, [instanceId, resetRequestState, cleanupPendingMessages]);

  const handleRetry = useCallback(() => {
    const { chats: currentChats, requestStates } = useAiChatStore.getState();
    const rs = requestStates[instanceId];
    if (!rs?.lastRequest) {
      return;
    }

    const currentMessages = currentChats[instanceId] || [];
    const errorMsg = [...currentMessages].reverse().find((m) => m.status === EAiChatStatus.Error);
    if (errorMsg) {
      removeMessage(instanceId, errorMsg.localId);
    }

    const pendingLocalId = appendAssistantPending(instanceId);
    executeSendMessage(rs.lastRequest.message, rs.lastRequest.historySnapshot, pendingLocalId, instanceId);
  }, [instanceId, removeMessage, appendAssistantPending, executeSendMessage]);

  return { handleSendMessage, handleCancel, handleRetry, restoredInputText };
}
