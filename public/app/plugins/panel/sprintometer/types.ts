export enum ColumnTypeEnum {
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

export type ColumnSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

export interface PanelOptions {
  panelType: PanelTypeEnum;
  savedState: string;
}

export const enum PanelTypeEnum {
  BurndownChart = 'BurndownChart',
  CumulativeFlowDiagram = 'CumulativeFlowDiagram',
  IncomingDependencies = 'IncomingDependencies',
  OutgoingDependencies = 'OutgoingDependencies',
  SimilarTasks = 'SimilarTasks',
  EmptyPanel = 'EmptyPanel',
  Header = 'Header',
  ComponentsLibrary = 'ComponentsLibrary',
}

export interface Table<Data, InnerData = unknown> {
  columns: ColumnMeta[];
  innerColumns: ColumnMeta[];
  data: Array<Data & { innerData?: InnerData[] }>;
}

export interface ColumnMeta {
  key: string;
  type: ColumnTypeEnum;

  title?: string;
  hidden?: boolean;
  unit?: string;
  editable?: boolean;
  options?: Array<{ id: number; label: string }>;
  tip?: string;
  size?: ColumnSize;
}

export enum JiraPriorityEnum {
  Blocker = 'blocker',
  Critical = 'critical',
  Highest = 'highest',
  High = 'high',
  Major = 'major',
  Medium = 'medium',
  Minor = 'minor',
  Low = 'low',
}

export enum JiraTypeEnum {
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

export enum PanelStatusEnum {
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

export interface JiraIssueTypeData {
  type: JiraTypeEnum;
  name: string;
}

export type PanelStatusType = keyof typeof PanelStatusEnum;

export type UrlType = string;

// example: 2025-05-20T15:30:00Z
export type DateType = string;

export interface Link {
  url: UrlType;
  text: string;
}

export interface JiraChangesHistory {
  current: string;
  previous?: string | null;
}

export interface UserInterface {
  name: string;
  avatar?: string;
  url?: UrlType;
}

export interface Period {
  startDate: DateType;
  endDate: DateType;
  currentDate?: DateType;
}

export interface RequestInfo extends Record<string, any> {}

export interface ZeroStateInterface {
  title: string;
  description: string;
  link: Link;
}
