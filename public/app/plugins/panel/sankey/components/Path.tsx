import { SankeyLink } from 'd3-sankey';
import React, { useRef } from 'react';

import { createD3Link } from '../utils/utils';

import { useTooltip } from './TooltipContext';


interface PathProps {
  data: SankeyLink<any, any>;
  opacity: number;
  onHighlight: (paths: number[]) => void;
}

export const Path: React.FC<PathProps> = ({ data, opacity, onHighlight }) => {
  const { showTooltip, hideTooltip } = useTooltip();
  const pathRef = useRef<SVGPathElement | null>(null);
  const handlePathMouseOver = function () {
    showTooltip(data.tooltip);
    onHighlight([data.rowId]);
  };

  const handleMouseOut = () => {
    hideTooltip();
    onHighlight([]);
  };

  return (
    <path
      ref={pathRef}
      onMouseOver={handlePathMouseOver}
      onMouseOut={handleMouseOut}
      d={createD3Link(data)}
      fill="none"
      stroke={data.color}
      strokeOpacity={0.8}
      opacity={opacity}
      strokeWidth={data.width}
      display={data.displayValue}
    />
  );
};
