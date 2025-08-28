import { ColumnDef } from '@tanstack/react-table';

import {
  TDate,
  TId,
  TJiraIssueType,
  TJiraPriority,
  TPeriod,
  TSprintometerStatus,
  TUser,
  TZeroState,
  TUrl,
} from '../../types';

export interface MPlannerBoardCustom extends Record<string, any> {
  teams: MTeam[];
  phases: MPhase[];
  zeroState?: TZeroState;
}

export interface MTeam {
  id: TId;
  name: string;
  members: TUser[];
  color?: string;
  art?: MArt;
}

export interface MSprintometerData {
  status: TSprintometerStatus;
  progress?: number;
  isFavorite?: boolean;
  info?: MInfo;
}

export interface MIssue {
  id: TId;
  issueKey: string;
  summary: string;
  startDate?: TDate;
  plannedPi?: MPi;
  dependencies?: MIssue[];
  children?: MIssue[];
  assignee: TUser;
  url: TUrl;
  issueType: TJiraIssueType;
  priority: TJiraPriority;
  status: string;
  ownerTeam: MTeam;
  sprintometerData?: MSprintometerData;
}

export interface MArt {
  id: TId;
  name: string;
}

export interface MPi {
  id: TId;
  name: string;
}

export interface MPhaseItem {
  issues: MIssue[];
}

export interface MPhase {
  id: TId;
  name: string;
  period: TPeriod;
  description: string;
  items: MPhaseItem[];
}

export interface MInfo {
  confidence: number;
  insights: string;
  action: string;
}

export interface UTableRow {
  team: MTeam;
  [key: string]: MTeam | MIssue[];
}

export interface UTableData {
  columns: Array<ColumnDef<UTableRow>>;
  data: UTableRow[];
}
