import type {
  ImprovePromptRequest,
  ImprovePromptResponse,
  PresetAction,
  SavePromptRequest,
  SavePromptResponse,
} from '@architeq/ai-api-client';

import type { AiServiceRequestContext, PromptConfig } from './aiServiceTypes';

/**
 * Save prompt data without userId — the adapter injects userId from context.
 */
export type SavePromptData = Omit<SavePromptRequest, 'userId'>;

/**
 * Client interface for AI service operations.
 *
 * Provides methods for prompt configuration management, AI-powered prompt
 * improvement, and preset action retrieval.
 */
export interface AiServiceClient {
  getPromptConfig(ctx: AiServiceRequestContext): Promise<PromptConfig>;

  savePrompt(ctx: AiServiceRequestContext, data: SavePromptData): Promise<SavePromptResponse>;

  improvePrompt(data: ImprovePromptRequest): Promise<ImprovePromptResponse>;

  getPresetActions(ctx: AiServiceRequestContext, panelIds: string[]): Promise<PresetAction[]>;
}
