import { SankeyNode } from 'd3-sankey';
import React from 'react';

import { theme3 } from '../../../theme/theme';

import { useSankeyContext } from './SankeyContext';

interface NumberProps {
  data: SankeyNode<any, any>;
  labelSize: number;
  graphWidth: number;
}

export const ValueLabel: React.FC<NumberProps> = ({ data, labelSize, graphWidth }) => {
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
      fill={theme3.tailwind.colorGray700}
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
