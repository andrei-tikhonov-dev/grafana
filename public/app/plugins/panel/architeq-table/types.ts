import { PanelProps } from '@grafana/data';
import { CustomCellRendererProps } from '@grafana/ui';

import { RequestMethod, TableType } from './constants';

export interface PanelOptions {
  update: {
    method: RequestMethod;
    url: string;
    header: Array<Record<string, string>>;
  };
  tableType: TableType;
  editableFields?: string[];
  idField?: string;

  baseUrl?: string;
}

export interface HeaderParameter {
  name: string;
  value: string;
}

export type UpdateHandler = (value: number, cellProps: CustomCellRendererProps) => Promise<boolean>;

export interface TablePanelProps extends PanelProps<PanelOptions> {}
