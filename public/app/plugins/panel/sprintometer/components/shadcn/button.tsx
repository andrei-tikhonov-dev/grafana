import { css, cx } from '@emotion/css';
import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';

import { theme3 } from '../../theme';

const baseButtonStyles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  white-space: nowrap;
  border-radius: ${theme3.tailwind.radiusSm};
  font-size: ${theme3.tailwind.textSm};
  font-weight: ${theme3.tailwind.fontWeightMedium};
  transition: all 150ms;
  flex-shrink: 0;
  outline: none;
  border: 1px solid transparent;

  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  & svg {
    pointer-events: none;
    flex-shrink: 0;
  }

  & svg:not([class*='size-']) {
    width: 1rem;
    height: 1rem;
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

const variantStyles = {
  default: css`
    background-color: ${theme3.custom.colorPrimary};
    color: ${theme3.shadcn.primaryForeground};
    box-shadow: ${theme3.tailwind.shadowXs};

    &:hover:not(:disabled) {
      background-color: color-mix(in srgb, ${theme3.custom.colorPrimary} 80%, white 20%);
    }
  `,
  destructive: css`
    background-color: ${theme3.shadcn.destructive};
    color: white;
    box-shadow: ${theme3.tailwind.shadowXs};

    &:hover:not(:disabled) {
      background-color: rgba(239, 68, 68, 0.9);
    }

    &:focus-visible {
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
    }
  `,
  outline: css`
    border: 1px solid ${theme3.shadcn.input};
    background-color: ${theme3.shadcn.background};
    box-shadow: ${theme3.tailwind.shadowXs};

    &:hover:not(:disabled) {
      background-color: ${theme3.shadcn.accent};
      color: ${theme3.shadcn.accentForeground};
    }
  `,
  secondary: css`
    background-color: ${theme3.shadcn.secondary};
    color: ${theme3.shadcn.secondaryForeground};
    box-shadow: ${theme3.tailwind.shadowXs};

    &:hover:not(:disabled) {
      background-color: rgba(245, 245, 245, 0.8);
    }
  `,
  ghost: css`
    background-color: transparent;

    &:hover:not(:disabled) {
      background-color: ${theme3.shadcn.accent};
      color: ${theme3.shadcn.accentForeground};
    }
  `,
  link: css`
    background-color: transparent;
    color: ${theme3.shadcn.primary};
    text-underline-offset: 4px;

    &:hover:not(:disabled) {
      text-decoration: underline;
    }
  `,
};

const sizeStyles = {
  xs: css`
    height: auto;
    padding: 0.125rem 0.5rem;
    font-size: ${theme3.tailwind.textXs};
    line-height: ${theme3.tailwind.textXsLineHeight};
    border-radius: ${theme3.tailwind.radiusSm};
    gap: 0.25rem;

    & svg:not([class*='size-']) {
      width: 0.75rem;
      height: 0.75rem;
    }
  `,
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
    border-radius: ${theme3.tailwind.radiusMd};
    gap: 0.375rem;
    padding-left: 0.75rem;
    padding-right: 0.75rem;

    &:has(> svg) {
      padding-left: 0.625rem;
      padding-right: 0.625rem;
    }
  `,
  lg: css`
    height: 2.5rem;
    border-radius: ${theme3.tailwind.radiusMd};
    padding-left: 1.5rem;
    padding-right: 1.5rem;

    &:has(> svg) {
      padding-left: 1rem;
      padding-right: 1rem;
    }
  `,
  icon: css`
    width: 2.25rem;
    height: 2.25rem;
    padding: 0;
  `,
};

interface ButtonProps extends React.ComponentProps<'button'> {
  variant?: keyof typeof variantStyles;
  size?: keyof typeof sizeStyles;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        ref={ref}
        data-slot="button"
        className={cx(baseButtonStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button };
