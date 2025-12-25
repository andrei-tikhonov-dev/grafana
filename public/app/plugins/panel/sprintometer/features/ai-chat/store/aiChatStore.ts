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
  openMode: EAiChatMode;

  // Messages
  chats: Record<EAiChatMode, AiChatMessageVM[]>;

  // Request lifecycle
  isLoading: boolean;
  thinkingStageIndex: number;
  abortController?: AbortController;
  lastRequest?: LastRequest;

  // Feedback modal
  feedbackModal: FeedbackModalState;

  // Actions
  open: (mode: EAiChatMode, drawerId: string) => void;
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

export const useAiChatStore = create<AiChatState>((set, get) => ({
  // Initial state
  activeDrawerId: undefined,
  openMode: EAiChatMode.General,
  chats: {
    [EAiChatMode.General]: [],
    [EAiChatMode.AutoSummary]: [],
  },
  isLoading: false,
  thinkingStageIndex: 0,
  abortController: undefined,
  lastRequest: undefined,
  feedbackModal: {
    isOpen: false,
  },

  // Drawer actions
  open: (mode, drawerId) => set({ activeDrawerId: drawerId, openMode: mode }),
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
    set((state) => ({
      chats: {
        ...state.chats,
        [state.openMode]: [...state.chats[state.openMode], message],
      },
    }));
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
    set((state) => ({
      chats: {
        ...state.chats,
        [state.openMode]: [...state.chats[state.openMode], message],
      },
    }));
    return localId;
  },

  resolveAssistantMessage: (localId, messageId, content, suggestedPrompts) => {
    set((state) => ({
      chats: {
        ...state.chats,
        [state.openMode]: state.chats[state.openMode].map((msg) =>
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
    }));
  },

  failAssistantMessage: (localId, errorMessage) => {
    set((state) => ({
      chats: {
        ...state.chats,
        [state.openMode]: state.chats[state.openMode].map((msg) =>
          msg.localId === localId
            ? {
                ...msg,
                status: EAiChatStatus.Error,
                errorMessage,
              }
            : msg
        ),
      },
    }));
  },

  removeMessage: (localId) => {
    set((state) => ({
      chats: {
        ...state.chats,
        [state.openMode]: state.chats[state.openMode].filter((msg) => msg.localId !== localId),
      },
    }));
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
    set((state) => ({
      chats: {
        ...state.chats,
        [state.openMode]: state.chats[state.openMode].map((msg) =>
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
    }));
  },

  clearMessages: () =>
    set((state) => ({
      chats: {
        ...state.chats,
        [state.openMode]: [],
      },
    })),
}));
