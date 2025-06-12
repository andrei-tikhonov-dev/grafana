import { css, cx } from '@emotion/css';
import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';

import { theme } from '../../theme';

// Base badge styles
const badgeBaseStyles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  border: 1px solid;
  padding: 0.125rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  width: fit-content;
  white-space: nowrap;
  flex-shrink: 0;
  gap: 0.25rem;
  transition: color, box-shadow;
  overflow: hidden;
  outline: none;

  & > svg {
    width: 0.75rem;
    height: 0.75rem;
    pointer-events: none;
  }

  &:focus-visible {
    border-color: ${theme.colors.semantic.ring};
    box-shadow: 0 0 0 3px ${theme.colors.semantic.ring};
  }

  &[aria-invalid='true'] {
    border-color: ${theme.colors.semantic.destructive};
    box-shadow: 0 0 0 3px rgba(177, 38, 80, 0.2);
  }
`;

// Variant styles
const badgeVariantStyles = {
  default: css`
    border-color: transparent;
    background-color: ${theme.colors.semantic.primary};
    color: ${theme.colors.semantic.texContrast};

    a& {
      &:hover {
        background-color: ${theme.colors.semantic.primary}
    }
  `,
  secondary: css`
    border-color: transparent;
    background-color: ${theme.colors.semantic.secondary};
    color: ${theme.colors.semantic.texContrast};

    a& {
      &:hover {
        background-color: ${theme.colors.semantic.secondary};
      }
    }
  `,
  destructive: css`
    border-color: transparent;
    background-color: ${theme.colors.semantic.destructive};
    color: #ffffff;

    a& {
      &:hover {
        background-color: ${theme.colors.semantic.destructive}
    }

    &:focus-visible {
      box-shadow: 0 0 0 3px rgba(177, 38, 80, 0.2);
    }
  `,
  outline: css`
    border-color: ${theme.colors.semantic.border || '#e5e7eb'};
    background-color: transparent;
    color: ${theme.colors.semantic.text || '#212226'};

    a& {
      &:hover {
        background-color: ${theme.colors.action?.hover || 'rgba(36, 41, 46, 0.12)'};
        color: ${theme.colors.text?.primary || 'rgba(36, 41, 46, 1)'};
      }
    }
  `,
};

// Type definitions for variants
type BadgeVariant = keyof typeof badgeVariantStyles;

interface BadgeProps extends React.ComponentProps<'span'> {
  variant?: BadgeVariant;
  asChild?: boolean;
}

function Badge({ className, variant = 'default', asChild = false, ...props }: BadgeProps) {
  const Comp = asChild ? Slot : 'span';

  const combinedStyles = cx(badgeBaseStyles, badgeVariantStyles[variant], className);

  return <Comp data-slot="badge" className={combinedStyles} {...props} />;
}

export { Badge };
export type { BadgeProps, BadgeVariant };
