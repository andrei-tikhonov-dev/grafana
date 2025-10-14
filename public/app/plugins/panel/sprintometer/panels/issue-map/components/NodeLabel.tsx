import { css } from '@emotion/css';
import React from 'react';

import { theme3 } from '../../../theme/theme';

interface NodeLabelProps {
  name: string;
  x: number;
  y: number;
  x0: number;
  labelSize: number;
  link?: string;
}

export const NodeLabel: React.FC<NodeLabelProps> = ({ name, x, y, x0, labelSize, link }) => {
  const textStyle = css`
    color: ${theme3.tailwind.colorGray900};
    font-size: ${labelSize}px;
    user-select: none;
    white-space: nowrap;
    text-align: ${x0 === 0 ? 'left' : 'right'};
    width: 100%;
    line-height: ${labelSize}px;
  `;

  const linkStyle = css`
    text-decoration: underline;
    ${textStyle};
    display: block;
  `;

  return (
    <foreignObject
      x={x0 === 0 ? x : x - 200}
      y={y - labelSize / 2}
      width={200}
      height={labelSize + 4}
      style={{ overflow: 'visible' }}
    >
      {link ? (
        <a href={link} target="_blank" rel="noopener noreferrer" className={linkStyle}>
          {name}
        </a>
      ) : (
        <div className={textStyle}>{name}</div>
      )}
    </foreignObject>
  );
};
