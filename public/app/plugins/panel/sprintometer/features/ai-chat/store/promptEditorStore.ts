import { create } from 'zustand';

import type { PromptConfig } from '../api/aiServiceTypes';

interface PromptEditorState {
  view: 'chat' | 'editor';
  promptConfig: PromptConfig | null;
  isConfigLoading: boolean;
  openEditor: () => void;
  closeEditor: () => void;
  setPromptConfig: (config: PromptConfig) => void;
  setConfigLoading: (loading: boolean) => void;
}

export const usePromptEditorStore = create<PromptEditorState>((set) => ({
  view: 'chat',
  promptConfig: null,
  isConfigLoading: false,

  openEditor: () => set({ view: 'editor' }),

  closeEditor: () => set({ view: 'chat', promptConfig: null }),

  setPromptConfig: (config: PromptConfig) => set({ promptConfig: config }),

  setConfigLoading: (loading: boolean) => set({ isConfigLoading: loading }),
}));
