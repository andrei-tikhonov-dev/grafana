import { SankeyNode } from 'd3-sankey';
import React from 'react';

import { useSankeyContext } from './SankeyContext';

interface NumberProps {
  data: SankeyNode<any, any>;
  textColor: string;
  labelSize: number;
  graphWidth: number;
}

export const ValueLabel: React.FC<NumberProps> = ({ data, textColor, labelSize, graphWidth }) => {
  let { x0, x1, y1, value } = data;
  const { unitLabel } = useSankeyContext();
  const fontSize = `${labelSize}px`;

  let textAnchor: 'start' | 'end' | 'middle' = 'middle';
  let x = (x0 + x1) / 2;
  if (x0 === 0) {
    x = x0;
    textAnchor = 'start';
  } else if (x1 >= graphWidth) {
    x = x1;
    textAnchor = 'end';
  }

  return (
    <text
      x={x}
      y={y1 + 20}
      fill={textColor}
      style={{
        alignmentBaseline: 'middle',
        fontSize: fontSize,
        fontWeight: 'bold',
        textAnchor: textAnchor,
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      {value} {unitLabel}
    </text>
  );
};
