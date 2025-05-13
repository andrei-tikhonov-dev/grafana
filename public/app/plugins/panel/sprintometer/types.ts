export enum ColumnType {
  Link = 'link',
  HasChanges = 'hasChanges',
  IssueTypeIcon = 'issueTypeIcon',
  Text = 'text',
  IssueStatus = 'issueStatus',
  User = 'user',
  Priority = 'priority',
  Team = 'team',
  Date = 'date',
  Number = 'number',
  Boolean = 'boolean',
  Sprint = 'sprint',
}

export type ColumnSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

export interface PanelOptions {
  panelType: PanelType;
}

export const enum PanelType {
  BurndownChart = 'BurndownChart',
  IncomingDependencies = 'IncomingDependencies',
  SimilarTasks = 'SimilarTasks',
  EmptyPanel = 'EmptyPanel',
}

export interface Table<Data, InnerData = unknown> {
  columns: ColumnMeta[];
  innerColumns: ColumnMeta[];
  data: Array<Data & { innerData?: InnerData[] }>;
}

export interface ColumnMeta {
  key: string;
  type: ColumnType;

  title?: string;
  hidden?: boolean;
  unit?: string;
  editable?: boolean;
  options?: Array<{ id: number; label: string }>;
  tip?: string;
  size?: ColumnSize;
}

export enum JiraPriority {
  Blocker = 'blocker',
  Critical = 'critical',
  Highest = 'highest',
  High = 'high',
  Major = 'major',
  Medium = 'medium',
  Minor = 'minor',
  Low = 'low',
}

export enum JiraType {
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

export interface Link {
  url: string;
  text: string;
}

export interface StatusChanges {
  current: string;
  previous?: string | null;
}

export interface SprintChanges {
  current: string;
  previous?: string | null;
}

export interface User {
  name: string;
  avatar: string;
}
