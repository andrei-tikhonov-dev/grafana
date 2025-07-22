import { css, cx } from '@emotion/css';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as React from 'react';

import { theme2 } from '../../theme/theme';
import { UiIcon } from '../ui';

const checkboxStyles = css`
  border: 1px solid ${theme2.colors.border.default};
  background-color: ${theme2.colors.background.surface};
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  border-radius: ${theme2.radii.md};
  box-shadow: ${theme2.shadows.xs};
  transition: box-shadow ${theme2.transitions.duration.normal};
  outline: none;

  &[data-state='checked'] {
    background-color: ${theme2.colors.brand.primary};
    color: ${theme2.colors.text.inverted};
    border-color: ${theme2.colors.brand.primary};
  }

  &:focus-visible {
    border-color: ${theme2.colors.brand.primary};
  }

  &[aria-invalid='true'] {
    border-color: ${theme2.colors.semantic.error};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const indicatorStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  color: currentColor;
  transition: none;
`;

const iconStyles = css``;

function Checkbox({ className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root data-slot="checkbox" className={cx(checkboxStyles, className)} {...props}>
      <CheckboxPrimitive.Indicator data-slot="checkbox-indicator" className={indicatorStyles}>
        <UiIcon name="Check" size="sm" className={iconStyles} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
