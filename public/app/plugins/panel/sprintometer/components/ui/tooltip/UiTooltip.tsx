import React from 'react';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../shadcn/tooltip';

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  delayDuration?: number;
  contentClassName?: string;
  disabled?: boolean;
}

export const UiTooltip: React.FC<TooltipProps> = ({
  content,
  children,
  delayDuration = 300,
  contentClassName,
  disabled,
}) => {
  if (disabled) {
    return children;
  }

  return (
    <TooltipProvider delayDuration={delayDuration}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className={contentClassName}>{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
