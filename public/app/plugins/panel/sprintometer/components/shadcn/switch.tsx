import { css, cx } from '@emotion/css';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import * as React from 'react';

import { theme3 } from '../../theme/theme';

const switchRootStyles = css`
  display: inline-flex;
  height: 18.4px;
  width: 32px;
  flex-shrink: 0;
  align-items: center;
  border-radius: 9999px;
  border: 1px solid transparent;
  box-shadow: ${theme3.tailwind.shadowXs};
  transition: all 150ms ${theme3.tailwind.easeInOut};
  outline: none;
  cursor: pointer;

  &[data-state='checked'] {
    background-color: ${theme3.custom.colorPrimary};
  }

  &[data-state='unchecked'] {
    background-color: ${theme3.shadcn.border};
  }

  &:focus-visible {
    border-color: ${theme3.custom.colorPrimary};
    box-shadow: 0 0 0 3px rgba(238, 82, 46, 0.5);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  @media (prefers-color-scheme: dark) {
    &[data-state='unchecked'] {
      background-color: rgba(209, 213, 219, 0.8);
    }
  }
`;

const switchThumbStyles = css`
  pointer-events: none;
  display: block;
  width: 16px;
  height: 16px;
  border-radius: 9999px;
  ring-offset: 0;
  transition: transform 150ms ${theme3.tailwind.easeInOut};
  background-color: ${theme3.shadcn.background};

  &[data-state='checked'] {
    transform: translateX(14px);
  }

  &[data-state='unchecked'] {
    transform: translateX(0);
  }
`;

function Switch({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root data-slot="switch" className={cx(switchRootStyles, className)} {...props}>
      <SwitchPrimitive.Thumb data-slot="switch-thumb" className={switchThumbStyles} />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
