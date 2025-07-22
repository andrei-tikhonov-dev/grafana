import { css, cx } from '@emotion/css';
import * as LabelPrimitive from '@radix-ui/react-label';
import * as React from 'react';

import { theme2 } from '../../theme/theme';

const labelStyles = css`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: ${theme2.typography.fontSize.sm};
  line-height: 1;
  font-weight: ${theme2.typography.fontWeight.medium};
  user-select: none;
  color: ${theme2.colors.text.primary};

  [data-disabled='true'] & {
    pointer-events: none;
    opacity: 0.5;
  }

  :has(+ :disabled) & {
    cursor: not-allowed;
    opacity: 0.5;
  }

  .peer:disabled ~ & {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

function Label({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return <LabelPrimitive.Root data-slot="label" className={cx(labelStyles, className)} {...props} />;
}

export { Label };
