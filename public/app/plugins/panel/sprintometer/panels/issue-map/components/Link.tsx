import { SankeyLink } from 'd3-sankey';
import React from 'react';

import { CursorTooltip } from '../../../components/shadcn/tooltip';
import { createD3Link } from '../utils/utils';

interface PathProps {
  data: SankeyLink<any, any>;
  opacity: number;
  onHighlight: (paths: number[]) => void;
}

const padding = 5;

export const Link: React.FC<PathProps> = ({ data, opacity, onHighlight }) => {
  const handleMouseEnter = () => {
    onHighlight([data.rowId]);
  };

  const handleMouseLeave = () => {
    onHighlight([]);
  };

  const width = data.width > 0 ? Math.max(data.width - padding, 1) : 0;

  return (
    <CursorTooltip content={data.tooltip} asSvg>
      <path
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        d={createD3Link(data)}
        fill="none"
        stroke={data.color}
        strokeOpacity={0.8}
        opacity={opacity}
        strokeWidth={width}
        display={data.displayValue}
        style={{
          transition: 'opacity 0.3s ease-in-out',
        }}
      />
    </CursorTooltip>
  );
};
