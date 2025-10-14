import { IssueMapOptionsNS } from '../../types';

export type SankeyOptions = IssueMapOptionsNS['sankey'];

export interface IssueMapCustomData {
  valueField: string;
  ai: {
    title: string;
    content: string;
  };
}

export interface MPluginDataPath {
  source: number;
  target: number;
  value: number;
  displayValue: string;
  id: string;
  color: string;
  node0: number;
  tooltip?: string;
  rowId: number;
}

export interface MPluginDataNode {
  name: string;
  id: string;
  columnId: number;
  tooltip: string;
  columnName: string;
  rowIds: number[];
  link?: string;
}

export interface MCol0 {
  name: any;
  index: number;
  color: any;
}

export interface MColumnData {
  id: string;
  name: string;
  show: boolean;
}

export interface MRow {
  name: string;
  display: string;
}
