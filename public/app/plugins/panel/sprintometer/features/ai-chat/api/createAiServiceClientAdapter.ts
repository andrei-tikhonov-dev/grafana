import {
  Configuration,
  FrontEndApi,
  type BoardType,
  type PanelId,
  type PresetAction,
  type PromptConfigResponse,
  type PromptObject,
} from '@architeq/ai-api-client';

import type { AiServiceClient } from './aiServiceClient';
import { type AiServiceRequestContext, type PromptConfig, PROMPT_TYPE } from './aiServiceTypes';

/**
 * Maps a PromptConfigResponse from the API to the internal PromptConfig shape.
 */
export function toPromptConfig(response: PromptConfigResponse): PromptConfig {
  const activePrompt = response.prompts.find((p) => p.isActive);
  const defaultPrompt = response.prompts.find((p) => p.promptType === PROMPT_TYPE.Default);
  const customPrompt = response.prompts.find((p) => p.promptType === PROMPT_TYPE.Custom);

  const toPrompt = (p: PromptObject): { name: string; text: string } => ({
    name: p.name,
    text: p.text,
  });

  return {
    defaultPrompt: defaultPrompt ? toPrompt(defaultPrompt) : { name: '', text: '' },
    customPrompt: customPrompt ? toPrompt(customPrompt) : null,
    selectedPromptType: activePrompt?.promptType ?? PROMPT_TYPE.Default,
    selectedPromptName: activePrompt?.name ?? defaultPrompt?.name ?? '',
    aiSafeguardsMarkdown: response.aiSafeguardsMarkdown,
  };
}

/**
 * Creates an adapter that wraps the generated FrontEndApi client,
 * mapping responses to internal types used by the UI.
 */
export function createAiServiceClientAdapter(basePath: string): AiServiceClient {
  const api = new FrontEndApi(new Configuration({ basePath }));

  return {
    getPromptConfig: async (ctx: AiServiceRequestContext): Promise<PromptConfig> => {
      const response = await api.chGetPromptConfig({
        teamId: ctx.teamId,
        boardType: ctx.boardType as BoardType,
        promptConfigRequest: { userId: ctx.userId },
      });
      return toPromptConfig(response);
    },

    savePrompt: async (ctx, data) => {
      return api.chSavePrompt({
        teamId: ctx.teamId,
        boardType: ctx.boardType as BoardType,
        savePromptRequest: { ...data, userId: ctx.userId },
      });
    },

    improvePrompt: async (data) => {
      return api.chImprovePrompt({ improvePromptRequest: data });
    },

    getPresetActions: async (ctx, panelIds): Promise<PresetAction[]> => {
      const response = await api.chGetPresetActions({
        teamId: ctx.teamId,
        boardType: ctx.boardType as BoardType,
        bodyChGetPresetActions: {
          request: { userId: ctx.userId },
          panelIds: panelIds.length > 0 ? (panelIds as PanelId[]) : undefined,
        },
      });
      return response.presetActions;
    },
  };
}
