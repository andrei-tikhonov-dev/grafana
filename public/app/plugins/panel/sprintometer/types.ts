export enum EColumnType {
  Link = 'link',
  HasChanges = 'hasChanges',
  IssueTypeIcon = 'issueTypeIcon',
  Text = 'text',
  IssueStatus = 'issueStatus',
  User = 'user',
  Priority = 'priority',
  Team = 'team',
  ART = 'art',
  Date = 'date',
  Number = 'number',
  Boolean = 'boolean',
  Sprint = 'sprint',
  Changes = 'changes',
  Default = 'default',
}

export type TColumnSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

export interface TBasePanelOptions {
  panelType: EPanelType;
  savedState: string; // JSON-string
}

export interface TBurndownOptionsNS {
  burndown?: {};
}

export interface THeaderOptionsNS {
  header?: {};
}

export interface TIssueMapOptionsNS {
  sankey: {
    filterFields: string[];
  };
}

export type TPanelOptions = TBasePanelOptions & TBurndownOptionsNS & THeaderOptionsNS & TIssueMapOptionsNS;

export const enum EPanelType {
  BurndownChart = 'BurndownChart',
  ComponentsLibrary = 'ComponentsLibrary',
  CumulativeFlowDiagram = 'CumulativeFlowDiagram',
  EmptyPanel = 'EmptyPanel',
  Header = 'Header',
  IncomingDependencies = 'IncomingDependencies',
  OutgoingDependencies = 'OutgoingDependencies',
  PlannerBoard = 'PlannerBoard',
  SimilarIssues = 'SimilarIssues',
  Roadmap = 'Roadmap',
  IssueMap = 'IssueMap',
  AI = 'AI',
}

export interface TTable<Data, InnerData = unknown> {
  columns: TColumnMeta[];
  innerColumns: TColumnMeta[];
  data: Array<Data & { innerData?: InnerData[] }>;
}

export interface TColumnMeta {
  key: string;
  type: EColumnType | string;

  title?: string;
  hidden?: boolean;
  unit?: string;
  editable?: boolean;
  options?: Array<{ id: number; label: string }>;
  tip?: string;
  size?: TColumnSize;
}

export enum EJiraPriority {
  Blocker = 'blocker',
  Critical = 'critical',
  Highest = 'highest',
  High = 'high',
  Major = 'major',
  Medium = 'medium',
  Minor = 'minor',
  Low = 'low',
}

export type TJiraPriority = EJiraPriority | string;

export enum EJiraType {
  Story = 'story',
  Task = 'task',
  Bug = 'bug',
  Epic = 'epic',
  StrategicTheme = 'strategicTheme',
  StrategicStep = 'strategicStep',
  Capability = 'capability',
  Feature = 'feature',
  Objective = 'objective',
  Improvement = 'improvement',
  Incident = 'incident',
}

export enum EJiraStatus {
  ToDo = 'toDo',
  InProgress = 'inProgress',
  Done = 'done',
}

export enum EDashboardStatus {
  Complete = 'Complete',
  Good = 'Good',
  OnTrack = 'OnTrack',
  Warning = 'Warning',
  Blocked = 'Blocked',
  Critical = 'Critical',
  ReadyForReview = 'ReadyForReview',
  UnderControl = 'UnderControl',
  MonitorClosely = 'MonitorClosely',
  ExceededResources = 'ExceededResources',
  PlentyResources = 'PlentyResources',
}

export interface TJiraStatus {
  type: EJiraStatus;
  name: string;
}

export interface TJiraIssueType {
  type: EJiraType | string;
  name: string;
}

export enum ESprintometerStatus {
  Default = 'Default',
  OnTrack = 'OnTrack',
  NeedsAttention = 'NeedsAttention',
  HighRisk = 'HighRisk',
}

export interface MSprintometerStatusData {
  status: ESprintometerStatus;
  name: string; // Display name for the status (e.g., "On track", "Needs attention")
  summary: string; // Brief status description for preview or tooltip
  details: string; // Detailed description in Markdown format with recommendations
}

export type TSprintometerStatus = ESprintometerStatus | string;

export type TDashboardStatus = keyof typeof EDashboardStatus;

export type TUrl = string;

// example: 2025-05-20T15:30:00Z
export type TDate = string;

export interface TLink {
  url: TUrl;
  text: string;
}

export interface TJiraChangesHistory {
  current: string;
  previous?: string | null;
}

export interface TUser {
  name: string;
  avatar?: string;
  url?: TUrl;
}

export interface TPeriod {
  startDate: TDate;
  endDate: TDate;
  isCurrent?: boolean;
  currentDate?: TDate;
}

export interface TRequestInfo extends Record<string, any> {}

export interface TZeroState {
  title: string;
  description: string;
  link?: TLink;
}

export type TId = number;

export interface BaseCustomData extends Record<string, any> {
  zeroState?: TZeroState;
}

export interface TAiData {
  title: string;
  content: string;
}
