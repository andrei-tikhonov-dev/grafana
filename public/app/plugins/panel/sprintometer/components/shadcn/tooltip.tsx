import { css, cx, keyframes } from '@emotion/css';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import * as React from 'react';

import { theme3 } from '../../theme/theme';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const zoomIn = keyframes`
  from {
    transform: scale(0.95);
  }
  to {
    transform: scale(1);
  }
`;

const zoomOut = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(0.95);
  }
`;

const slideInFromTop = keyframes`
  from {
    transform: translateY(-0.5rem);
  }
  to {
    transform: translateY(0);
  }
`;

const slideInFromBottom = keyframes`
  from {
    transform: translateY(0.5rem);
  }
  to {
    transform: translateY(0);
  }
`;

const slideInFromLeft = keyframes`
  from {
    transform: translateX(-0.5rem);
  }
  to {
    transform: translateX(0);
  }
`;

const slideInFromRight = keyframes`
  from {
    transform: translateX(0.5rem);
  }
  to {
    transform: translateX(0);
  }
`;

const tooltipContentStyles = css`
  background-color: ${theme3.shadcn.primary};
  color: ${theme3.shadcn.primaryForeground};
  z-index: ${theme3.custom.zIndexTooltip};
  width: fit-content;
  transform-origin: var(--radix-tooltip-content-transform-origin);
  border-radius: ${theme3.tailwind.radiusMd};
  padding: ${parseFloat(theme3.tailwind.spacing) * 1.5}rem ${parseFloat(theme3.tailwind.spacing) * 3}rem;
  font-size: ${theme3.tailwind.textXs};
  line-height: ${theme3.tailwind.textXsLineHeight};
  text-wrap: balance;

  animation:
    ${fadeIn} 150ms ease-out,
    ${zoomIn} 150ms ease-out;

  &[data-state='closed'] {
    animation:
      ${fadeOut} 150ms ease-in,
      ${zoomOut} 150ms ease-in;
  }

  &[data-side='bottom'] {
    animation:
      ${fadeIn} 150ms ease-out,
      ${zoomIn} 150ms ease-out,
      ${slideInFromTop} 150ms ease-out;
  }

  &[data-side='top'] {
    animation:
      ${fadeIn} 150ms ease-out,
      ${zoomIn} 150ms ease-out,
      ${slideInFromBottom} 150ms ease-out;
  }

  &[data-side='left'] {
    animation:
      ${fadeIn} 150ms ease-out,
      ${zoomIn} 150ms ease-out,
      ${slideInFromRight} 150ms ease-out;
  }

  &[data-side='right'] {
    animation:
      ${fadeIn} 150ms ease-out,
      ${zoomIn} 150ms ease-out,
      ${slideInFromLeft} 150ms ease-out;
  }
`;

const tooltipArrowStyles = css`
  background-color: ${theme3.shadcn.primary};
  fill: ${theme3.shadcn.primary};
  z-index: 50;
  width: 0.625rem;
  height: 0.625rem;
  transform: translateY(calc(-50% - 2px)) rotate(45deg);
  border-radius: 2px;
`;

function TooltipProvider({ delayDuration = 0, ...props }: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return <TooltipPrimitive.Provider data-slot="tooltip-provider" delayDuration={delayDuration} {...props} />;
}

function Tooltip({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  );
}

function TooltipTrigger({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cx(tooltipContentStyles, className)}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className={tooltipArrowStyles} />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
