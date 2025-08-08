import { css, cx } from '@emotion/css';
import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';

import { theme2 } from '../../theme/theme';

const baseButtonStyles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  white-space: nowrap;
  border-radius: ${theme2.radii.md};
  font-size: ${theme2.typography.fontSize.sm};
  font-weight: ${theme2.typography.fontWeight.medium};
  transition: all ${theme2.transitions.duration.normal};
  flex-shrink: 0;
  outline: none;
  border: 1px solid transparent;
  cursor: pointer;

  &:disabled {
    pointer-events: none;
    opacity: 0.5;
    cursor: not-allowed;
  }

  & svg {
    pointer-events: none;
    flex-shrink: 0;
  }

  & svg:not([class*='size-']) {
    width: 16px;
    height: 16px;
  }

  &:focus-visible {
    outline: none;
    border-color: ${theme2.colors.brand.primary};
    box-shadow: 0 0 0 3px rgba(238, 82, 46, 0.5);
  }

  &[aria-invalid='true'] {
    border-color: ${theme2.colors.semantic.error};
    box-shadow: 0 0 0 3px rgba(177, 38, 80, 0.2);
  }
`;

const createHoverStyles = (backgroundColor: string) => css`
  &:hover:not(:disabled) {
    background-color: ${backgroundColor};
  }
`;

const variantStyles = {
  default: css`
    background-color: ${theme2.colors.brand.primary};
    color: ${theme2.colors.text.inverted};
    box-shadow: ${theme2.shadows.xs};
    ${createHoverStyles('rgba(238, 82, 46, 0.9)')}
  `,

  destructive: css`
    background-color: ${theme2.colors.semantic.error};
    color: ${theme2.colors.text.inverted};
    box-shadow: ${theme2.shadows.xs};
    ${createHoverStyles('rgba(177, 38, 80, 0.9)')}

    &:focus-visible {
      box-shadow: 0 0 0 3px rgba(177, 38, 80, 0.2);
    }
  `,

  outline: css`
    border: 1px solid ${theme2.colors.border.default};
    background-color: ${theme2.colors.background.surface};
    box-shadow: ${theme2.shadows.xs};

    &:hover:not(:disabled) {
      background-color: ${theme2.colors.background.muted};
      color: ${theme2.colors.text.primary};
    }
  `,

  secondary: css`
    background-color: ${theme2.colors.brand.secondary};
    color: ${theme2.colors.text.inverted};
    box-shadow: ${theme2.shadows.xs};
    ${createHoverStyles(theme2.colors.brand.accent)}
  `,

  ghost: css`
    background-color: transparent;

    &:hover:not(:disabled) {
      background-color: ${theme2.colors.background.muted};
      color: ${theme2.colors.text.primary};
    }
  `,

  link: css`
    color: ${theme2.colors.brand.primary};
    text-decoration-line: underline;
    text-underline-offset: 4px;
    background-color: transparent;

    &:hover:not(:disabled) {
      text-decoration: underline;
    }
  `,
} as const;

const sizeStyles = {
  default: css`
    height: 36px;
    padding: 8px 16px;

    &:has(> svg) {
      padding: 8px 12px;
    }
  `,

  sm: css`
    height: 32px;
    gap: 6px;
    padding: 0 12px;

    &:has(> svg) {
      padding: 0 10px;
    }
  `,

  lg: css`
    height: 40px;
    padding: 0 24px;

    &:has(> svg) {
      padding: 0 16px;
    }
  `,

  icon: css`
    width: 36px;
    height: 36px;
    padding: 0;
  `,
} as const;

type ButtonVariant = keyof typeof variantStyles;
type ButtonSize = keyof typeof sizeStyles;

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    const combinedClassName = cx(baseButtonStyles, variantStyles[variant], sizeStyles[size], className);

    return <Comp ref={ref} data-slot="button" className={combinedClassName} {...props} />;
  }
);

Button.displayName = 'Button';

export { Button };
export type { ButtonProps, ButtonVariant, ButtonSize };
