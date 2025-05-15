import { css } from '@emotion/css';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import React from 'react';

import { theme } from '../../../theme';

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  align?: 'start' | 'center' | 'end';
  side?: 'top' | 'right' | 'bottom' | 'left';
  sideOffset?: number;
  delayDuration?: number;
  disabled?: boolean;
  contentClassName?: string;
  id?: string;
}

const styles = {
  container: css`
    z-index: 10000;
    background-color: #fff;
    color: ${theme.colors.semantic.text};
    line-height: 20px;
    padding: 8px;
    border-radius: ${theme.shape.radius.default};
    font-size: ${theme.typography.size.sm};
    box-shadow: ${theme.shadows.z2};
    max-width: 260px;
    width: max-content;
  `,
  arrow: css`
    fill: #fff;
  `,
};

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  align = 'center',
  side = 'top',
  sideOffset = 5,
  delayDuration = 300,
  disabled = false,
  contentClassName,
  id,
}) => {
  if (disabled) {
    return children;
  }

  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            className={`${styles.container} ${contentClassName || ''}`}
            sideOffset={sideOffset}
            align={align}
            side={side}
            id={id}
          >
            {content}
            <TooltipPrimitive.Arrow className={styles.arrow} />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};
