import { CustomCellRendererProps } from '@grafana/ui';

import { RequestMethod } from '../constants';

export interface PanelOptions {
  update: {
    method: RequestMethod;
    url: string;
    header: Array<Record<string, string>>;
  };
  editableFields: string[];
  idField: string;
}

export interface HeaderParameter {
  name: string;
  value: string;
}

export type UpdateDataHandler = (value: number, cellProps: CustomCellRendererProps) => Promise<boolean>;
