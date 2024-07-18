import * as d3Sankey from 'd3-sankey';
import { SankeyLink, SankeyNode } from 'd3-sankey';
import React from 'react';


import { MARGIN } from '../constants';

import { Headers } from './Headers';
import { Node } from './Node';
import { Path } from './Path';
import { TooltipProvider } from './TooltipContext';
import { ValueLabel } from './ValueLabel';

interface SankeyProps {
  data: any;
  width: number;
  height: number;
  headerData: any;
  id: any;
  textColor: string;
  nodeColor: string;
  nodeWidth: number;
  nodePadding: number;
  labelSize: number;
  iteration: number;
}

function calculateTransparency(currentPath: number, highlightedPaths: number[]): number {
  if (highlightedPaths.length === 0) {
    return 0.7;
  }
  return highlightedPaths.includes(currentPath) ? 1 : 0.2;
}

export const Sankey: React.FC<SankeyProps> = ({
  data,
  width,
  height,
  headerData,
  id,
  textColor,
  nodeColor,
  nodeWidth,
  nodePadding,
  labelSize,
  iteration,
}) => {
  const [visibleLabels, setVisibleLabels] = React.useState<string[]>([]);
  const toggleVisibleLabels = (name: string) => {
    if (visibleLabels.includes(name)) {
      setVisibleLabels(visibleLabels.filter((k) => k !== name));
    } else {
      setVisibleLabels([...visibleLabels, name]);
    }
  };

  const [highlightedPaths, setHighlightedPaths] = React.useState<number[]>([]);

  const graphWidth = width - MARGIN.left - MARGIN.right;
  const graphHeight = height - MARGIN.top - MARGIN.bottom;
  const sankey: any = d3Sankey
    .sankey()
    .iterations(iteration)
    .nodeWidth(nodeWidth)
    .nodePadding(nodePadding)
    .extent([
      [0, 0],
      [graphWidth, graphHeight],
    ]);

  if (data) {
    const { links, nodes } = sankey(data);

    return (
      <svg id={'Chart_' + id} width={width} height={height}>
        <Headers
          headerData={headerData}
          width={graphWidth}
          id={'Chart_' + id}
          topMargin={MARGIN.top}
          textColor={textColor}
        />
        <TooltipProvider panelId={id}>
          <g transform={`translate(${MARGIN.left}, ${MARGIN.top})`} key={links.length}>
            {links.map((data: SankeyLink<any, any>, index: number) => {
              const opacity = calculateTransparency(data.rowId, highlightedPaths);
              return <Path key={index} data={data} opacity={opacity} onHighlight={setHighlightedPaths} />;
            })}
          </g>
          <g transform={`translate(${MARGIN.left}, ${MARGIN.top})`} key={nodes.length}>
            {nodes.map((data: SankeyNode<any, any>, index: number) => {
              return (
                <Node
                  onClick={toggleVisibleLabels}
                  onHighlight={setHighlightedPaths}
                  data={data}
                  key={index}
                  textColor={textColor}
                  nodeColor={nodeColor}
                  labelSize={labelSize}
                />
              );
            })}
          </g>
          <g transform={`translate(${MARGIN.left}, ${MARGIN.top})`} key={`${nodes.length}-${links.length}`}>
            {nodes
              .filter((data: SankeyNode<any, any>) => visibleLabels.includes(data.name))
              .map((data: SankeyNode<any, any>, index: number) => (
                <ValueLabel
                  data={data}
                  key={index}
                  textColor={textColor}
                  labelSize={labelSize * 2}
                  graphWidth={graphWidth}
                />
              ))}
          </g>
        </TooltipProvider>
      </svg>
    );
  }
  return <div id={'Chart_' + id} style={{ height: height, width: width }}></div>;
};
