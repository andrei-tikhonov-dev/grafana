import { EJiraType, TJiraPriority, TTable, TLink, TJiraChangesHistory, TUser, TJiraIssueType } from '../../types';

// Team types

export enum OuterIssueKey {
  Id = 'id',
  IssueKey = 'issueKey',
  HasChanges = 'hasChanges',
  Summary = 'summary',
  Status = 'status',
  IssueType = 'issueType',
  Assignee = 'assignee',
  Priority = 'priority',
  InnerData = 'innerData',
}

export enum InnerIssueKey {
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
export interface OuterIssue {
  [OuterIssueKey.Id]: number;
  [OuterIssueKey.HasChanges]: boolean;
  [OuterIssueKey.IssueKey]: TLink;
  [OuterIssueKey.IssueType]: EJiraType | TJiraIssueType;
  [OuterIssueKey.Summary]: string;
  [OuterIssueKey.Status]: TJiraChangesHistory;
  [OuterIssueKey.Assignee]: TUser;
  [OuterIssueKey.Priority]: TJiraPriority;
  [OuterIssueKey.InnerData]: InnerIssue[];
}
export interface InnerIssue {
  [InnerIssueKey.Id]: number;
  [InnerIssueKey.HasChanges]: boolean;
  [InnerIssueKey.IssueKey]: TLink;
  [InnerIssueKey.IssueType]: EJiraType | TJiraIssueType;
  [InnerIssueKey.Summary]: string;
  [InnerIssueKey.OwnerTeam]: string;
  [InnerIssueKey.Status]: TJiraChangesHistory;
  [InnerIssueKey.LastUpdate]: string;
  [InnerIssueKey.Priority]: string;
  [InnerIssueKey.Sprint]: TJiraChangesHistory;
}

export interface OutgoingDependenciesCustomData extends TTable<OuterIssue, InnerIssue> {
  total: number;
}

// ART types

export enum OuterArtIssueKey {
  Id = 'id',
  IssueKey = 'issueKey',
  HasChanges = 'hasChanges',
  Summary = 'summary',
  Status = 'status',
  IssueType = 'issueType',
  ActiveDependencies = 'activeDependencies',
  InnerData = 'innerData',
}

export enum InnerArtIssueKey {
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

export interface OuterArtIssue {
  [OuterArtIssueKey.Id]: number;
  [OuterArtIssueKey.HasChanges]: boolean;
  [OuterArtIssueKey.IssueKey]: TLink;
  [OuterArtIssueKey.IssueType]: EJiraType | TJiraIssueType;
  [OuterArtIssueKey.Summary]: string;
  [OuterArtIssueKey.Status]: TJiraChangesHistory;
  [OuterArtIssueKey.ActiveDependencies]: number;
  [OuterArtIssueKey.InnerData]: InnerArtIssue[];
}
export interface InnerArtIssue {
  [InnerArtIssueKey.Id]: number;
  [InnerArtIssueKey.HasChanges]: boolean;
  [InnerArtIssueKey.IssueKey]: TLink;
  [InnerArtIssueKey.IssueType]: EJiraType | TJiraIssueType;
  [InnerArtIssueKey.Summary]: string;
  [InnerArtIssueKey.OwnerTeam]: string;
  [InnerArtIssueKey.OwnerArt]: string;
  [InnerArtIssueKey.Status]: TJiraChangesHistory;
  [InnerArtIssueKey.LastUpdate]: string;
  [InnerArtIssueKey.FixedVersion]: TJiraChangesHistory;
  [InnerArtIssueKey.PlannedVersion]: TJiraChangesHistory;
}

export interface OutgoingArtDependenciesCustomData extends TTable<OuterArtIssue, InnerArtIssue> {
  total: number;
}
