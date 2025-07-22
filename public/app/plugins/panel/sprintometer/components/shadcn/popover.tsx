import { css, cx } from '@emotion/css';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as React from 'react';

import { theme2 } from '../../theme/theme';

const popoverContentBase = css`
  z-index: ${theme2.zIndices.popover};
  width: 288px;
  transform-origin: center;
  border-radius: ${theme2.radii.lg};
  border: 1px solid ${theme2.colors.border.subtle};
  background-color: ${theme2.colors.background.surface};
  padding: ${theme2.spacing.lg};
  box-shadow: ${theme2.shadows.lg};
  outline: none;
  color: ${theme2.colors.text.primary};

  /* Animation states */
  &[data-state='open'] {
    animation: popoverIn ${theme2.transitions.duration.fast} ${theme2.transitions.easing.out};
  }

  &[data-state='closed'] {
    animation: popoverOut ${theme2.transitions.duration.fast} ${theme2.transitions.easing.in};
  }

  /* Side-specific animations */
  &[data-side='bottom'] {
    animation-name: popoverInFromTop;
  }

  &[data-side='left'] {
    animation-name: popoverInFromRight;
  }

  &[data-side='right'] {
    animation-name: popoverInFromLeft;
  }

  &[data-side='top'] {
    animation-name: popoverInFromBottom;
  }

  /* Keyframe animations */
  @keyframes popoverIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes popoverOut {
    from {
      opacity: 1;
      transform: scale(1);
    }
    to {
      opacity: 0;
      transform: scale(0.95);
    }
  }

  @keyframes popoverInFromTop {
    from {
      opacity: 0;
      transform: scale(0.95) translateY(-8px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  @keyframes popoverInFromRight {
    from {
      opacity: 0;
      transform: scale(0.95) translateX(8px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateX(0);
    }
  }

  @keyframes popoverInFromLeft {
    from {
      opacity: 0;
      transform: scale(0.95) translateX(-8px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateX(0);
    }
  }

  @keyframes popoverInFromBottom {
    from {
      opacity: 0;
      transform: scale(0.95) translateY(8px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  /* Closed state animations */
  &[data-state='closed'] {
    &[data-side='bottom'] {
      animation-name: popoverOutToTop;
    }

    &[data-side='left'] {
      animation-name: popoverOutToRight;
    }

    &[data-side='right'] {
      animation-name: popoverOutToLeft;
    }

    &[data-side='top'] {
      animation-name: popoverOutToBottom;
    }
  }

  @keyframes popoverOutToTop {
    from {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
    to {
      opacity: 0;
      transform: scale(0.95) translateY(-8px);
    }
  }

  @keyframes popoverOutToRight {
    from {
      opacity: 1;
      transform: scale(1) translateX(0);
    }
    to {
      opacity: 0;
      transform: scale(0.95) translateX(8px);
    }
  }

  @keyframes popoverOutToLeft {
    from {
      opacity: 1;
      transform: scale(1) translateX(0);
    }
    to {
      opacity: 0;
      transform: scale(0.95) translateX(-8px);
    }
  }

  @keyframes popoverOutToBottom {
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
        className={cx(popoverContentBase, className)}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
}

function PopoverAnchor({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />;
}

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
