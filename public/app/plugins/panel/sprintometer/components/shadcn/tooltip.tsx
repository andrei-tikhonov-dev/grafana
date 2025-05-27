import { css, cx } from '@emotion/css';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import * as React from 'react';

import { theme } from '../../theme';

const tooltipContentStyles = css`
  background-color: ${theme.colors.semantic.tooltip};
  color: ${theme.colors.semantic.textLite};
  z-index: 50;
  width: fit-content;
  transform-origin: center;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 12px;
  line-height: 16px;
  text-wrap: balance;
  box-shadow: ${theme.shadows.z1};

  animation-duration: 150ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  animation-fill-mode: forwards;

  &[data-state='open'] {
    animation-name: fadeInZoom;
  }

  &[data-state='closed'] {
    animation-name: fadeOutZoom;
  }

  &[data-side='bottom'][data-state='open'] {
    animation-name: fadeInZoomBottom;
  }

  &[data-side='left'][data-state='open'] {
    animation-name: fadeInZoomLeft;
  }

  &[data-side='right'][data-state='open'] {
    animation-name: fadeInZoomRight;
  }

  &[data-side='top'][data-state='open'] {
    animation-name: fadeInZoomTop;
  }

  &[data-side='bottom'][data-state='closed'] {
    animation-name: fadeOutZoomBottom;
  }

  &[data-side='left'][data-state='closed'] {
    animation-name: fadeOutZoomLeft;
  }

  &[data-side='right'][data-state='closed'] {
    animation-name: fadeOutZoomRight;
  }

  &[data-side='top'][data-state='closed'] {
    animation-name: fadeOutZoomTop;
  }

  @keyframes fadeInZoom {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes fadeOutZoom {
    from {
      opacity: 1;
      transform: scale(1);
    }
    to {
      opacity: 0;
      transform: scale(0.95);
    }
  }

  @keyframes fadeInZoomBottom {
    from {
      opacity: 0;
      transform: scale(0.95) translateY(-8px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  @keyframes fadeOutZoomBottom {
    from {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
    to {
      opacity: 0;
      transform: scale(0.95) translateY(-8px);
    }
  }

  @keyframes fadeInZoomLeft {
    from {
      opacity: 0;
      transform: scale(0.95) translateX(8px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateX(0);
    }
  }

  @keyframes fadeOutZoomLeft {
    from {
      opacity: 1;
      transform: scale(1) translateX(0);
    }
    to {
      opacity: 0;
      transform: scale(0.95) translateX(8px);
    }
  }

  @keyframes fadeInZoomRight {
    from {
      opacity: 0;
      transform: scale(0.95) translateX(-8px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateX(0);
    }
  }

  @keyframes fadeOutZoomRight {
    from {
      opacity: 1;
      transform: scale(1) translateX(0);
    }
    to {
      opacity: 0;
      transform: scale(0.95) translateX(-8px);
    }
  }

  @keyframes fadeInZoomTop {
    from {
      opacity: 0;
      transform: scale(0.95) translateY(8px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  @keyframes fadeOutZoomTop {
    from {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
    to {
      opacity: 0;
      transform: scale(0.95) translateY(8px);
    }
  }
`;

const tooltipArrowStyles = css`
  background-color: ${theme.colors.semantic.tooltip};
  fill: ${theme.colors.semantic.tooltip};
  z-index: 50;
  width: 10px;
  height: 10px;
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
