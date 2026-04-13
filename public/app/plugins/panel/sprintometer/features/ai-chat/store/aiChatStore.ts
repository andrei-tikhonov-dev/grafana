import { ChatFeedbackRequestValueEnum, ChatHistoryMessageRoleEnum } from '@architeq/core-api-client';
import { create } from 'zustand';

import { uid } from '../../../utils/uid';
import { AiChatMessageVM, EAiChatMode, EAiChatStatus, LastRequest } from '../api/types';

interface ChatRequestState {
  isLoading: boolean;
  thinkingStageIndex: number;
  abortController?: AbortController;
  lastRequest?: LastRequest;
}

const EMPTY_REQUEST_STATE: ChatRequestState = {
  isLoading: false,
  thinkingStageIndex: 0,
};

interface FeedbackModalState {
  isOpen: boolean;
  instanceId?: string;
  targetLocalId?: string;
  value?: ChatFeedbackRequestValueEnum;
}

interface AiChatState {
  // Drawer state — panelInstanceId is unique per panel to prevent collisions
  activeInstanceId: string | undefined;
  // Chat scope — shared key for message history (userId-teamId-boardType-project)
  activeChatScopeId: string | undefined;
  openMode: EAiChatMode;

  // Query passed via openWithQuery, consumed by usePresetMode
  pendingOpenQuery: string | null;

  // Messages (scoped by chatScopeId, single array per scope)
  chats: Record<string, AiChatMessageVM[]>;

  // Request lifecycle (scoped by chatScopeId)
  requestStates: Record<string, ChatRequestState>;

  // Feedback modal
  feedbackModal: FeedbackModalState;

  // Actions
  open: (mode: EAiChatMode, panelInstanceId: string, chatScopeId: string, query?: string) => void;
  close: () => void;

  appendUserMessage: (instanceId: string, text: string) => string;
  appendAssistantPending: (instanceId: string) => string;
  resolveAssistantMessage: (
    instanceId: string,
    localId: string,
    messageId: string,
    content: string,
    suggestedPrompts?: string[]
  ) => void;
  failAssistantMessage: (instanceId: string, localId: string, errorMessage: string) => void;
  removeMessage: (instanceId: string, localId: string) => void;

  setLoading: (instanceId: string, loading: boolean) => void;
  setThinkingStageIndex: (instanceId: string, index: number) => void;
  setAbortController: (instanceId: string, controller: AbortController | undefined) => void;
  setLastRequest: (instanceId: string, request: LastRequest | undefined) => void;
  resetRequestState: (instanceId: string) => void;

  openFeedbackModal: (instanceId: string, localId: string, value: ChatFeedbackRequestValueEnum) => void;
  closeFeedbackModal: () => void;
  applyFeedback: (instanceId: string, localId: string, value: ChatFeedbackRequestValueEnum, comment: string) => void;

  clearMessages: (instanceId: string) => void;

  // Pending query (set by preset dropdown, consumed by controller)
  pendingQuery: string | null;
  setPendingQuery: (query: string | null) => void;
}

