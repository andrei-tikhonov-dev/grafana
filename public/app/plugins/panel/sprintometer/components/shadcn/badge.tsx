import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { css, cx } from '@emotion/css';
import { theme3 } from '../../theme/theme';

const baseBadgeStyles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${theme3.tailwind.radiusSm};
  border: 1px solid;
  font-weight: ${theme3.tailwind.fontWeightMedium};
  width: fit-content;
  white-space: nowrap;
  flex-shrink: 0;
  transition: color 0.15s, box-shadow 0.15s;
  overflow: hidden;

  & > svg {
    pointer-events: none;
  }

  &:focus-visible {
    border-color: ${theme3.shadcn.ring};
    box-shadow: 0 0 0 3px rgba(113, 113, 122, 0.5);
  }

  &[aria-invalid='true'] {
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
    border-color: ${theme3.shadcn.destructive};
  }
`;

const sizeStyles = {
  xs: css`
    padding: 0.125rem 0.5rem;
    font-size: ${theme3.tailwind.textXs};
    line-height: ${theme3.tailwind.textXsLineHeight};
    gap: 0.25rem;
    border-radius: ${theme3.tailwind.radiusSm};

    & > svg {
      width: 0.75rem;
      height: 0.75rem;
    }
  `,
  sm: css`
    padding: 0.25rem 0.625rem;
    font-size: ${theme3.tailwind.textXs};
    line-height: ${theme3.tailwind.textXsLineHeight};
    gap: 0.375rem;
    border-radius: ${theme3.tailwind.radiusMd};

    & > svg {
      width: 0.875rem;
      height: 0.875rem;
    }
  `,
  default: css`
    padding: 0.375rem 0.75rem;
    font-size: ${theme3.tailwind.textSm};
    line-height: ${theme3.tailwind.textSmLineHeight};
    gap: 0.5rem;
    border-radius: ${theme3.tailwind.radiusMd};

    & > svg {
      width: 1rem;
      height: 1rem;
    }
  `,
  lg: css`
    padding: 0.5rem 1rem;
    font-size: ${theme3.tailwind.textBase};
    line-height: ${theme3.tailwind.textBaseLineHeight};
    gap: 0.5rem;
    border-radius: ${theme3.tailwind.radiusMd};

    & > svg {
      width: 1.125rem;
      height: 1.125rem;
    }
  `,
};

const variantStyles = {
  default: css`
    border-color: transparent;
    background-color: ${theme3.shadcn.primary};
    color: ${theme3.shadcn.primaryForeground};

    a& {
      &:hover {
        background-color: rgba(33, 33, 33, 0.9);
      }
    }
  `,
  secondary: css`
    border-color: transparent;
    background-color: ${theme3.shadcn.secondary};
    color: ${theme3.shadcn.secondaryForeground};

    a& {
      &:hover {
        background-color: rgba(247, 247, 247, 0.9);
      }
    }
  `,
  destructive: css`
    border-color: transparent;
    background-color: ${theme3.shadcn.destructive};
    color: ${theme3.tailwind.colorWhite};

    a& {
      &:hover {
        background-color: rgba(239, 68, 68, 0.9);
      }
    }

    &:focus-visible {
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
    }
  `,
  outline: css`
    color: ${theme3.shadcn.foreground};
    border-color: ${theme3.shadcn.border};

    a& {
      &:hover {
        background-color: ${theme3.shadcn.accent};
        color: ${theme3.shadcn.accentForeground};
      }
    }
  `,
};

export type BadgeVariant = keyof typeof variantStyles;
export type BadgeSize = keyof typeof sizeStyles;

export interface BadgeProps extends React.ComponentProps<'span'> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  asChild?: boolean;
}

function Badge({ className, variant = 'default', size = 'xs', asChild = false, ...props }: BadgeProps) {
  const Comp = asChild ? Slot : 'span';

  return (
    <Comp
      data-slot="badge"
      className={cx(baseBadgeStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    />
  );
}

export { Badge };
