import { css } from '@emotion/css';
import * as React from 'react';

import { theme3 } from '../../../theme/theme';

const wrapperStyles = css`
  padding: calc(${theme3.tailwind.spacing} * 2);
`;

export function TeamHeaderCell() {
  return <div className={wrapperStyles}>Teams</div>;
}
