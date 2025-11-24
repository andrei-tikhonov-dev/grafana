import { css, cx, keyframes } from '@emotion/css';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import * as React from 'react';
import ReactDOM from 'react-dom';

import { typographyStyles, theme3 } from '../../theme';

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

const baseTooltipContentStyles = css`
  background-color: ${theme3.shadcn.primary};
  color: ${theme3.shadcn.primaryForeground};
  z-index: ${theme3.custom.zIndexTooltip};
  width: fit-content;
  border-radius: ${theme3.tailwind.radiusMd};
  padding: ${theme3.tailwind.spacing2} ${theme3.tailwind.spacing4};
  text-wrap: balance;
  ${typographyStyles.bodySmall}
`;

const tooltipContentStyles = css`
  ${baseTooltipContentStyles};

  animation: ${fadeIn} 150ms ease-out, ${zoomIn} 150ms ease-out;

  &[data-state='closed'] {
    animation: ${fadeOut} 150ms ease-in, ${zoomOut} 150ms ease-in;
  }

  &[data-side='bottom'] {
    animation: ${fadeIn} 150ms ease-out, ${zoomIn} 150ms ease-out, ${slideInFromTop} 150ms ease-out;
  }

  &[data-side='top'] {
    animation: ${fadeIn} 150ms ease-out, ${zoomIn} 150ms ease-out, ${slideInFromBottom} 150ms ease-out;
  }

  &[data-side='left'] {
    animation: ${fadeIn} 150ms ease-out, ${zoomIn} 150ms ease-out, ${slideInFromRight} 150ms ease-out;
  }

  &[data-side='right'] {
    animation: ${fadeIn} 150ms ease-out, ${zoomIn} 150ms ease-out, ${slideInFromLeft} 150ms ease-out;
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

const cursorTooltipStyles = css`
  ${baseTooltipContentStyles};
  position: fixed;
  pointer-events: none;
  opacity: 0;
  transform: scale(0.95);
  transition: opacity 150ms ease-out, transform 150ms ease-out;

  &[data-visible='true'] {
    opacity: 1;
    transform: scale(1);
  }
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

interface CursorTooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  offset?: { x: number; y: number };
  className?: string;
  delayDuration?: number;
  asSvg?: boolean;
}

function CursorTooltip({
  children,
  content,
  offset = { x: 10, y: 10 },
  className,
  delayDuration = 0,
  asSvg = false,
}: CursorTooltipProps) {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const triggerRef = React.useRef<HTMLDivElement | SVGGElement>(null);
  const tooltipRef = React.useRef<HTMLDivElement>(null);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const animationFrameRef = React.useRef<number | null>(null);
  const lastMousePositionRef = React.useRef({ x: 0, y: 0 });

  const handleMouseMove = React.useCallback(
    (e: MouseEvent) => {
      lastMousePositionRef.current = { x: e.clientX, y: e.clientY };

      const tooltip = tooltipRef.current;
      if (!tooltip) {
        setPosition({
          x: e.clientX + offset.x,
          y: e.clientY + offset.y,
        });
        return;
      }

      const tooltipRect = tooltip.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let x = e.clientX + offset.x;
      let y = e.clientY + offset.y;

      if (x + tooltipRect.width > viewportWidth) {
        x = e.clientX - tooltipRect.width - offset.x;
      }

      if (y + tooltipRect.height > viewportHeight) {
        y = e.clientY - tooltipRect.height - offset.y;
      }

      if (x < 0) {
        x = offset.x;
      }

      if (y < 0) {
        y = offset.y;
      }

      setPosition({ x, y });
    },
    [offset]
  );

  const handleMouseEnter = React.useCallback(
    (e: MouseEvent) => {
      lastMousePositionRef.current = { x: e.clientX, y: e.clientY };
      setPosition({
        x: e.clientX + offset.x,
        y: e.clientY + offset.y,
      });

      if (delayDuration > 0) {
        timeoutRef.current = setTimeout(() => {
          setIsMounted(true);
          animationFrameRef.current = requestAnimationFrame(() => {
            setIsVisible(true);
          });
        }, delayDuration);
      } else {
        setIsMounted(true);
        animationFrameRef.current = requestAnimationFrame(() => {
          setIsVisible(true);
        });
      }
    },
    [delayDuration, offset]
  );

  const handleMouseLeave = React.useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    setIsVisible(false);
    setTimeout(() => {
      setIsMounted(false);
    }, 150);
  }, []);

  React.useEffect(() => {
    const trigger = triggerRef.current;
    if (!trigger) {
      return;
    }

    const onMouseEnter = (e: Event) => handleMouseEnter(e as MouseEvent);
    const onMouseLeave = () => handleMouseLeave();

    trigger.addEventListener('mouseenter', onMouseEnter);
    trigger.addEventListener('mouseleave', onMouseLeave);

    return () => {
      trigger.removeEventListener('mouseenter', onMouseEnter);
      trigger.removeEventListener('mouseleave', onMouseLeave);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [handleMouseEnter, handleMouseLeave]);

  React.useEffect(() => {
    if (isVisible) {
      window.addEventListener('mousemove', handleMouseMove);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isVisible, handleMouseMove]);

  const Wrapper = asSvg ? 'g' : 'div';
  const wrapperProps = asSvg
    ? { 'data-slot': 'cursor-tooltip-trigger' }
    : { 'data-slot': 'cursor-tooltip-trigger', style: { display: 'inline-block' } };

  return (
    <>
      <Wrapper ref={triggerRef as any} {...wrapperProps}>
        {children}
      </Wrapper>
      {isMounted &&
        ReactDOM.createPortal(
          <div
            ref={tooltipRef}
            data-slot="cursor-tooltip-content"
            className={cx(cursorTooltipStyles, className)}
            data-visible={isVisible}
            style={{
              left: `${position.x}px`,
              top: `${position.y}px`,
            }}
          >
            {content}
          </div>,
          document.body
        )}
    </>
  );
}
export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider, CursorTooltip };
