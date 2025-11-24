import { css, cx } from '@emotion/css';
import React from 'react';

import { theme3 } from '../../../theme';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../shadcn/tooltip';

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  delayDuration?: number;
  contentClassName?: string;
  disabled?: boolean;
}

const contentStyles = css`
  max-width: ${theme3.tailwind.container2xl};
  pointer-events: none;
`;

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
        <TooltipContent className={cx(contentStyles, contentClassName)}>{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
