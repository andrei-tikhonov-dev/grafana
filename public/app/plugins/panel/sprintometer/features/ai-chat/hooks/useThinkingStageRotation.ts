import { useEffect, useRef } from 'react';

import { useAiChatContext } from '../AiChatContext';
import { useAiChatStore, EMPTY_REQUEST_STATE } from '../store/aiChatStore';

const THINKING_STAGE_INTERVAL = 3000;

export function useThinkingStageRotation(): string {
  const { instanceId, thinkingStages } = useAiChatContext();
  const isLoading = useAiChatStore((s) => (s.requestStates[instanceId] || EMPTY_REQUEST_STATE).isLoading);
  const thinkingStageIndex = useAiChatStore(
    (s) => (s.requestStates[instanceId] || EMPTY_REQUEST_STATE).thinkingStageIndex
  );
  const { setThinkingStageIndex } = useAiChatStore.getState();
  const thinkingIntervalRef = useRef<number>();

  useEffect(() => {
    if (isLoading) {
      thinkingIntervalRef.current = window.setInterval(() => {
        const state = useAiChatStore.getState();
        const rs = state.requestStates[instanceId] || EMPTY_REQUEST_STATE;
        setThinkingStageIndex(instanceId, (rs.thinkingStageIndex + 1) % thinkingStages.length);
      }, THINKING_STAGE_INTERVAL);

      return () => {
        clearInterval(thinkingIntervalRef.current);
      };
    }
    return undefined;
  }, [isLoading, instanceId, thinkingStages.length, setThinkingStageIndex]);

  return thinkingStages[thinkingStageIndex] || thinkingStages[0];
}
