export interface SankeyOptions {
  monochrome: boolean;
  color: string;
  textColor: string;
  nodeColor: string;
  nodeWidth: number;
  nodePadding: number;
  iteration: number;
  valueField: string;
  labelSize: number;
  dataDelimiter: string;
  baseUrl: string;
  hiddenFields: Array<string>;
  filterFields: Array<string>;
  fieldsOrder: Array<string>;
}

export interface PluginDataPath {
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

export interface PluginDataNode {
  name: string;
  id: string;
  columnId: number;
  tooltip: string;
  columnName: string;
  rowIds: number[];
  link: string;
}

export interface Col0 {
  name: any;
  index: number;
  color: any;
}

export interface ColumnData {
  id: string;
  name: string;
  show: boolean;
}

export interface Row {
  name: string;
  display: string;
}
