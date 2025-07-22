import { css, cx } from '@emotion/css';
import * as React from 'react';

import { theme2 } from '../../theme/theme';

const inputStyles = css`
  display: flex;
  height: 36px;
  width: 100%;
  min-width: 0;
  border-radius: 6px;
  border: 1px solid ${theme2.colors.border.default};
  background-color: transparent;
  padding: 4px 12px;
  font-size: ${theme2.typography.fontSize.sm};
  box-shadow: ${theme2.shadows.xs};
  transition:
    color ${theme2.transitions.duration.normal},
    box-shadow ${theme2.transitions.duration.normal};
  outline: none;
  color: ${theme2.colors.text.primary};

  &::placeholder {
    color: ${theme2.colors.text.secondary};
  }

  &::selection {
    background-color: ${theme2.colors.brand.primary};
    color: ${theme2.colors.text.inverted};
  }

  &:focus-visible {
    border-color: ${theme2.colors.brand.primary};
  }

  &[aria-invalid='true'] {
    border-color: ${theme2.colors.semantic.error};
  }

  &:disabled {
    pointer-events: none;
    cursor: not-allowed;
    opacity: 0.5;
  }

  &[type='file'] {
    color: ${theme2.colors.text.primary};

    &::file-selector-button {
      display: inline-flex;
      height: 28px;
      border: none;
      background-color: transparent;
      font-size: ${theme2.typography.fontSize.sm};
      font-weight: ${theme2.typography.fontWeight.medium};
      color: ${theme2.colors.text.primary};
    }
  }
`;

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return <input type={type} data-slot="input" className={cx(inputStyles, className)} {...props} />;
}

export { Input };
