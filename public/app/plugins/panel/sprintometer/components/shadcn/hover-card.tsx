import { css, cx, keyframes } from '@emotion/css';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import * as React from 'react';

import { theme3 } from '../../theme';

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
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const zoomOut = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
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

const hoverCardContentStyles = css`
  background-color: ${theme3.shadcn.popover};
  color: ${theme3.shadcn.popoverForeground};
  z-index: 50;
  width: ${theme3.tailwind.containerMd};
  transform-origin: center;
  border-radius: ${theme3.tailwind.radiusMd};
  border: ${theme3.custom.border};
  padding: ${theme3.tailwind.spacing4};
  box-shadow: ${theme3.tailwind.shadowMd};
  outline: none;

  &[data-state='open'] {
    animation:
      ${fadeIn} 150ms ease-out,
      ${zoomIn} 150ms ease-out;
  }

  &[data-state='closed'] {
    animation:
      ${fadeOut} 150ms ease-in,
      ${zoomOut} 150ms ease-in;
  }

  &[data-state='open'][data-side='bottom'] {
    animation:
      ${fadeIn} 150ms ease-out,
      ${zoomIn} 150ms ease-out,
      ${slideInFromTop} 150ms ease-out;
  }

  &[data-state='open'][data-side='left'] {
    animation:
      ${fadeIn} 150ms ease-out,
      ${zoomIn} 150ms ease-out,
      ${slideInFromRight} 150ms ease-out;
  }

  &[data-state='open'][data-side='right'] {
    animation:
      ${fadeIn} 150ms ease-out,
      ${zoomIn} 150ms ease-out,
      ${slideInFromLeft} 150ms ease-out;
  }

  &[data-state='open'][data-side='top'] {
    animation:
      ${fadeIn} 150ms ease-out,
      ${zoomIn} 150ms ease-out,
      ${slideInFromBottom} 150ms ease-out;
  }
`;

function HoverCard({ ...props }: React.ComponentProps<typeof HoverCardPrimitive.Root>) {
  return <HoverCardPrimitive.Root data-slot="hover-card" {...props} />;
}

function HoverCardTrigger({ ...props }: React.ComponentProps<typeof HoverCardPrimitive.Trigger>) {
  return <HoverCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />;
}

function HoverCardContent({
  className,
  align = 'center',
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Content>) {
  return (
    <HoverCardPrimitive.Portal data-slot="hover-card-portal">
      <HoverCardPrimitive.Content
        data-slot="hover-card-content"
        align={align}
        sideOffset={sideOffset}
        className={cx(hoverCardContentStyles, className)}
        {...props}
      />
    </HoverCardPrimitive.Portal>
  );
}

export { HoverCard, HoverCardTrigger, HoverCardContent };
