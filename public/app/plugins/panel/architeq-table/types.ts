import { PanelProps } from '@grafana/data';
import { CustomCellRendererProps } from '@grafana/ui';

import { Cells, RequestMethod, TableType } from './constants';

export interface PanelOptions {
  update: {
    method: RequestMethod;
    url: string;
    header: Array<Record<string, string>>;
  };
  tableType: TableType;
  editableFields?: string[];
  updateUrl?: string;
  createUrl?: string;
  deleteUrl?: string;
  idField?: string;

  baseUrl?: string;
}

export interface HeaderParameter {
  name: string;
  value: string;
}

export type UpdateHandler = (value: any, cellProps: CustomCellRendererProps) => Promise<boolean>;

export interface TablePanelProps extends PanelProps<PanelOptions> {}

export interface TeamMember {
  name: string;
  email?: string;
  avatar?: string;
}

export interface TeamMember {
  name: string;
  email?: string;
  avatar?: string;
}

export class TeamMemberClass implements TeamMember {
  name: string;
  email?: string;
  avatar?: string;

  constructor(member: TeamMember) {
    this.name = member.name;
    this.email = member.email;
    this.avatar = member.avatar;
  }

  toString(): string {
    return this.name;
  }
}

export interface Capacity {
  assignedSP: number;
  availableSP: number;
}

export class CapacityClass implements Capacity {
  assignedSP: number;
  availableSP: number;

  constructor(capacity: Capacity) {
    this.assignedSP = capacity.assignedSP;
    this.availableSP = capacity.availableSP;
  }

  valueOf(): number {
    return this.assignedSP + this.availableSP / 1_000_000;
  }

  toString(): string {
    return `${this.assignedSP}/${this.availableSP}`;
  }
}

export const enum Status {
  OK = 'OK',
  WARNING = 'WARNING',
  CRITICAL = 'CRITICAL',
}

export type InfoStatusType = {
  status: Status;
  message?: string;
};

export const enum FieldValidation {
  EMAIL = 'email',
  MAX = 'max',
}

export type FieldValidationType = {
  type: FieldValidation;
  value?: number;
};

export interface InfoLineType {
  name?: string;
  value?: string;
  icon?: string;
  status?: `${Status}`;
  link?: string;
  button?: boolean;
  newTab?: boolean;
}

export type CellCustomOptionsType = {
  width?: number;
  align?: 'left' | 'center' | 'right';
  validation?: { type: FieldValidation; value?: any }[];
  options?: OptionType[];
};

export type RoleType = {
  currentRoles: {
    roleId: number;
    rate: number;
  }[];
  availableRoles: {
    id: number;
    name: string;
  }[];
};

export type CellType = (typeof Cells)[keyof typeof Cells];

export type OptionType = { label: string; value: string };
