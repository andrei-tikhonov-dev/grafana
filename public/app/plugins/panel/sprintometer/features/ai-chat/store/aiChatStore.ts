import { ChatFeedbackRequestValueEnum, ChatHistoryMessageRoleEnum } from '@architeq/core-api-client';
import { create } from 'zustand';

import { AiChatMessageVM, EAiChatMode, EAiChatStatus, LastRequest } from '../api/types';
import { createLocalMessageId } from '../utils/ids';

interface FeedbackModalState {
  isOpen: boolean;
  targetLocalId?: string;
  value?: ChatFeedbackRequestValueEnum;
  otherText?: string;
}

interface AiChatState {
  // Drawer state
  activeDrawerId: string | undefined;
  activeInstanceId: string | undefined;
  openMode: EAiChatMode;

  // Messages (scoped by instanceId)
  chats: Record<string, Record<EAiChatMode, AiChatMessageVM[]>>;

  // Request lifecycle
  isLoading: boolean;
  thinkingStageIndex: number;
  abortController?: AbortController;
  lastRequest?: LastRequest;

  // Feedback modal
  feedbackModal: FeedbackModalState;

  // Actions
  open: (mode: EAiChatMode, drawerId: string, instanceId: string) => void;
  close: () => void;

  appendUserMessage: (text: string) => string; // Returns localId
  appendAssistantPending: () => string; // Returns localId
  resolveAssistantMessage: (localId: string, messageId: string, content: string, suggestedPrompts?: string[]) => void;
  failAssistantMessage: (localId: string, errorMessage: string) => void;
  removeMessage: (localId: string) => void;

  setLoading: (loading: boolean) => void;
  setThinkingStageIndex: (index: number) => void;
  setAbortController: (controller: AbortController | undefined) => void;
  setLastRequest: (request: LastRequest | undefined) => void;
  resetRequestState: () => void;

  openFeedbackModal: (localId: string, value: ChatFeedbackRequestValueEnum) => void;
  closeFeedbackModal: () => void;
  setFeedbackOtherText: (text: string) => void;
  applyFeedback: (localId: string, value: ChatFeedbackRequestValueEnum, comment: string) => void;

  clearMessages: () => void;
}

const createEmptyInstanceChats = (): Record<EAiChatMode, AiChatMessageVM[]> => ({
  [EAiChatMode.General]: [],
  [EAiChatMode.AutoSummary]: [],
});

