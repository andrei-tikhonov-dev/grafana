import {
  JiraTypeEnum,
  JiraPriorityEnum,
  Table,
  Link,
  JiraChangesHistory,
  UserInterface,
  JiraIssueTypeData,
} from '../../types';

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
  [OuterIssueKey.IssueKey]: Link;
  [OuterIssueKey.IssueType]: JiraTypeEnum | JiraIssueTypeData;
  [OuterIssueKey.Summary]: string;
  [OuterIssueKey.Status]: JiraChangesHistory;
  [OuterIssueKey.Assignee]: UserInterface;
  [OuterIssueKey.Priority]: JiraPriorityEnum;
  [OuterIssueKey.InnerData]: InnerIssue[];
}
export interface InnerIssue {
  [InnerIssueKey.Id]: number;
  [InnerIssueKey.HasChanges]: boolean;
  [InnerIssueKey.IssueKey]: Link;
  [InnerIssueKey.IssueType]: JiraTypeEnum | JiraIssueTypeData;
  [InnerIssueKey.Summary]: string;
  [InnerIssueKey.OwnerTeam]: string;
  [InnerIssueKey.Status]: JiraChangesHistory;
  [InnerIssueKey.LastUpdate]: string;
  [InnerIssueKey.Priority]: string;
  [InnerIssueKey.Sprint]: JiraChangesHistory;
}

export interface OutgoingDependenciesCustomData extends Table<OuterIssue, InnerIssue> {
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
  [OuterArtIssueKey.IssueKey]: Link;
  [OuterArtIssueKey.IssueType]: JiraTypeEnum | JiraIssueTypeData;
  [OuterArtIssueKey.Summary]: string;
  [OuterArtIssueKey.Status]: JiraChangesHistory;
  [OuterArtIssueKey.ActiveDependencies]: number;
  [OuterArtIssueKey.InnerData]: InnerArtIssue[];
}
export interface InnerArtIssue {
  [InnerArtIssueKey.Id]: number;
  [InnerArtIssueKey.HasChanges]: boolean;
  [InnerArtIssueKey.IssueKey]: Link;
  [InnerArtIssueKey.IssueType]: JiraTypeEnum | JiraIssueTypeData;
  [InnerArtIssueKey.Summary]: string;
  [InnerArtIssueKey.OwnerTeam]: string;
  [InnerArtIssueKey.OwnerArt]: string;
  [InnerArtIssueKey.Status]: JiraChangesHistory;
  [InnerArtIssueKey.LastUpdate]: string;
  [InnerArtIssueKey.FixedVersion]: JiraChangesHistory;
  [InnerArtIssueKey.PlannedVersion]: JiraChangesHistory;
}

export interface OutgoingArtDependenciesCustomData extends Table<OuterArtIssue, InnerArtIssue> {
  total: number;
}
