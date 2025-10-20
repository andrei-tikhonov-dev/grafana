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
  const wrapperStyle = css`
    display: flex;
    justify-content: ${x0 === 0 ? 'flex-start' : 'flex-end'};
    width: 100%;
    height: 100%;
    pointer-events: none;
  `;

  const textStyle = css`
    color: ${theme3.tailwind.colorGray900};
    font-size: ${labelSize}px;
    user-select: none;
    white-space: nowrap;
    line-height: ${labelSize}px;
    display: inline-block;
    pointer-events: auto;
  `;

  const linkStyle = css`
    text-decoration: underline;
    ${textStyle};
  `;

  const foreignObjectStyle = css`
    overflow: visible;
    pointer-events: none;
  `;

  return (
    <foreignObject
      x={x0 === 0 ? x : x - 200}
      y={y - labelSize / 2}
      width={200}
      height={labelSize + 4}
      className={foreignObjectStyle}
    >
      <div className={wrapperStyle}>
        {link ? (
          <a href={link} target="_blank" rel="noopener noreferrer" className={linkStyle}>
            {name}
          </a>
        ) : (
          <span className={textStyle}>{name}</span>
        )}
      </div>
    </foreignObject>
  );
};
