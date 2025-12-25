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
  burndown?: {
    dashboard: EDashboard;
  };
}

export interface THeaderOptionsNS {
  header?: {
    dashboard: EDashboard;
  };
}

export interface TIssueMapOptionsNS {
  sankey: {
    dashboard: EDashboard;
    filterFields: string[];
  };
}

export interface TAiOptionsNS {
  ai: {
    dashboard: EDashboard;
  };
}

export interface TCumulativeFlowDiagramOptionsNS {
  cumulativeFlowDiagram?: {
    dashboard: EDashboard;
  };
}

export type TPanelOptions = TBasePanelOptions &
  TBurndownOptionsNS &
  THeaderOptionsNS &
  TIssueMapOptionsNS &
  TCumulativeFlowDiagramOptionsNS &
  TAiOptionsNS;

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
  /** Display name for the status (e.g., "On track", "Needs attention") */
  name: string;
  /** Brief status description for preview or tooltip */
  summary: string;
  /** Detailed description in Markdown format with recommendations */
  details: string;
}

export type TSprintometerStatus = ESprintometerStatus | string;

export type TUrl = string;

/**
 * @example
 * 2025-05-20T15:30:00Z
 */
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

export interface TBreadcrumbItem {
  url?: string;
  label: string;
}

export enum EPeriodVariant {
  Range = 'range',
  Single = 'single',
}

export type TPeriodVariant = EPeriodVariant | string;

export enum EDashboard {
  // Team
  Daily = 'Daily',
  Cockpit = 'Cockpit',
  PIMonitoring = 'PIMonitoring',
  Calendar = 'Calendar',
  BudgetGeneral = 'BudgetGeneral',
  BudgetPersonal = 'BudgetPersonal',
  MemberCapacity = 'MemberCapacity',
  HistoricalData = 'HistoricalData',
  SprintReview = 'SprintReview',
  LastSprintComponents = 'LastSprintComponents',
  SprintPlanning = 'SprintPlanning',
  PIPlanningTeam = 'PIPlanningTeam',
  AdminToolsTeam = 'AdminToolsTeam',

  // ART
  CockpitART = 'CockpitART',
  PIMonitoringART = 'PIMonitoringART',
  PIsHistoricalDataART = 'PIsHistoricalDataART',
  PIPlanningART = 'PIPlanningART',
  AdminToolsART = 'AdminToolsART',

  // DSO
  CockpitDSO = 'CockpitDSO',
  PIMonitoringDSO = 'PIMonitoringDSO',
  PIsHistoricalDataDSO = 'PIsHistoricalDataDSO',
  PlanningDSO = 'PlanningDSO',
  AdminToolsDSO = 'AdminToolsDSO',
}

export const DashboardTitles: Record<EDashboard, string> = {
  [EDashboard.Daily]: 'Team: Daily',
  [EDashboard.Cockpit]: 'Team: Team cockpit',
  [EDashboard.PIMonitoring]: 'Team: PI monitoring',
  [EDashboard.Calendar]: 'Team: Calendar',
  [EDashboard.BudgetGeneral]: 'Team: Budget general',
  [EDashboard.BudgetPersonal]: 'Team: Budget personal',
  [EDashboard.MemberCapacity]: 'Team: Team member capacity',
  [EDashboard.HistoricalData]: 'Team: Historical data',
  [EDashboard.SprintReview]: 'Team: Sprint review',
  [EDashboard.LastSprintComponents]: 'Team: Last sprint components',
  [EDashboard.SprintPlanning]: 'Team: Sprint planning',
  [EDashboard.PIPlanningTeam]: 'Team: PI planning',
  [EDashboard.AdminToolsTeam]: 'Team: Admin tools',

  [EDashboard.CockpitART]: 'ART: Cockpit',
  [EDashboard.PIMonitoringART]: 'ART: PI monitoring',
  [EDashboard.PIsHistoricalDataART]: 'ART: PIs historical data',
  [EDashboard.PIPlanningART]: 'ART: PI planning',
  [EDashboard.AdminToolsART]: 'ART: Admin tools',

  [EDashboard.CockpitDSO]: 'DSO: Cockpit',
  [EDashboard.PIMonitoringDSO]: 'DSO: PI monitoring',
  [EDashboard.PIsHistoricalDataDSO]: 'DSO: PIs historical data',
  [EDashboard.PlanningDSO]: 'DSO: Planning',
  [EDashboard.AdminToolsDSO]: 'DSO: Admin tools',
};
