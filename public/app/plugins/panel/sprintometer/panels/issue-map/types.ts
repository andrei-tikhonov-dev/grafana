import { TAiData } from '../../types';

export interface MIssueMapCustomData {
  valueField: string;
  ai: TAiData;
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
