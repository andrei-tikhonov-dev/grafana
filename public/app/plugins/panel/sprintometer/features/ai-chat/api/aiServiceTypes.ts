export type {
  BoardType,
  ImprovePromptRequest,
  ImprovePromptResponse,
  PanelId,
  PresetAction,
  PromptConfigResponse,
  PromptObject,
  SavePromptRequest,
  SavePromptResponse,
} from '@architeq/ai-api-client';

export { PanelId as EAiPanelId } from '@architeq/ai-api-client';

/**
 * Prompt type constants matching PromptObject.promptType values from the API.
 */
export const PROMPT_TYPE = {
  Default: 'default',
  Custom: 'custom',
} as const;

/**
 * A named prompt with its text content.
 */
export interface Prompt {
  name: string;
  text: string;
}

/**
 * Internal derived prompt configuration used throughout the UI.
 * Mapped from PromptConfigResponse via toPromptConfig().
 */
export interface PromptConfig {
  defaultPrompt: Prompt;
  customPrompt: Prompt | null;
  selectedPromptType: string;
  selectedPromptName: string;
  aiSafeguardsMarkdown: string;
}

/**
 * Context required for AI service requests scoped to a team/board/user.
 */
export interface AiServiceRequestContext {
  teamId: string;
  boardType: string;
  userId: string;
}
