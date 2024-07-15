import React, { useRef } from 'react';
import { css } from '@emotion/css';
import { SankeyNode } from 'd3-sankey';
import { useTooltip } from './TooltipContext';

interface NodeProps {
  data: SankeyNode<any, any>;
  textColor: string;
  nodeColor: string;
  labelSize: number;
  onClick: (name: string) => void;
  onHighlight: (paths: number[]) => void;
}

export const Node: React.FC<NodeProps> = ({ data, textColor, nodeColor, labelSize, onClick, onHighlight }) => {
  const { x0, x1, y0, y1, index, name, value, tooltip, link, rowIds } = data;
  const nodeRef = useRef<SVGRectElement | null>(null);
  const { showTooltip, hideTooltip } = useTooltip();

  const width = x1 - x0;

  const getTextPosition = () => ({
    x: x0 < width / 2 ? x1 + 6 : x0 - 6,
    y: (y1 + y0) / 2,
  });

  // Emotion CSS
  const nodeStyle = css`
    rx: 5;
    ry: 5;
    stroke: black;
    fill: ${nodeColor};
  `;

  const textStyle = css`
    cursor: ${link ? 'pointer' : 'default'};
    text-decoration: ${link ? 'underline' : 'none'};
    fill: ${textColor};
    alignment-baseline: middle;
    font-size: ${labelSize}px;
    text-anchor: ${x0 === 0 ? 'start' : 'end'};
    user-select: none;
  `;

  const handleMouseOver = function () {
    showTooltip(`${tooltip} | ${value}`);
    onHighlight(rowIds);
  };

  const handleMouseOut = () => {
    hideTooltip();
    onHighlight([]);
  };

  const handleTextClick = () => {
    if (link) {
      window.open(link, '_blank');
    }
  };

  const { x, y } = getTextPosition();

  return (
    <>
      <rect
        ref={nodeRef}
        className={nodeStyle}
        x={x0}
        y={y0}
        width={width}
        height={y1 - y0}
        data-index={index}
        name={name}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onClick={() => onClick(name)}
      />
      <text className={textStyle} onClick={handleTextClick} x={x} y={y}>
        {name}
      </text>
    </>
  );
};
