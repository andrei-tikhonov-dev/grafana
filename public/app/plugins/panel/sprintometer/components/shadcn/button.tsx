import { css, cx } from '@emotion/css';
import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';

import { theme } from '../../theme';

// Base button styles
const buttonBaseStyles = css`
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  white-space: nowrap;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
  outline: none;
  flex-shrink: 0;

  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  &:focus-visible {
    border-color: ${theme.colors.semantic.ring};
    box-shadow: 0 0 0 3px ${theme.colors.semantic.ring};
  }

  &[aria-invalid='true'] {
    border-color: ${theme.colors.semantic.destructive};
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
  }

  & svg {
    pointer-events: none;
    flex-shrink: 0;
  }

  & svg:not([class*='size-']) {
    width: 1rem;
    height: 1rem;
  }
`;

// Variant styles
const buttonVariantStyles = {
  default: css`
    background-color: ${theme.colors.semantic.primary};
    color: ${theme.colors.semantic.texContrast};
    box-shadow: ${theme.shadows.z1};

    &:hover:not(:disabled) {
      background-color: ${theme.colors.semantic.primary};
    }
  `,
  destructive: css`
    background-color: ${theme.colors.semantic.destructive};
    color: ${theme.colors.semantic.texContrast};
    box-shadow: ${theme.shadows.z1};

    &:hover:not(:disabled) {
      background-color: ${theme.colors.semantic.destructive};
    }

    &:focus-visible {
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
    }
  `,
  outline: css`
    border: 1px solid ${theme.colors.semantic.border};
    background-color: ${theme.colors.semantic.background};
    box-shadow: ${theme.shadows.z1};

    &:hover:not(:disabled) {
      background-color: ${theme.colors.semantic.background};
      color: ${theme.colors.semantic.textLite};
    }
  `,
  secondary: css`
    background-color: ${theme.colors.semantic.secondary};
    color: ${theme.colors.semantic.texContrast};
    box-shadow: ${theme.shadows.z1};

    &:hover:not(:disabled) {
      background-color: ${theme.colors.semantic.secondary};
    }
  `,
  ghost: css`
    &:hover:not(:disabled) {
      background-color: ${theme.colors.semantic.background};
      color: ${theme.colors.semantic.textLite};
    }
  `,
  link: css`
    color: ${theme.colors.semantic.primary};
    text-decoration: underline;
    text-underline-offset: 4px;

    &:hover:not(:disabled) {
      text-decoration: underline;
    }
  `,
};

// Size styles
const buttonSizeStyles = {
  default: css`
    height: 2.25rem;
    padding: 0.5rem 1rem;

    &:has(> svg) {
      padding-left: 0.75rem;
      padding-right: 0.75rem;
    }
  `,
  sm: css`
    height: 2rem;
    border-radius: 0.375rem;
    gap: 0.375rem;
    padding: 0 0.75rem;

    &:has(> svg) {
      padding-left: 0.625rem;
      padding-right: 0.625rem;
    }
  `,
  lg: css`
    height: 2.5rem;
    border-radius: 0.375rem;
    padding: 0 1.5rem;

    &:has(> svg) {
      padding-left: 1rem;
      padding-right: 1rem;
    }
  `,
  icon: css`
    width: 2.25rem;
    height: 2.25rem;
  `,
};

// Type definitions for variants
type ButtonVariant = keyof typeof buttonVariantStyles;
type ButtonSize = keyof typeof buttonSizeStyles;

interface ButtonProps extends React.ComponentProps<'button'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
}

function Button({ className, variant = 'default', size = 'default', asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button';

  const combinedStyles = cx(buttonBaseStyles, buttonVariantStyles[variant], buttonSizeStyles[size], className);

  return <Comp data-slot="button" className={combinedStyles} {...props} />;
}

export { Button };
export type { ButtonProps, ButtonVariant, ButtonSize };
