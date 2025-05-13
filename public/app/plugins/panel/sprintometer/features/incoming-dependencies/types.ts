import {
  JiraType,
  JiraPriority,
  ColumnMeta,
  Table,
  ColumnType,
  User,
  Link,
  StatusChanges,
  SprintChanges,
} from '../../types';

enum DependantIssueKey {
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

enum DependencyIssueKey {
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

export interface DependantIssue {
  [DependantIssueKey.Id]: number;
  [DependantIssueKey.HasChanges]: boolean;
  [DependantIssueKey.IssueKey]: Link;
  [DependantIssueKey.IssueType]: JiraType;
  [DependantIssueKey.Summary]: string;
  [DependantIssueKey.Status]: StatusChanges;
  [DependantIssueKey.Assignee]: User;
  [DependantIssueKey.Priority]: JiraPriority;
  [DependantIssueKey.ActiveDependencies]: number;
  [DependantIssueKey.InnerData]: DependencyIssue[];
}
export interface DependencyIssue {
  [DependencyIssueKey.Id]: number;
  [DependencyIssueKey.HasChanges]: boolean;
  [DependencyIssueKey.IssueKey]: Link;
  [DependencyIssueKey.IssueType]: JiraType;
  [DependencyIssueKey.Summary]: string;
  [DependencyIssueKey.OwnerTeam]: string;
  [DependencyIssueKey.Status]: StatusChanges;
  [DependencyIssueKey.LastUpdate]: string;
  [DependencyIssueKey.Priority]: string;
  [DependencyIssueKey.Sprint]: SprintChanges;
}

export interface IncomingDependenciesCustomData extends Table<DependantIssue, DependencyIssue> {
  total: number;
}

const dependantColumns: ColumnMeta[] = [
  {
    key: DependantIssueKey.IssueKey,
    title: 'Issue key',
    type: ColumnType.Link,
  },
  {
    key: DependantIssueKey.IssueType,
    type: ColumnType.IssueTypeIcon,
  },
  {
    key: DependantIssueKey.Summary,
    title: 'Summary',
    type: ColumnType.Text,
  },
  {
    key: DependantIssueKey.HasChanges,
    type: ColumnType.HasChanges,
  },
  {
    key: DependantIssueKey.Priority,
    title: 'Priority',
    type: ColumnType.Priority,
  },
  {
    key: DependantIssueKey.Assignee,
    title: 'Assignee',
    type: ColumnType.User,
  },
  {
    key: DependantIssueKey.Status,
    title: 'Status',
    type: ColumnType.IssueStatus,
  },
  {
    key: DependantIssueKey.ActiveDependencies,
    title: 'Active dependencies',
    type: ColumnType.Number,
  },
];

const dependencyColumns: ColumnMeta[] = [
  {
    key: DependencyIssueKey.IssueKey,
    title: 'Issue key',
    type: ColumnType.Link,
  },
  {
    key: DependencyIssueKey.IssueType,
    type: ColumnType.IssueTypeIcon,
  },
  {
    key: DependencyIssueKey.Summary,
    title: 'Summary',
    type: ColumnType.Text,
  },
  {
    key: DependencyIssueKey.HasChanges,
    type: ColumnType.HasChanges,
  },
  {
    key: DependencyIssueKey.OwnerTeam,
    title: 'Owner team',
    type: ColumnType.Team,
  },
  {
    key: DependencyIssueKey.Priority,
    title: 'Priority',
    type: ColumnType.Priority,
  },
  {
    key: DependencyIssueKey.Status,
    title: 'Status',
    type: ColumnType.IssueStatus,
  },
  {
    key: DependencyIssueKey.Sprint,
    title: 'Planned sprint',
    type: ColumnType.Sprint,
  },
  {
    key: DependencyIssueKey.LastUpdate,
    title: 'Last update',
    type: ColumnType.Date,
  },
];

export const tempData: IncomingDependenciesCustomData = {
  columns: dependantColumns,
  innerColumns: dependencyColumns,
  data: [
    {
      id: 1001,
      hasChanges: true,
      issueKey: {
        url: 'https://jira.company.com/browse/PROJ-123',
        text: 'PROJ-123',
      },
      issueType: JiraType.Story,
      summary: 'Implement user authentication flow',
      status: {
        current: 'In Progress',
        previous: 'To Do',
      },
      assignee: {
        name: 'John Smith',
        avatar: 'https://avatars.company.com/john-smith.jpg',
      },
      priority: JiraPriority.High,
      activeDependencies: 3,
      innerData: [
        {
          id: 2001,
          hasChanges: true,
          issueKey: {
            url: 'https://jira.company.com/browse/PROJ-124',
            text: 'PROJ-124',
          },
          issueType: JiraType.Story,
          summary: 'Design authentication API endpoints',
          ownerTeam: 'Backend Team',
          status: {
            current: 'Done',
            previous: 'In Progress',
          },
          lastUpdate: '2025-05-01T10:30:45Z',
          priority: JiraPriority.High,
          sprint: {
            current: 'Sprint 24',
            previous: null,
          },
        },
        {
          id: 2002,
          hasChanges: true,
          issueKey: {
            url: 'https://jira.company.com/browse/PROJ-125',
            text: 'PROJ-125',
          },
          issueType: JiraType.Story,
          summary: 'Create UI components for login form',
          ownerTeam: 'Frontend Team',
          status: {
            current: 'In Progress',
            previous: 'To Do',
          },
          lastUpdate: '2025-05-03T14:20:15Z',
          priority: JiraPriority.Medium,
          sprint: {
            current: 'Sprint 24',
            previous: 'Sprint 23',
          },
        },
        {
          hasChanges: false,
          id: 2003,
          issueKey: {
            url: 'https://jira.company.com/browse/PROJ-126',
            text: 'PROJ-126',
          },
          issueType: JiraType.Story,
          summary: 'Set up authentication service',
          ownerTeam: 'DevOps Team',
          status: {
            current: 'To Do',
            previous: null,
          },
          lastUpdate: '2025-05-02T09:15:30Z',
          priority: JiraPriority.High,
          sprint: {
            current: 'Sprint 25',
            previous: null,
          },
        },
      ],
    },
    {
      id: 1002,
      hasChanges: false,
      issueKey: {
        url: 'https://jira.company.com/browse/PROJ-456',
        text: 'PROJ-456',
      },
      issueType: JiraType.Epic,
      summary: 'Payment gateway integration',
      status: {
        current: 'To Do',
        previous: null,
      },
      assignee: {
        name: 'Emma Johnson',
        avatar: 'https://avatars.company.com/emma-johnson.jpg',
      },
      priority: JiraPriority.Critical,
      activeDependencies: 3,
      innerData: [
        {
          id: 3001,
          hasChanges: false,
          issueKey: {
            url: 'https://jira.company.com/browse/PROJ-457',
            text: 'PROJ-457',
          },
          issueType: JiraType.Story,
          summary: 'Research payment gateway options',
          ownerTeam: 'Research Team',
          status: {
            current: 'Done',
            previous: 'In Progress',
          },
          lastUpdate: '2025-04-28T16:45:22Z',
          priority: JiraPriority.Highest,
          sprint: {
            current: 'Sprint 23',
            previous: null,
          },
        },
        {
          id: 3002,
          hasChanges: false,
          issueKey: {
            url: 'https://jira.company.com/browse/PROJ-458',
            text: 'PROJ-458',
          },
          issueType: JiraType.Story,
          summary: 'Implement payment gateway API connector',
          ownerTeam: 'Backend Team',
          status: {
            current: 'In Progress',
            previous: 'To Do',
          },
          lastUpdate: '2025-05-05T11:12:40Z',
          priority: JiraPriority.Critical,
          sprint: {
            current: 'Sprint 24',
            previous: null,
          },
        },
        {
          id: 3003,
          hasChanges: false,
          issueKey: {
            url: 'https://jira.company.com/browse/PROJ-459',
            text: 'PROJ-459',
          },
          issueType: JiraType.Story,
          summary: 'Design payment confirmation UI',
          ownerTeam: 'UX Team',
          status: {
            current: 'To Do',
            previous: null,
          },
          lastUpdate: '2025-05-06T13:25:10Z',
          priority: JiraPriority.High,
          sprint: {
            current: 'Sprint 25',
            previous: 'Sprint 24',
          },
        },
      ],
    },
  ],
  total: 6,
};
