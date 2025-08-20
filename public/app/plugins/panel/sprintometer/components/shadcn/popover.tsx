import { css, cx, keyframes } from '@emotion/css';
import * as PopoverPrimitive from '@radix-ui/react-popover';
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

const popoverContentStyles = css`
  background-color: ${theme3.shadcn.popover};
  color: ${theme3.shadcn.popoverForeground};
  z-index: ${theme3.custom.zIndexPopover};
  width: 18rem;
  border-radius: ${theme3.tailwind.radiusMd};
  border: 1px solid ${theme3.shadcn.border};
  padding: ${parseFloat(theme3.tailwind.spacing) * 4}rem;
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

  &[data-state='open'][data-side='top'] {
    animation:
      ${fadeIn} 150ms ease-out,
      ${zoomIn} 150ms ease-out,
      ${slideInFromBottom} 150ms ease-out;
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
`;

function Popover({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

function PopoverTrigger({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

function PopoverContent({
  className,
  align = 'center',
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cx(popoverContentStyles, className)}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
}

function PopoverAnchor({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />;
}

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
