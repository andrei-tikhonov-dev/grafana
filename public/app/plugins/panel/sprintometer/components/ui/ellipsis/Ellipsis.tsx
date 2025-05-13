import { css } from '@emotion/css';
import React, { useState, useRef, useEffect } from 'react';

import { Tooltip } from '../tooltip/Tooltip';

export interface EllipsisProps {
  children: string;
  lines?: number;
  showTooltip?: boolean;
  tooltipContent?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  as?: keyof React.JSX.IntrinsicElements;
  tooltipSide?: 'top' | 'right' | 'bottom' | 'left';
  tooltipAlign?: 'start' | 'center' | 'end';
  tooltipOffset?: number;
  tooltipDelay?: number;
  allowSelection?: boolean;
}

const getStyles = (lines = 1, allowSelection: boolean) => {
  return {
    container: css`
      position: relative;
      display: block;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ${lines === 1 ? 'ellipsis' : 'clip'};
      white-space: ${lines === 1 ? 'nowrap' : 'normal'};
      ${lines > 1
        ? `
        display: -webkit-box;
        -webkit-line-clamp: ${lines};
        -webkit-box-orient: vertical;
        `
        : ''}
      word-wrap: break-word;
      user-select: ${allowSelection ? 'text' : 'none'};
    `,
  };
};

export const Ellipsis: React.FC<EllipsisProps> = ({
  children,
  lines = 1,
  showTooltip = true,
  tooltipContent,
  className,
  style,
  as = 'div',
  tooltipSide = 'bottom',
  tooltipAlign = 'center',
  tooltipOffset = 5,
  tooltipDelay = 300,
  allowSelection = true,
}) => {
  const [isTruncated, setIsTruncated] = useState(false);
  const textRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const checkTruncation = () => {
      const element = textRef.current;
      if (!element) {
        return;
      }

      if (lines === 1) {
        setIsTruncated(element.scrollWidth > element.clientWidth);
      } else {
        setIsTruncated(element.scrollHeight > element.clientHeight);
      }
    };

    checkTruncation();

    window.addEventListener('resize', checkTruncation);
    return () => {
      window.removeEventListener('resize', checkTruncation);
    };
  }, [children, lines]);

  const styles = getStyles(lines, allowSelection);
  const Component = as as React.ElementType;
  const content = tooltipContent || children;

  if (!showTooltip || !isTruncated) {
    return (
      <Component
        ref={textRef}
        className={css([styles.container, className])}
        style={style}
        title={!showTooltip ? children : undefined}
      >
        {children}
      </Component>
    );
  }

  return (
    <Tooltip
      content={content}
      side={tooltipSide}
      align={tooltipAlign}
      sideOffset={tooltipOffset}
      delayDuration={tooltipDelay}
      disabled={!isTruncated}
    >
      <Component ref={textRef} className={css([styles.container, className])} style={style}>
        {children}
      </Component>
    </Tooltip>
  );
};
