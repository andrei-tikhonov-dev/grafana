import { EJiraType, TAiData, TJiraPriority, TTable, TUser, TLink, TJiraChangesHistory, TJiraIssueType } from '../../types';

export interface MCustomData extends TTable<MOuterArtIssue, MInnerArtIssue> {
  total: number;
  ai?: TAiData;
}

export interface MData extends TTable<MOuterIssue, MInnerIssue> {
  total: number;
  ai?: TAiData;
}

export enum EOuterArtIssueKey {
  Id = 'id',
  IssueKey = 'issueKey',
  HasChanges = 'hasChanges',
  Summary = 'summary',
  Status = 'status',
  IssueType = 'issueType',
  ActiveDependencies = 'activeDependencies',
  InnerData = 'innerData',
}

export enum EInnerArtIssueKey {
  Id = 'id',
  IssueKey = 'issueKey',
  HasChanges = 'hasChanges',
  Summary = 'summary',
  Status = 'status',
  IssueType = 'issueType',
  OwnerTeam = 'ownerTeam',
  OwnerArt = 'ownerArt',
  LastUpdate = 'lastUpdate',
  FixedVersion = 'fixedVersion',
  PlannedVersion = 'plannedVersion',
}

export interface MOuterArtIssue {
  [EOuterArtIssueKey.Id]: number;
  [EOuterArtIssueKey.HasChanges]: boolean;
  [EOuterArtIssueKey.IssueKey]: TLink;
  [EOuterArtIssueKey.IssueType]: EJiraType | TJiraIssueType;
  [EOuterArtIssueKey.Summary]: string;
  [EOuterArtIssueKey.Status]: TJiraChangesHistory;
  [EOuterArtIssueKey.ActiveDependencies]: number;
  [EOuterArtIssueKey.InnerData]: MInnerArtIssue[];
}
export interface MInnerArtIssue {
  [EInnerArtIssueKey.Id]: number;
  [EInnerArtIssueKey.HasChanges]: boolean;
  [EInnerArtIssueKey.IssueKey]: TLink;
  [EInnerArtIssueKey.IssueType]: EJiraType | TJiraIssueType;
  [EInnerArtIssueKey.Summary]: string;
  [EInnerArtIssueKey.OwnerTeam]: string;
  [EInnerArtIssueKey.OwnerArt]: string;
  [EInnerArtIssueKey.Status]: TJiraChangesHistory;
  [EInnerArtIssueKey.LastUpdate]: string;
  [EInnerArtIssueKey.FixedVersion]: TJiraChangesHistory;
  [EInnerArtIssueKey.PlannedVersion]: TJiraChangesHistory;
}

export enum EOuterIssueKey {
  Id = 'id',
  IssueKey = 'issueKey',
  HasChanges = 'hasChanges',
  Summary = 'summary',
  Status = 'status',
  IssueType = 'issueType',
  Assignee = 'assignee',
  Priority = 'priority',
  ActiveDependencies = 'activeDependencies',
  InnerData = 'innerData',
}

export enum EInnerIssueKey {
  Id = 'id',
  IssueKey = 'issueKey',
  HasChanges = 'hasChanges',
  Summary = 'summary',
  Status = 'status',
  IssueType = 'issueType',
  OwnerTeam = 'ownerTeam',
  Priority = 'priority',
  LastUpdate = 'lastUpdate',
  Sprint = 'sprint',
}
export interface MOuterIssue {
  [EOuterIssueKey.Id]: number;
  [EOuterIssueKey.HasChanges]: boolean;
  [EOuterIssueKey.IssueKey]: TLink;
  [EOuterIssueKey.IssueType]: EJiraType | TJiraIssueType;
  [EOuterIssueKey.Summary]: string;
  [EOuterIssueKey.Status]: TJiraChangesHistory;
  [EOuterIssueKey.Assignee]: TUser;
  [EOuterIssueKey.Priority]: TJiraPriority;
  [EOuterIssueKey.ActiveDependencies]: number;
  [EOuterIssueKey.InnerData]: MInnerIssue[];
}
export interface MInnerIssue {
  [EInnerIssueKey.Id]: number;
  [EInnerIssueKey.HasChanges]: boolean;
  [EInnerIssueKey.IssueKey]: TLink;
  [EInnerIssueKey.IssueType]: EJiraType | TJiraIssueType;
  [EInnerIssueKey.Summary]: string;
  [EInnerIssueKey.OwnerTeam]: string;
  [EInnerIssueKey.Status]: TJiraChangesHistory;
  [EInnerIssueKey.LastUpdate]: string;
  [EInnerIssueKey.Priority]: string;
  [EInnerIssueKey.Sprint]: TJiraChangesHistory;
}
