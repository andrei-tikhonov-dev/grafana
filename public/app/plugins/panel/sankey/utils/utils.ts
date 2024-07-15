import * as d3Sankey from 'd3-sankey';
import { MARGIN } from '../constants';

export function getContainerSize({
  width,
  height,
  nodeWidth,
  nodePadding,
  rowsNumber,
  columnsNumber,
}: {
  width: number;
  height: number;
  nodeWidth: number;
  nodePadding: number;
  rowsNumber: number;
  columnsNumber: number;
}) {
  const minWidth = columnsNumber * (nodeWidth + 2 * nodePadding) * 1.5;
  const minHeight = rowsNumber * nodePadding * 1.5;

  return {
    containerHeight: Math.max(minHeight, height - MARGIN.bottom),
    containerWidth: Math.max(minWidth, width - MARGIN.right),
  };
}

export function abbreviate(str: string): string {
  return str
    .split(' ')
    .map((w) => w[0].toUpperCase())
    .join('');
}

const d3Link = d3Sankey.sankeyLinkHorizontal();
export function createD3Link(data: any): string {
  return d3Link(data) as string;
}
