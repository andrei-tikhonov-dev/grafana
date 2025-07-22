import { css, cx } from '@emotion/css';
import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';

import { theme2 } from '../../theme/theme';

const baseBadgeStyles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${theme2.radii.md};
  border: 1px solid;
  padding-left: 8px;
  padding-right: 8px;
  padding-top: 2px;
  padding-bottom: 2px;
  font-size: ${theme2.typography.fontSize.xs};
  font-weight: ${theme2.typography.fontWeight.medium};
  width: fit-content;
  white-space: nowrap;
  flex-shrink: 0;
  gap: 4px;
  overflow: hidden;
  transition:
    color ${theme2.transitions.duration.normal},
    box-shadow ${theme2.transitions.duration.normal};

  & > svg {
    width: 12px;
    height: 12px;
    pointer-events: none;
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

const defaultVariantStyles = css`
  border-color: transparent;
  background-color: ${theme2.colors.brand.primary};
  color: ${theme2.colors.text.inverted};

  a&:hover {
    background-color: rgba(238, 82, 46, 0.9);
  }
`;

const secondaryVariantStyles = css`
  border-color: transparent;
  background-color: ${theme2.colors.background.muted};
  color: ${theme2.colors.text.primary};

  a&:hover {
    background-color: rgba(243, 244, 246, 0.9);
  }
`;

const destructiveVariantStyles = css`
  border-color: transparent;
  background-color: ${theme2.colors.semantic.error};
  color: ${theme2.colors.text.inverted};

  a&:hover {
    background-color: rgba(177, 38, 80, 0.9);
  }

  &:focus-visible {
    box-shadow: 0 0 0 3px rgba(177, 38, 80, 0.2);
  }
`;

const outlineVariantStyles = css`
  color: ${theme2.colors.text.primary};
  border-color: ${theme2.colors.border.default};

  a&:hover {
    background-color: ${theme2.colors.background.muted};
    color: ${theme2.colors.text.primary};
  }
`;

const getBadgeVariantStyles = (variant: string) => {
  switch (variant) {
    case 'secondary':
      return secondaryVariantStyles;
    case 'destructive':
      return destructiveVariantStyles;
    case 'outline':
      return outlineVariantStyles;
    default:
      return defaultVariantStyles;
  }
};

type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline';

function Badge({
  className,
  variant = 'default',
  asChild = false,
  ...props
}: React.ComponentProps<'span'> & {
  variant?: BadgeVariant;
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot : 'span';

  return (
    <Comp data-slot="badge" className={cx(baseBadgeStyles, getBadgeVariantStyles(variant), className)} {...props} />
  );
}

export { Badge };
