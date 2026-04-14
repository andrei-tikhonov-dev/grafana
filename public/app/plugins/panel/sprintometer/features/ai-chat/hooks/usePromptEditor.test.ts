import { renderHook, act, waitFor } from '@testing-library/react';

import type { AiServiceClient } from '../api/aiServiceClient';
import { type AiServiceRequestContext, type PromptConfig, PROMPT_TYPE } from '../api/aiServiceTypes';
import { usePromptEditorStore } from '../store/promptEditorStore';

import { usePromptEditor } from './usePromptEditor';

const mockNotifyError = jest.fn();
const mockNotifySuccess = jest.fn();

jest.mock('../../../hooks/useNotifications', () => ({
  useNotifications: () => ({
    notifyError: mockNotifyError,
    notifySuccess: mockNotifySuccess,
  }),
}));

jest.mock('../utils/cooldown', () => ({
  createCooldownKey: jest.fn(() => 'test-cooldown-key'),
  recordBannerInteraction: jest.fn(),
}));

jest.mock('../AiChatContext', () => ({
  useAiChatContext: () => ({ project: 'proj1' }),
}));

import { recordBannerInteraction } from '../utils/cooldown';

const CTX: AiServiceRequestContext = { teamId: 'team1', boardType: 'daily', userId: 'user1' };

const DEFAULT_PROMPT = { name: 'Default', text: 'Default prompt text that is at least twenty chars' };
const CUSTOM_PROMPT = { name: 'Custom', text: 'Custom prompt text that is at least twenty chars' };

function makeConfig(overrides: Partial<PromptConfig> = {}): PromptConfig {
  return {
    defaultPrompt: DEFAULT_PROMPT,
    customPrompt: null,
    selectedPromptType: PROMPT_TYPE.Default,
    selectedPromptName: 'Default',
    aiSafeguardsMarkdown: '',
    ...overrides,
  };
}

function createMockClient(overrides: Partial<AiServiceClient> = {}): AiServiceClient {
  return {
    getPromptConfig: jest.fn().mockResolvedValue(makeConfig()),
    savePrompt: jest.fn().mockResolvedValue({ id: '1', name: 'Saved', text: 'saved text' }),
    improvePrompt: jest.fn().mockResolvedValue({
      text: 'Improved text that is long enough',
      reasoning: 'test reasoning',
      missingInformation: [],
      overallPromptScore: 8,
    }),
    getPresetActions: jest.fn().mockResolvedValue([]),
    ...overrides,
  };
}