export const useAiChatStore = create<AiChatState>((set, get) => ({
  // Initial state
  activeDrawerId: undefined,
  activeInstanceId: undefined,
  openMode: EAiChatMode.General,
  chats: {},
  isLoading: false,
  thinkingStageIndex: 0,
  abortController: undefined,
  lastRequest: undefined,
  feedbackModal: {
    isOpen: false,
  },

  // Drawer actions
  open: (mode, drawerId, instanceId) =>
    set((state) => ({
      activeDrawerId: drawerId,
      activeInstanceId: instanceId,
      openMode: mode,
      chats: state.chats[instanceId]
        ? state.chats
        : {
            ...state.chats,
            [instanceId]: createEmptyInstanceChats(),
          },
    })),
  close: () => set({ activeDrawerId: undefined }),

  // Message actions
  appendUserMessage: (text) => {
    const localId = createLocalMessageId();
    const message: AiChatMessageVM = {
      localId,
      role: ChatHistoryMessageRoleEnum.User,
      content: text,
      status: EAiChatStatus.Ok,
    };
    set((state) => {
      const instanceId = state.activeInstanceId;
      if (!instanceId) {
        return state;
      }
      const instanceChats = state.chats[instanceId] || createEmptyInstanceChats();
      return {
        chats: {
          ...state.chats,
          [instanceId]: {
            ...instanceChats,
            [state.openMode]: [...instanceChats[state.openMode], message],
          },
        },
      };
    });
    return localId;
  },

  appendAssistantPending: () => {
    const localId = createLocalMessageId();
    const message: AiChatMessageVM = {
      localId,
      role: ChatHistoryMessageRoleEnum.Assistant,
      content: '',
      status: EAiChatStatus.Pending,
    };
    set((state) => {
      const instanceId = state.activeInstanceId;
      if (!instanceId) {
        return state;
      }
      const instanceChats = state.chats[instanceId] || createEmptyInstanceChats();
      return {
        chats: {
          ...state.chats,
          [instanceId]: {
            ...instanceChats,
            [state.openMode]: [...instanceChats[state.openMode], message],
          },
        },
      };
    });
    return localId;
  },

  resolveAssistantMessage: (localId, messageId, content, suggestedPrompts) => {
    set((state) => {
      const instanceId = state.activeInstanceId;
      if (!instanceId) {
        return state;
      }
      const instanceChats = state.chats[instanceId];
      if (!instanceChats) {
        return state;
      }
      return {
        chats: {
          ...state.chats,
          [instanceId]: {
            ...instanceChats,
            [state.openMode]: instanceChats[state.openMode].map((msg) =>
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
        },
      };
    });
  },

  failAssistantMessage: (localId, errorMessage) => {
    set((state) => {
      const instanceId = state.activeInstanceId;
      if (!instanceId) {
        return state;
      }
      const instanceChats = state.chats[instanceId];
      if (!instanceChats) {
        return state;
      }
      return {
        chats: {
          ...state.chats,
          [instanceId]: {
            ...instanceChats,
            [state.openMode]: instanceChats[state.openMode].map((msg) =>
              msg.localId === localId
                ? {
                    ...msg,
                    status: EAiChatStatus.Error,
                    errorMessage,
                  }
                : msg
            ),
          },
        },
      };
    });
  },

  removeMessage: (localId) => {
    set((state) => {
      const instanceId = state.activeInstanceId;
      if (!instanceId) {
        return state;
      }
      const instanceChats = state.chats[instanceId];
      if (!instanceChats) {
        return state;
      }
      return {
        chats: {
          ...state.chats,
          [instanceId]: {
            ...instanceChats,
            [state.openMode]: instanceChats[state.openMode].filter((msg) => msg.localId !== localId),
          },
        },
      };
    });
  },

  // Request lifecycle
  setLoading: (loading) => set({ isLoading: loading }),
  setThinkingStageIndex: (index) => set({ thinkingStageIndex: index }),
  setAbortController: (controller) => set({ abortController: controller }),
  setLastRequest: (request) => set({ lastRequest: request }),

  resetRequestState: () => {
    const { abortController } = get();
    if (abortController) {
      abortController.abort();
    }
    set({
      isLoading: false,
      thinkingStageIndex: 0,
      abortController: undefined,
    });
  },

  // Feedback modal
  openFeedbackModal: (localId, value) => {
    set({
      feedbackModal: {
        isOpen: true,
        targetLocalId: localId,
        value,
        otherText: '',
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

  setFeedbackOtherText: (text) => {
    set((state) => ({
      feedbackModal: {
        ...state.feedbackModal,
        otherText: text,
      },
    }));
  },

  applyFeedback: (localId, value, comment) => {
    set((state) => {
      const instanceId = state.activeInstanceId;
      if (!instanceId) {
        return state;
      }
      const instanceChats = state.chats[instanceId];
      if (!instanceChats) {
        return state;
      }
      return {
        chats: {
          ...state.chats,
          [instanceId]: {
            ...instanceChats,
            [state.openMode]: instanceChats[state.openMode].map((msg) =>
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
        },
      };
    });
  },

  clearMessages: () =>
    set((state) => {
      const instanceId = state.activeInstanceId;
      if (!instanceId) {
        return state;
      }
      const instanceChats = state.chats[instanceId];
      if (!instanceChats) {
        return state;
      }
      return {
        chats: {
          ...state.chats,
          [instanceId]: {
            ...instanceChats,
            [state.openMode]: [],
          },
        },
      };
    }),
}));
