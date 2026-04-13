import { ChatHistoryMessageRoleEnum } from '@architeq/core-api-client';
import { useState, useCallback, useMemo } from 'react';

import { type PromptConfig, PROMPT_TYPE } from '../api/aiServiceTypes';
import { type AiChatMessageVM, EAiChatStatus } from '../api/types';
import { usePromptEditorStore } from '../store/promptEditorStore';
import { createCooldownKey, isBannerEligible, recordBannerInteraction } from '../utils/cooldown';

interface UseCustomizationBannerResult {
  isVisible: boolean;
  promptName: string;
  hasCustomPrompt: boolean;
  dismiss: () => void;
  customize: () => void;
}

export function useCustomizationBanner(
  messages: AiChatMessageVM[],
  userId: string,
  teamId: string,
  boardType: string,
  project: string,
  promptConfig: PromptConfig | null
): UseCustomizationBannerResult {
  const [isDismissed, setIsDismissed] = useState(false);
  const openEditor = usePromptEditorStore((s) => s.openEditor);

  const cooldownKey = useMemo(
    () => createCooldownKey(userId, teamId, boardType, project),
    [userId, teamId, boardType, project]
  );

  const hasOkAssistantMessage = messages.some(
    (m) => m.role === ChatHistoryMessageRoleEnum.Assistant && m.status === EAiChatStatus.Ok
  );

  const hasCustomPrompt = promptConfig?.selectedPromptType === PROMPT_TYPE.Custom;
  const promptName = promptConfig?.selectedPromptName ?? '';

  const isVisible = hasOkAssistantMessage && isBannerEligible(cooldownKey) && !isDismissed;

  const dismiss = useCallback(() => {
    recordBannerInteraction(cooldownKey);
    setIsDismissed(true);
  }, [cooldownKey]);

  const customize = useCallback(() => {
    openEditor();
  }, [openEditor]);

  return {
    isVisible,
    promptName,
    hasCustomPrompt,
    dismiss,
    customize,
  };
}
