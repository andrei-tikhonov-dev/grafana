import { renderHook, act } from '@testing-library/react';
import React from 'react';

import { AiChatProvider, type AiChatContextValue } from '../AiChatContext';
import { useAiChatStore } from '../store/aiChatStore';
import { usePromptEditorStore } from '../store/promptEditorStore';

jest.mock('../utils/cooldown', () => ({
  createCooldownKey: jest.fn(() => 'test-cooldown-key'),
  isBannerEligible: jest.fn(() => true),
  recordBannerInteraction: jest.fn(),
}));

import { isBannerEligible, recordBannerInteraction } from '../utils/cooldown';

import { useDrawerHeader } from './useDrawerHeader';

const INSTANCE_ID = 'dash-1';

const MOCK_CONTEXT: AiChatContextValue = {
  instanceId: INSTANCE_ID,
  client: {} as AiChatContextValue['client'],
  aiServiceClient: {} as AiChatContextValue['aiServiceClient'],
  promptConfig: null,
  strings: {} as AiChatContextValue['strings'],
  thinkingStages: [],
  feedbackReasons: { up: [], down: [] },
  startPrompts: [],
  teamId: 'team1',
  project: 'proj1',
  userId: 'user1',
  boardType: 'daily',
};

function createWrapper(): React.FC<{ children: React.ReactNode }> {
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) =>
    React.createElement(AiChatProvider, { value: MOCK_CONTEXT }, children);
  Wrapper.displayName = 'TestAiChatWrapper';
  return Wrapper;
}

describe('useDrawerHeader', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (isBannerEligible as jest.Mock).mockReturnValue(true);
    usePromptEditorStore.setState({ view: 'chat', promptConfig: null, isConfigLoading: false });
    useAiChatStore.setState({
      chats: { [INSTANCE_ID]: [] },
      requestStates: {},
    });
  });

  it('should return view "chat" by default', () => {
    const { result } = renderHook(() => useDrawerHeader(INSTANCE_ID), {
      wrapper: createWrapper(),
    });

    expect(result.current.view).toBe('chat');
  });

  it('should change view to "editor" when openEditor is called', () => {
    const { result } = renderHook(() => useDrawerHeader(INSTANCE_ID), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.openEditor();
    });

    expect(result.current.view).toBe('editor');
  });

  it('should return view to "chat" when openChat is called', () => {
    usePromptEditorStore.setState({ view: 'editor' });

    const { result } = renderHook(() => useDrawerHeader(INSTANCE_ID), {
      wrapper: createWrapper(),
    });

    expect(result.current.view).toBe('editor');

    act(() => {
      result.current.openChat();
    });

    expect(result.current.view).toBe('chat');
  });

  it('should open new chat dialog', () => {
    const { result } = renderHook(() => useDrawerHeader(INSTANCE_ID), {
      wrapper: createWrapper(),
    });

    expect(result.current.newChatDialog.isOpen).toBe(false);

    act(() => {
      result.current.newChatDialog.open();
    });

    expect(result.current.newChatDialog.isOpen).toBe(true);
  });

  it('should clear messages and reset request state on confirm', () => {
    useAiChatStore.getState().appendUserMessage(INSTANCE_ID, 'Hello');
    expect(useAiChatStore.getState().chats[INSTANCE_ID]).toHaveLength(1);

    const { result } = renderHook(() => useDrawerHeader(INSTANCE_ID), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.newChatDialog.open();
    });

    act(() => {
      result.current.newChatDialog.confirm();
    });

    expect(result.current.newChatDialog.isOpen).toBe(false);
    expect(useAiChatStore.getState().chats[INSTANCE_ID]).toHaveLength(0);
  });

  it('should close dialog without clearing messages on cancel', () => {
    useAiChatStore.getState().appendUserMessage(INSTANCE_ID, 'Hello');

    const { result } = renderHook(() => useDrawerHeader(INSTANCE_ID), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.newChatDialog.open();
    });

    act(() => {
      result.current.newChatDialog.cancel();
    });

    expect(result.current.newChatDialog.isOpen).toBe(false);
    expect(useAiChatStore.getState().chats[INSTANCE_ID]).toHaveLength(1);
  });

  it('should increment cooldown on new chat confirm when cooldown is active', () => {
    (isBannerEligible as jest.Mock).mockReturnValue(false);

    useAiChatStore.getState().appendUserMessage(INSTANCE_ID, 'Hello');

    const { result } = renderHook(() => useDrawerHeader(INSTANCE_ID), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.newChatDialog.confirm();
    });

    expect(recordBannerInteraction).toHaveBeenCalledWith('test-cooldown-key');
  });

  it('should NOT increment cooldown on new chat confirm when banner is eligible', () => {
    (isBannerEligible as jest.Mock).mockReturnValue(true);

    useAiChatStore.getState().appendUserMessage(INSTANCE_ID, 'Hello');

    const { result } = renderHook(() => useDrawerHeader(INSTANCE_ID), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.newChatDialog.confirm();
    });

    expect(recordBannerInteraction).not.toHaveBeenCalled();
  });
});
