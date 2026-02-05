import { Sparkles } from 'lucide-react';
import React from 'react';

import { TAiData } from '../../../types';
import { UiAiViewer } from '../ai-viewer/UiAiViewer';
import { UiButton } from '../button/UiButton';

export interface UiAiHelperToggleProps {
  aiData?: TAiData | null;
  onOpenChat: () => void;
  viewerLabel?: string;
  buttonLabel?: string;
}

export const UiAiHelperToggle: React.FC<UiAiHelperToggleProps> = ({
  aiData,
  onOpenChat,
  viewerLabel = 'AI data',
  buttonLabel = 'AI helper',
}) => {
  if (aiData) {
    return <UiAiViewer title={aiData.title} content={aiData.content} label={viewerLabel} />;
  }
  return (
    <UiButton onClick={onOpenChat} variant="ai">
      <Sparkles />
      {buttonLabel}
    </UiButton>
  );
};
