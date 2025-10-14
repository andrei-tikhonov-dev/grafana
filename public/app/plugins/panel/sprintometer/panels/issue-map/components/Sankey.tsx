import * as d3Sankey from 'd3-sankey';
import { SankeyLink, SankeyNode } from 'd3-sankey';
import React from 'react';

import { LAYOUT_ITERATIONS } from '../constants';

import { Link } from './Link';
import { Node } from './Node';
import { ValueLabel } from './ValueLabel';

interface SankeyProps {
  data: any;
  width: number;
  height: number;
  id: any;
  nodeWidth: number;
  nodePadding: number;
  labelSize: number;
}

function calculateTransparency(currentPath: number, highlightedPaths: number[]): number {
  if (highlightedPaths.length === 0) {
    return 0.7;
  }
  return highlightedPaths.includes(currentPath) ? 1 : 0.2;
}

export const Sankey: React.FC<SankeyProps> = ({ data, width, height, id, nodeWidth, nodePadding, labelSize }) => {
  const [visibleLabels, setVisibleLabels] = React.useState<string[]>([]);

  const toggleVisibleLabels = (name: string) => {
    if (visibleLabels.includes(name)) {
      setVisibleLabels(visibleLabels.filter((k) => k !== name));
    } else {
      setVisibleLabels([...visibleLabels, name]);
    }
  };

  const [highlightedPaths, setHighlightedPaths] = React.useState<number[]>([]);
  const sankey: any = d3Sankey
    .sankey()
    .iterations(LAYOUT_ITERATIONS)
    .nodeWidth(nodeWidth)
    .nodePadding(nodePadding)
    .extent([
      [0, 0],
      [width, height - 30],
    ]);

  if (!data) {
    return null;
  }

  const { links, nodes } = sankey(data);
  return (
    <svg id={'Chart_' + id} width={width} height={height}>
      <g>
        {links.map((data: SankeyLink<any, any>, index: number) => {
          const opacity = calculateTransparency(data.rowId, highlightedPaths);
          return <Link key={index} data={data} opacity={opacity} onHighlight={setHighlightedPaths} />;
        })}
      </g>
      <g>
        {nodes.map((data: SankeyNode<any, any>, index: number) => {
          return (
            <Node
              onClick={toggleVisibleLabels}
              onHighlight={setHighlightedPaths}
              data={data}
              key={index}
              labelSize={labelSize}
            />
          );
        })}
      </g>
      <g key={`${nodes.length}-${links.length}`}>
        {nodes
          .filter((data: SankeyNode<any, any>) => visibleLabels.includes(data.name))
          .map((data: SankeyNode<any, any>, index: number) => (
            <ValueLabel data={data} key={index} labelSize={labelSize * 2} graphWidth={width} />
          ))}
      </g>
    </svg>
  );
};
