import { css, cx } from '@emotion/css';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import * as React from 'react';

import { theme2 } from '../../theme/theme';

const separatorStyles = css`
  background-color: ${theme2.colors.border.default};
  flex-shrink: 0;

  &[data-orientation='horizontal'] {
    height: 1px;
    width: 100%;
  }

  &[data-orientation='vertical'] {
    height: 100%;
    width: 1px;
  }
`;

function Separator({
  className,
  orientation = 'horizontal',
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cx(separatorStyles, className)}
      {...props}
    />
  );
}

export { Separator };