export const useAiChatStore = create<AiChatState>((set, get) => ({
  // Initial state
  activeInstanceId: undefined,
  activeChatScopeId: undefined,
  openMode: EAiChatMode.General,
  pendingOpenQuery: null,
  chats: {},
  requestStates: {},
  feedbackModal: {
    isOpen: false,
  },

  // Drawer actions
  open: (mode, panelInstanceId, chatScopeId, query) =>
    set((state) => ({
      activeInstanceId: panelInstanceId,
      activeChatScopeId: chatScopeId,
      openMode: mode,
      pendingOpenQuery: query ?? null,
      chats: state.chats[chatScopeId]
        ? state.chats
        : {
            ...state.chats,
            [chatScopeId]: [],
          },
    })),
  close: () => {
    const { activeChatScopeId, requestStates } = get();
    const updates: Partial<AiChatState> = {
      activeInstanceId: undefined,
      activeChatScopeId: undefined,
      pendingOpenQuery: null,
    };
    if (activeChatScopeId) {
      const rs = requestStates[activeChatScopeId];
      if (rs?.abortController) {
        rs.abortController.abort();
      }
      updates.requestStates = { ...requestStates, [activeChatScopeId]: { ...EMPTY_REQUEST_STATE } };
    }
    set(updates);
  },

  // Message actions (scoped by instanceId)
  appendUserMessage: (instanceId, text) => {
    const localId = uid('local');
    const message: AiChatMessageVM = {
      localId,
      role: ChatHistoryMessageRoleEnum.User,
      content: text,
      status: EAiChatStatus.Ok,
    };
    set((state) => ({
      chats: {
        ...state.chats,
        [instanceId]: [...(state.chats[instanceId] || []), message],
      },
    }));
    return localId;
  },

  appendAssistantPending: (instanceId) => {
    const localId = uid('local');
    const message: AiChatMessageVM = {
      localId,
      role: ChatHistoryMessageRoleEnum.Assistant,
      content: '',
      status: EAiChatStatus.Pending,
    };
    set((state) => ({
      chats: {
        ...state.chats,
        [instanceId]: [...(state.chats[instanceId] || []), message],
      },
    }));
    return localId;
  },

  resolveAssistantMessage: (instanceId, localId, messageId, content, suggestedPrompts) => {
    set((state) => {
      const messages = state.chats[instanceId];
      if (!messages) {
        return state;
      }
      return {
        chats: {
          ...state.chats,
          [instanceId]: messages.map((msg) =>
            msg.localId === localId
              ? {
                  ...msg,
                  messageId,
                  content,
                  status: EAiChatStatus.Ok,
                  suggestedPrompts,
                }
              : msg
          ),
        },
      };
    });
  },

  failAssistantMessage: (instanceId, localId, errorMessage) => {
    set((state) => {
      const messages = state.chats[instanceId];
      if (!messages) {
        return state;
      }
      return {
        chats: {
          ...state.chats,
          [instanceId]: messages.map((msg) =>
            msg.localId === localId
              ? {
                  ...msg,
                  status: EAiChatStatus.Error,
                  errorMessage,
                }
              : msg
          ),
        },
      };
    });
  },

  removeMessage: (instanceId, localId) => {
    set((state) => {
      const messages = state.chats[instanceId];
      if (!messages) {
        return state;
      }
      return {
        chats: {
          ...state.chats,
          [instanceId]: messages.filter((msg) => msg.localId !== localId),
        },
      };
    });
  },

  // Request lifecycle (scoped by instanceId)
  setLoading: (instanceId, loading) => {
    set((state) => ({
      requestStates: {
        ...state.requestStates,
        [instanceId]: { ...(state.requestStates[instanceId] || EMPTY_REQUEST_STATE), isLoading: loading },
      },
    }));
  },
  setThinkingStageIndex: (instanceId, index) => {
    set((state) => ({
      requestStates: {
        ...state.requestStates,
        [instanceId]: { ...(state.requestStates[instanceId] || EMPTY_REQUEST_STATE), thinkingStageIndex: index },
      },
    }));
  },
  setAbortController: (instanceId, controller) => {
    set((state) => ({
      requestStates: {
        ...state.requestStates,
        [instanceId]: { ...(state.requestStates[instanceId] || EMPTY_REQUEST_STATE), abortController: controller },
      },
    }));
  },
  setLastRequest: (instanceId, request) => {
    set((state) => ({
      requestStates: {
        ...state.requestStates,
        [instanceId]: { ...(state.requestStates[instanceId] || EMPTY_REQUEST_STATE), lastRequest: request },
      },
    }));
  },

  resetRequestState: (instanceId) => {
    const rs = get().requestStates[instanceId];
    if (rs?.abortController) {
      rs.abortController.abort();
    }
    set((state) => ({
      requestStates: {
        ...state.requestStates,
        [instanceId]: { ...EMPTY_REQUEST_STATE },
      },
    }));
  },

  // Feedback modal
  openFeedbackModal: (instanceId, localId, value) => {
    set({
      feedbackModal: {
        isOpen: true,
        instanceId,
        targetLocalId: localId,
        value,
      },
    });
  },

  closeFeedbackModal: () => {
    set({
      feedbackModal: {
        isOpen: false,
      },
    });
  },

  applyFeedback: (instanceId, localId, value, comment) => {
    set((state) => {
      const messages = state.chats[instanceId];
      if (!messages) {
        return state;
      }
      return {
        chats: {
          ...state.chats,
          [instanceId]: messages.map((msg) =>
            msg.localId === localId
              ? {
                  ...msg,
                  feedback: {
                    value,
                    comment,
                  },
                }
              : msg
          ),
        },
      };
    });
  },

  // Pending query
  pendingQuery: null,
  setPendingQuery: (query) => set({ pendingQuery: query }),

  clearMessages: (instanceId) =>
    set((state) => {
      if (!state.chats[instanceId]) {
        return state;
      }
      return {
        chats: {
          ...state.chats,
          [instanceId]: [],
        },
      };
    }),
}));

export { EMPTY_REQUEST_STATE };
export type { ChatRequestState };
