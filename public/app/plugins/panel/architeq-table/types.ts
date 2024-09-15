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
  assignSP: number;
  plannedSP: number;
}

export class CapacityClass implements Capacity {
  assignSP: number;
  plannedSP: number;

  constructor(capacity: Capacity) {
    this.assignSP = capacity.assignSP;
    this.plannedSP = capacity.plannedSP;
  }

  valueOf(): number {
    return this.assignSP + this.plannedSP / 1_000_000;
  }

  toString(): string {
    return `${this.assignSP}/${this.plannedSP}`;
  }
}
