import { useNotifications } from 'hooks/useNotifications';
import { useCallback, useEffect, useRef, useState } from 'react';

import { useAiChatContext } from '../AiChatContext';
import type { AiServiceClient } from '../api/aiServiceClient';
import { type AiServiceRequestContext, type Prompt, PROMPT_TYPE } from '../api/aiServiceTypes';
import { usePromptEditorStore } from '../store/promptEditorStore';
import { createCooldownKey, recordBannerInteraction } from '../utils/cooldown';

export const MIN_TEXT_LENGTH = 20;

interface UsePromptEditorResult {
  name: string;
  text: string;
  setName: (name: string) => void;
  setText: (text: string) => void;
  hasChanges: boolean;
  isValid: boolean;
  canSave: boolean;
  canImprove: boolean;
  showRestoreDefault: boolean;
  save: () => void;
  improve: () => void;
  restoreDefault: () => void;
  cancel: () => void;
  isSaving: boolean;
  isImproving: boolean;
  isConfigLoading: boolean;
}

export function usePromptEditor(client: AiServiceClient, ctx: AiServiceRequestContext): UsePromptEditorResult {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isImproving, setIsImproving] = useState(false);

  const isMountedRef = useRef(true);
  const { notifyError, notifySuccess } = useNotifications();
  const { project } = useAiChatContext();

  const { promptConfig, isConfigLoading } = usePromptEditorStore();
  const { setPromptConfig, setConfigLoading, closeEditor } = usePromptEditorStore.getState();

  // Load config on mount.
  // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional mount-only fetch: client and ctx are referentially unstable
  useEffect(() => {
    isMountedRef.current = true;
    let cancelled = false;

    setConfigLoading(true);

    client
      .getPromptConfig(ctx)
      .then((config) => {
        if (cancelled) {
          return;
        }
        setPromptConfig(config);
        const source = config.customPrompt ?? config.defaultPrompt;
        setName(source.name);
        setText(source.text);
      })
      .catch((err) => {
        if (cancelled) {
          return;
        }
        notifyError(['Failed to load prompt configuration', (err as Error).message]);
        closeEditor();
      })
      .finally(() => {
        if (!cancelled) {
          setConfigLoading(false);
        }
      });

    return () => {
      cancelled = true;
      isMountedRef.current = false;
    };
  }, []);

  const sourcePrompt: Prompt | null = promptConfig ? promptConfig.customPrompt ?? promptConfig.defaultPrompt : null;

  const hasChanges = sourcePrompt ? name !== sourcePrompt.name || text !== sourcePrompt.text : false;
  const isValid = text.length >= MIN_TEXT_LENGTH;
  const canSave = isValid && hasChanges && !isSaving && !isImproving;
  const canImprove = isValid && !isSaving && !isImproving;
  const showRestoreDefault = promptConfig?.selectedPromptType === PROMPT_TYPE.Custom || hasChanges;

  const save = useCallback(async () => {
    setIsSaving(true);
    try {
      await client.savePrompt(ctx, { name, text });
      if (!isMountedRef.current) {
        return;
      }
      notifySuccess(['Prompt saved successfully']);
      if (promptConfig) {
        setPromptConfig({
          ...promptConfig,
          customPrompt: { name, text },
          selectedPromptType: PROMPT_TYPE.Custom,
          selectedPromptName: name,
        });
      }
      closeEditor();
      const cooldownKey = createCooldownKey(ctx.userId, ctx.teamId, ctx.boardType, project);
      recordBannerInteraction(cooldownKey);
    } catch (err) {
      if (!isMountedRef.current) {
        return;
      }
      notifyError(['Failed to save prompt', (err as Error).message]);
    } finally {
      if (isMountedRef.current) {
        setIsSaving(false);
      }
    }
  }, [client, ctx, name, text, notifySuccess, notifyError, closeEditor, promptConfig, setPromptConfig]);

  const improve = useCallback(async () => {
    setIsImproving(true);
    try {
      const response = await client.improvePrompt({ text });
      if (!isMountedRef.current) {
        return;
      }
      setText(response.text);
    } catch (err) {
      if (!isMountedRef.current) {
        return;
      }
      notifyError(['Failed to improve prompt', (err as Error).message]);
    } finally {
      if (isMountedRef.current) {
        setIsImproving(false);
      }
    }
  }, [client, text, notifyError]);

  const restoreDefault = useCallback(() => {
    if (promptConfig?.defaultPrompt) {
      setName(promptConfig.defaultPrompt.name);
      setText(promptConfig.defaultPrompt.text);
    }
  }, [promptConfig]);

  const cancel = useCallback(() => {
    closeEditor();
  }, [closeEditor]);

  return {
    name,
    text,
    setName,
    setText,
    hasChanges,
    isValid,
    canSave,
    canImprove,
    showRestoreDefault,
    save,
    improve,
    restoreDefault,
    cancel,
    isSaving,
    isImproving,
    isConfigLoading,
  };
}
