import {
  JiraType,
  JiraPriority,
  ColumnMeta,
  Table,
  ColumnType,
  Link,
  StatusChanges,
  SprintChanges,
  User,
} from '../../types';

enum TeamTaskKey {
  Id = 'id',
  IssueKey = 'issueKey',
  Summary = 'summary',
  Status = 'status',
  IssueType = 'issueType',
  Assignee = 'assignee',
  Priority = 'priority',
  SimilarTasks = 'similarTasks',
  InnerData = 'innerData',
}

enum SimilarTaskKey {
  Id = 'id',
  IssueKey = 'issueKey',
  Summary = 'summary',
  Status = 'status',
  IssueType = 'issueType',
  OwnerTeam = 'ownerTeam',
  Priority = 'priority',
  LastUpdate = 'lastUpdate',
  Sprint = 'sprint',
}

export interface TeamTask {
  [TeamTaskKey.Id]: number;
  [TeamTaskKey.IssueKey]: Link;
  [TeamTaskKey.IssueType]: JiraType;
  [TeamTaskKey.Summary]: string;
  [TeamTaskKey.Status]: StatusChanges;
  [TeamTaskKey.Assignee]: User;
  [TeamTaskKey.Priority]: JiraPriority;
  [TeamTaskKey.SimilarTasks]: number;
  [TeamTaskKey.InnerData]: SimilarTask[];
}
export interface SimilarTask {
  [SimilarTaskKey.Id]: number;
  [SimilarTaskKey.IssueKey]: Link;
  [SimilarTaskKey.IssueType]: JiraType;
  [SimilarTaskKey.Summary]: string;
  [SimilarTaskKey.OwnerTeam]: string;
  [SimilarTaskKey.Status]: StatusChanges;
  [SimilarTaskKey.LastUpdate]: string;
  [SimilarTaskKey.Priority]: string;
  [SimilarTaskKey.Sprint]: SprintChanges;
}

export interface SimilarTasksCustomData extends Table<TeamTask, SimilarTask> {}

const tasksColumns: ColumnMeta[] = [
  {
    key: TeamTaskKey.IssueKey,
    title: 'Issue key',
    type: ColumnType.Link,
  },
  {
    key: TeamTaskKey.IssueType,
    type: ColumnType.IssueTypeIcon,
  },
  {
    key: TeamTaskKey.Summary,
    title: 'Summary',
    type: ColumnType.Text,
  },
  {
    key: TeamTaskKey.Priority,
    title: 'Priority',
    type: ColumnType.Priority,
  },
  {
    key: TeamTaskKey.Assignee,
    title: 'Assignee',
    type: ColumnType.User,
  },
  {
    key: TeamTaskKey.Status,
    title: 'Status',
    type: ColumnType.IssueStatus,
  },
  {
    key: TeamTaskKey.SimilarTasks,
    title: 'Similar tasks',
    type: ColumnType.Number,
  },
];

const similarTasksColumns: ColumnMeta[] = [
  {
    key: SimilarTaskKey.IssueKey,
    title: 'Issue key',
    type: ColumnType.Link,
  },
  {
    key: SimilarTaskKey.IssueType,
    type: ColumnType.IssueTypeIcon,
  },
  {
    key: SimilarTaskKey.Summary,
    title: 'Summary',
    type: ColumnType.Text,
  },
  {
    key: SimilarTaskKey.OwnerTeam,
    title: 'Owner team',
    type: ColumnType.Team,
  },
  {
    key: SimilarTaskKey.Priority,
    title: 'Priority',
    type: ColumnType.Priority,
  },
  {
    key: SimilarTaskKey.Status,
    title: 'Status',
    type: ColumnType.IssueStatus,
  },
  {
    key: SimilarTaskKey.Sprint,
    title: 'Planned sprint',
    type: ColumnType.Sprint,
  },
  {
    key: SimilarTaskKey.LastUpdate,
    title: 'Last update',
    type: ColumnType.Date,
  },
];

export const tempData: SimilarTasksCustomData = {
  columns: tasksColumns,
  innerColumns: similarTasksColumns,
  data: [
    {
      id: 1001,
      issueKey: {
        url: 'https://jira.company.com/browse/PROJ-123',
        text: 'PROJ-123',
      },
      issueType: JiraType.Story,
      summary: 'Implement user authentication flow',
      status: {
        current: 'In Progress',
        previous: null,
      },
      assignee: {
        name: 'John Smith',
        avatar: 'https://avatars.company.com/john-smith.jpg',
      },
      priority: JiraPriority.High,
      similarTasks: 3,
      innerData: [
        {
          id: 2001,
          issueKey: {
            url: 'https://jira.company.com/browse/PROJ-124',
            text: 'PROJ-124',
          },
          issueType: JiraType.Story,
          summary: 'Design authentication API endpoints',
          ownerTeam: 'Backend Team',
          status: {
            current: 'Done',
            previous: null,
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
          issueKey: {
            url: 'https://jira.company.com/browse/PROJ-125',
            text: 'PROJ-125',
          },
          issueType: JiraType.Story,
          summary: 'Create UI components for login form',
          ownerTeam: 'Frontend Team',
          status: {
            current: 'In Progress',
            previous: null,
          },
          lastUpdate: '2025-05-03T14:20:15Z',
          priority: JiraPriority.Medium,
          sprint: {
            current: 'Sprint 24',
            previous: null,
          },
        },
        {
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
      similarTasks: 3,
      innerData: [
        {
          id: 3001,
          issueKey: {
            url: 'https://jira.company.com/browse/PROJ-457',
            text: 'PROJ-457',
          },
          issueType: JiraType.Story,
          summary: 'Research payment gateway options',
          ownerTeam: 'Research Team',
          status: {
            current: 'Done',
            previous: null,
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
          issueKey: {
            url: 'https://jira.company.com/browse/PROJ-458',
            text: 'PROJ-458',
          },
          issueType: JiraType.Story,
          summary: 'Implement payment gateway API connector',
          ownerTeam: 'Backend Team',
          status: {
            current: 'In Progress',
            previous: null,
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
            previous: null,
          },
        },
      ],
    },
  ],
};
