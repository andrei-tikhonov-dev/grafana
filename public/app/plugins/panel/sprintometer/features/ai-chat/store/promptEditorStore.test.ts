import { type PromptConfig, PROMPT_TYPE } from '../api/aiServiceTypes';

import { usePromptEditorStore } from './promptEditorStore';

const MOCK_CONFIG: PromptConfig = {
  defaultPrompt: { name: 'Default', text: 'You are a helpful assistant.' },
  customPrompt: null,
  selectedPromptType: PROMPT_TYPE.Default,
  selectedPromptName: 'Default',
  aiSafeguardsMarkdown: '# Safeguards',
};

describe('promptEditorStore', () => {
  beforeEach(() => {
    usePromptEditorStore.setState({ view: 'chat', promptConfig: null, isConfigLoading: false });
  });

  it('has correct initial state', () => {
    const state = usePromptEditorStore.getState();

    expect(state.view).toBe('chat');
    expect(state.promptConfig).toBeNull();
    expect(state.isConfigLoading).toBe(false);
  });

  it('openEditor sets view to editor', () => {
    usePromptEditorStore.getState().openEditor();

    expect(usePromptEditorStore.getState().view).toBe('editor');
  });

  it('closeEditor sets view to chat and clears promptConfig', () => {
    usePromptEditorStore.setState({ view: 'editor', promptConfig: MOCK_CONFIG });

    usePromptEditorStore.getState().closeEditor();

    const state = usePromptEditorStore.getState();
    expect(state.view).toBe('chat');
    expect(state.promptConfig).toBeNull();
  });

  it('setPromptConfig stores config', () => {
    usePromptEditorStore.getState().setPromptConfig(MOCK_CONFIG);

    expect(usePromptEditorStore.getState().promptConfig).toEqual(MOCK_CONFIG);
  });

  it('setConfigLoading toggles flag', () => {
    usePromptEditorStore.getState().setConfigLoading(true);
    expect(usePromptEditorStore.getState().isConfigLoading).toBe(true);

    usePromptEditorStore.getState().setConfigLoading(false);
    expect(usePromptEditorStore.getState().isConfigLoading).toBe(false);
  });
});