describe('usePromptEditor', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    usePromptEditorStore.setState({
      view: 'editor',
      promptConfig: null,
      isConfigLoading: false,
    });
  });

  it('should populate form from getPromptConfig response', async () => {
    const client = createMockClient();
    const { result } = renderHook(() => usePromptEditor(client, CTX));

    await waitFor(() => {
      expect(result.current.isConfigLoading).toBe(false);
    });

    expect(result.current.name).toBe(DEFAULT_PROMPT.name);
    expect(result.current.text).toBe(DEFAULT_PROMPT.text);
  });

  it('should call notifyError and closeEditor on config loading error', async () => {
    const client = createMockClient({
      getPromptConfig: jest.fn().mockRejectedValue(new Error('Network error')),
    });

    renderHook(() => usePromptEditor(client, CTX));

    await waitFor(() => {
      expect(mockNotifyError).toHaveBeenCalledWith(['Failed to load prompt configuration', 'Network error']);
    });

    expect(usePromptEditorStore.getState().view).toBe('chat');
  });

  it('should init form from customPrompt when available', async () => {
    const config = makeConfig({
      customPrompt: CUSTOM_PROMPT,
      selectedPromptType: PROMPT_TYPE.Custom,
    });
    const client = createMockClient({
      getPromptConfig: jest.fn().mockResolvedValue(config),
    });

    const { result } = renderHook(() => usePromptEditor(client, CTX));

    await waitFor(() => {
      expect(result.current.isConfigLoading).toBe(false);
    });

    expect(result.current.name).toBe(CUSTOM_PROMPT.name);
    expect(result.current.text).toBe(CUSTOM_PROMPT.text);
  });

  it('should init form from defaultPrompt when no custom prompt', async () => {
    const client = createMockClient();
    const { result } = renderHook(() => usePromptEditor(client, CTX));

    await waitFor(() => {
      expect(result.current.isConfigLoading).toBe(false);
    });

    expect(result.current.name).toBe(DEFAULT_PROMPT.name);
    expect(result.current.text).toBe(DEFAULT_PROMPT.text);
  });

  it('should report isValid false when text < 20 chars', async () => {
    const client = createMockClient();
    const { result } = renderHook(() => usePromptEditor(client, CTX));

    await waitFor(() => {
      expect(result.current.isConfigLoading).toBe(false);
    });

    act(() => {
      result.current.setText('short');
    });

    expect(result.current.isValid).toBe(false);
    expect(result.current.canSave).toBe(false);
    expect(result.current.canImprove).toBe(false);
  });

  it('should report isValid true when text >= 20 chars', async () => {
    const client = createMockClient();
    const { result } = renderHook(() => usePromptEditor(client, CTX));

    await waitFor(() => {
      expect(result.current.isConfigLoading).toBe(false);
    });

    act(() => {
      result.current.setText('A text that is at least twenty characters long');
    });

    expect(result.current.isValid).toBe(true);
  });

  it('should detect hasChanges after editing', async () => {
    const client = createMockClient();
    const { result } = renderHook(() => usePromptEditor(client, CTX));

    await waitFor(() => {
      expect(result.current.isConfigLoading).toBe(false);
    });

    expect(result.current.hasChanges).toBe(false);

    act(() => {
      result.current.setName('Changed name');
    });

    expect(result.current.hasChanges).toBe(true);
  });

  it('should detect no changes after resetting to original', async () => {
    const client = createMockClient();
    const { result } = renderHook(() => usePromptEditor(client, CTX));

    await waitFor(() => {
      expect(result.current.isConfigLoading).toBe(false);
    });

    act(() => {
      result.current.setName('Changed');
    });
    expect(result.current.hasChanges).toBe(true);

    act(() => {
      result.current.setName(DEFAULT_PROMPT.name);
    });
    expect(result.current.hasChanges).toBe(false);
  });

  it('should save prompt, notify success, close editor, and record cooldown', async () => {
    const client = createMockClient();
    const { result } = renderHook(() => usePromptEditor(client, CTX));

    await waitFor(() => {
      expect(result.current.isConfigLoading).toBe(false);
    });

    act(() => {
      result.current.setName('New name');
    });

    await act(async () => {
      result.current.save();
    });

    expect(client.savePrompt).toHaveBeenCalledWith(CTX, {
      name: 'New name',
      text: DEFAULT_PROMPT.text,
    });
    expect(mockNotifySuccess).toHaveBeenCalledWith(['Prompt saved successfully']);
    expect(usePromptEditorStore.getState().view).toBe('chat');
    expect(recordBannerInteraction).toHaveBeenCalledWith('test-cooldown-key');
  });

  it('should notify error and stay in editor on save failure', async () => {
    const client = createMockClient({
      savePrompt: jest.fn().mockRejectedValue(new Error('Save failed')),
    });
    const { result } = renderHook(() => usePromptEditor(client, CTX));

    await waitFor(() => {
      expect(result.current.isConfigLoading).toBe(false);
    });

    act(() => {
      // Re-open editor since closeEditor might have been called during failed save
      usePromptEditorStore.setState({ view: 'editor' });
    });

    act(() => {
      result.current.setName('New name');
    });

    await act(async () => {
      result.current.save();
    });

    expect(mockNotifyError).toHaveBeenCalledWith(['Failed to save prompt', 'Save failed']);
  });

  it('should update text on successful improve', async () => {
    const client = createMockClient();
    const { result } = renderHook(() => usePromptEditor(client, CTX));

    await waitFor(() => {
      expect(result.current.isConfigLoading).toBe(false);
    });

    await act(async () => {
      result.current.improve();
    });

    expect(client.improvePrompt).toHaveBeenCalledWith({ text: DEFAULT_PROMPT.text });
    expect(result.current.text).toBe('Improved text that is long enough');
  });

  it('should notify error and keep text unchanged on improve failure', async () => {
    const client = createMockClient({
      improvePrompt: jest.fn().mockRejectedValue(new Error('Improve failed')),
    });
    const { result } = renderHook(() => usePromptEditor(client, CTX));

    await waitFor(() => {
      expect(result.current.isConfigLoading).toBe(false);
    });

    const originalText = result.current.text;

    await act(async () => {
      result.current.improve();
    });

    expect(mockNotifyError).toHaveBeenCalledWith(['Failed to improve prompt', 'Improve failed']);
    expect(result.current.text).toBe(originalText);
  });

  it('should restore default prompt values', async () => {
    const config = makeConfig({
      customPrompt: CUSTOM_PROMPT,
      selectedPromptType: PROMPT_TYPE.Custom,
    });
    const client = createMockClient({
      getPromptConfig: jest.fn().mockResolvedValue(config),
    });

    const { result } = renderHook(() => usePromptEditor(client, CTX));

    await waitFor(() => {
      expect(result.current.isConfigLoading).toBe(false);
    });

    expect(result.current.name).toBe(CUSTOM_PROMPT.name);

    act(() => {
      result.current.restoreDefault();
    });

    expect(result.current.name).toBe(DEFAULT_PROMPT.name);
    expect(result.current.text).toBe(DEFAULT_PROMPT.text);
  });

  it('should close editor on cancel without API calls', async () => {
    const client = createMockClient();
    const { result } = renderHook(() => usePromptEditor(client, CTX));

    await waitFor(() => {
      expect(result.current.isConfigLoading).toBe(false);
    });

    act(() => {
      result.current.cancel();
    });

    expect(usePromptEditorStore.getState().view).toBe('chat');
    expect(client.savePrompt).not.toHaveBeenCalled();
    expect(client.improvePrompt).not.toHaveBeenCalled();
  });

  it('should show restoreDefault when custom prompt is selected', async () => {
    const config = makeConfig({
      customPrompt: CUSTOM_PROMPT,
      selectedPromptType: PROMPT_TYPE.Custom,
    });
    const client = createMockClient({
      getPromptConfig: jest.fn().mockResolvedValue(config),
    });

    const { result } = renderHook(() => usePromptEditor(client, CTX));

    await waitFor(() => {
      expect(result.current.isConfigLoading).toBe(false);
    });

    expect(result.current.showRestoreDefault).toBe(true);
  });

  it('should show restoreDefault when changes exist', async () => {
    const client = createMockClient();
    const { result } = renderHook(() => usePromptEditor(client, CTX));

    await waitFor(() => {
      expect(result.current.isConfigLoading).toBe(false);
    });

    expect(result.current.showRestoreDefault).toBe(false);

    act(() => {
      result.current.setName('Different name');
    });

    expect(result.current.showRestoreDefault).toBe(true);
  });
});
