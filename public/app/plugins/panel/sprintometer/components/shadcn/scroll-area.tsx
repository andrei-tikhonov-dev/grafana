import { css, cx } from '@emotion/css';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import * as React from 'react';

import { theme } from '../../theme';

const scrollAreaRootStyles = css`
  position: relative;
`;

const scrollAreaViewportStyles = css`
  width: 100%;
  height: 100%;
  border-radius: inherit;
  transition: color, box-shadow;
  outline: none;

  &:focus-visible {
    box-shadow: 0 0 0 3px ${theme.colors.semantic.ring};
    outline: 1px solid;
  }
`;

const scrollBarBaseStyles = css`
  display: flex;
  touch-action: none;
  padding: 1px;
  transition: colors;
  user-select: none;
`;

const scrollBarVerticalStyles = css`
  height: 100%;
  width: 0.625rem;
  border-left: 1px solid transparent;
`;

const scrollBarHorizontalStyles = css`
  height: 0.625rem;
  flex-direction: column;
  border-top: 1px solid transparent;
`;

const scrollAreaThumbStyles = css`
  background-color: ${theme.colors.semantic.border};
  position: relative;
  flex: 1;
  border-radius: calc(infinity * 1px);
`;

function ScrollArea({ className, children, ...props }: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) {
  return (
    <ScrollAreaPrimitive.Root data-slot="scroll-area" className={cx(scrollAreaRootStyles, className)} {...props}>
      <ScrollAreaPrimitive.Viewport data-slot="scroll-area-viewport" className={scrollAreaViewportStyles}>
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
}

function ScrollBar({
  className,
  orientation = 'vertical',
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) {
  const orientationStyles = orientation === 'vertical' ? scrollBarVerticalStyles : scrollBarHorizontalStyles;

  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={cx(scrollBarBaseStyles, orientationStyles, className)}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb data-slot="scroll-area-thumb" className={scrollAreaThumbStyles} />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  );
}

export { ScrollArea, ScrollBar };
