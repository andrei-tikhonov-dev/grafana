import { ChatHistoryMessageRoleEnum } from '@architeq/core-api-client';
import { renderHook, act } from '@testing-library/react';

import { type AiChatMessageVM, EAiChatStatus } from '../api/types';
import { type PromptConfig, PROMPT_TYPE } from '../api/aiServiceTypes';
import { usePromptEditorStore } from '../store/promptEditorStore';

jest.mock('../utils/cooldown', () => ({
  createCooldownKey: jest.fn(() => 'test-cooldown-key'),
  isBannerEligible: jest.fn(() => true),
  recordBannerInteraction: jest.fn(),
}));

import { isBannerEligible, recordBannerInteraction } from '../utils/cooldown';

import { useCustomizationBanner } from './useCustomizationBanner';

const OK_ASSISTANT_MESSAGE: AiChatMessageVM = {
  localId: '1',
  role: ChatHistoryMessageRoleEnum.Assistant,
  content: 'Hello',
  status: EAiChatStatus.Ok,
};

const PENDING_ASSISTANT_MESSAGE: AiChatMessageVM = {
  localId: '2',
  role: ChatHistoryMessageRoleEnum.Assistant,
  content: '',
  status: EAiChatStatus.Pending,
};

const USER_MESSAGE: AiChatMessageVM = {
  localId: '3',
  role: ChatHistoryMessageRoleEnum.User,
  content: 'Hi',
  status: EAiChatStatus.Ok,
};

const DEFAULT_CONFIG: PromptConfig = {
  defaultPrompt: { name: 'Default', text: 'Default text' },
  customPrompt: null,
  selectedPromptType: PROMPT_TYPE.Default,
  selectedPromptName: 'Default',
  aiSafeguardsMarkdown: '',
};

const CUSTOM_CONFIG: PromptConfig = {
  ...DEFAULT_CONFIG,
  customPrompt: { name: 'My Prompt', text: 'Custom text' },
  selectedPromptType: PROMPT_TYPE.Custom,
  selectedPromptName: 'My Prompt',
};

describe('useCustomizationBanner', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (isBannerEligible as jest.Mock).mockReturnValue(true);
    usePromptEditorStore.setState({ view: 'chat', promptConfig: null, isConfigLoading: false });
  });

  it('should be visible when all conditions are met', () => {
    const { result } = renderHook(() =>
      useCustomizationBanner([OK_ASSISTANT_MESSAGE], 'user1', 'team1', 'daily', 'proj1', DEFAULT_CONFIG)
    );

    expect(result.current.isVisible).toBe(true);
  });

  it('should be hidden when no assistant messages', () => {
    const { result } = renderHook(() =>
      useCustomizationBanner([USER_MESSAGE], 'user1', 'team1', 'daily', 'proj1', DEFAULT_CONFIG)
    );

    expect(result.current.isVisible).toBe(false);
  });

  it('should be hidden when no OK assistant messages', () => {
    const { result } = renderHook(() =>
      useCustomizationBanner([PENDING_ASSISTANT_MESSAGE], 'user1', 'team1', 'daily', 'proj1', DEFAULT_CONFIG)
    );

    expect(result.current.isVisible).toBe(false);
  });

  it('should be hidden when cooldown is not eligible', () => {
    (isBannerEligible as jest.Mock).mockReturnValue(false);

    const { result } = renderHook(() =>
      useCustomizationBanner([OK_ASSISTANT_MESSAGE], 'user1', 'team1', 'daily', 'proj1', DEFAULT_CONFIG)
    );

    expect(result.current.isVisible).toBe(false);
  });

  it('should be hidden after dismiss and record interaction', () => {
    const { result } = renderHook(() =>
      useCustomizationBanner([OK_ASSISTANT_MESSAGE], 'user1', 'team1', 'daily', 'proj1', DEFAULT_CONFIG)
    );

    expect(result.current.isVisible).toBe(true);

    act(() => {
      result.current.dismiss();
    });

    expect(recordBannerInteraction).toHaveBeenCalledWith('test-cooldown-key');
    expect(result.current.isVisible).toBe(false);
  });

  it('should call openEditor on customize', () => {
    const { result } = renderHook(() =>
      useCustomizationBanner([OK_ASSISTANT_MESSAGE], 'user1', 'team1', 'daily', 'proj1', DEFAULT_CONFIG)
    );

    act(() => {
      result.current.customize();
    });

    expect(usePromptEditorStore.getState().view).toBe('editor');
  });

  it('should NOT record cooldown on customize', () => {
    const { result } = renderHook(() =>
      useCustomizationBanner([OK_ASSISTANT_MESSAGE], 'user1', 'team1', 'daily', 'proj1', DEFAULT_CONFIG)
    );

    act(() => {
      result.current.customize();
    });

    expect(recordBannerInteraction).not.toHaveBeenCalled();
  });

  it('should derive hasCustomPrompt and promptName from custom config', () => {
    const { result } = renderHook(() =>
      useCustomizationBanner([OK_ASSISTANT_MESSAGE], 'user1', 'team1', 'daily', 'proj1', CUSTOM_CONFIG)
    );

    expect(result.current.hasCustomPrompt).toBe(true);
    expect(result.current.promptName).toBe('My Prompt');
  });

  it('should derive hasCustomPrompt false and promptName from default config', () => {
    const { result } = renderHook(() =>
      useCustomizationBanner([OK_ASSISTANT_MESSAGE], 'user1', 'team1', 'daily', 'proj1', DEFAULT_CONFIG)
    );

    expect(result.current.hasCustomPrompt).toBe(false);
    expect(result.current.promptName).toBe('Default');
  });

});
