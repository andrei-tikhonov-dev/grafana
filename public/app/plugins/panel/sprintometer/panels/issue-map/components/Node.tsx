import { css } from '@emotion/css';
import { SankeyNode } from 'd3-sankey';
import React, { useRef } from 'react';

import { CursorTooltip } from '../../../components/shadcn/tooltip';
import { theme3 } from '../../../theme/theme';

import { NodeLabel } from './NodeLabel';

interface NodeProps {
  data: SankeyNode<any, any>;
  labelSize: number;
  onClick: (name: string) => void;
  onHighlight: (paths: number[]) => void;
}

export const Node: React.FC<NodeProps> = ({ data, labelSize, onClick, onHighlight }) => {
  const { x0, x1, y0, y1, index, name, value, tooltip, link, rowIds } = data;
  const nodeRef = useRef<SVGRectElement | null>(null);

  const width = x1 - x0;

  const getTextPosition = () => ({
    x: x0 < width / 2 ? x1 + 6 : x0 - 6,
    y: (y1 + y0) / 2,
  });

  const nodeStyle = css`
    rx: 5px;
    ry: 5px;
    stroke: ${theme3.tailwind.colorGray900};
    fill: ${theme3.tailwind.colorGray500};
  `;

  const handleMouseOver = function () {
    onHighlight(rowIds);
  };

  const handleMouseOut = () => {
    onHighlight([]);
  };

  const { x, y } = getTextPosition();
  const tooltipContent = tooltip ? `${tooltip} | ${value}` : `${value}`;

  return (
    <g>
      <CursorTooltip content={tooltipContent} asSvg>
        <rect
          ref={nodeRef}
          className={nodeStyle}
          x={x0}
          y={y0}
          width={width}
          height={y1 - y0}
          data-index={index}
          name={name}
          style={{ cursor: 'pointer' }}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          onClick={() => onClick(name)}
        />
      </CursorTooltip>
      <NodeLabel name={name} x={x} y={y} x0={x0} labelSize={labelSize} link={link} />
    </g>
  );
};
