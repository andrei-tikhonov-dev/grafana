import {
  EJiraType,
  TJiraPriority,
  TColumnMeta,
  TTable,
  EColumnType,
  TLink,
  TJiraChangesHistory,
  TUser,
  TJiraIssueType,
} from '../../types';

enum TeamIssueKey {
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

enum SimilarIssueKey {
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

export interface TeamIssue {
  [TeamIssueKey.Id]: number;
  [TeamIssueKey.IssueKey]: TLink;
  [TeamIssueKey.IssueType]: EJiraType | TJiraIssueType;
  [TeamIssueKey.Summary]: string;
  [TeamIssueKey.Status]: TJiraChangesHistory;
  [TeamIssueKey.Assignee]: TUser;
  [TeamIssueKey.Priority]: TJiraPriority;
  [TeamIssueKey.SimilarTasks]: number;
  [TeamIssueKey.InnerData]: SimilarIssue[];
}
export interface SimilarIssue {
  [SimilarIssueKey.Id]: number;
  [SimilarIssueKey.IssueKey]: TLink;
  [SimilarIssueKey.IssueType]: EJiraType | TJiraIssueType;
  [SimilarIssueKey.Summary]: string;
  [SimilarIssueKey.OwnerTeam]: string;
  [SimilarIssueKey.Status]: TJiraChangesHistory;
  [SimilarIssueKey.LastUpdate]: string;
  [SimilarIssueKey.Priority]: string;
  [SimilarIssueKey.Sprint]: TJiraChangesHistory;
}

export interface SimilarIssuesCustomData extends TTable<TeamIssue, SimilarIssue> {}

const issuesColumns: TColumnMeta[] = [
  {
    key: TeamIssueKey.IssueKey,
    title: 'Issue key',
    type: EColumnType.Link,
  },
  {
    key: TeamIssueKey.IssueType,
    type: EColumnType.IssueTypeIcon,
  },
  {
    key: TeamIssueKey.Summary,
    title: 'Summary',
    type: EColumnType.Text,
  },
  {
    key: TeamIssueKey.Priority,
    title: 'Priority',
    type: EColumnType.Priority,
  },
  {
    key: TeamIssueKey.Assignee,
    title: 'Assignee',
    type: EColumnType.User,
  },
  {
    key: TeamIssueKey.Status,
    title: 'Status',
    type: EColumnType.IssueStatus,
  },
  {
    key: TeamIssueKey.SimilarTasks,
    title: 'Similar issues',
    type: EColumnType.Number,
  },
];

const similarIssuesColumns: TColumnMeta[] = [
  {
    key: SimilarIssueKey.IssueKey,
    title: 'Issue key',
    type: EColumnType.Link,
  },
  {
    key: SimilarIssueKey.IssueType,
    type: EColumnType.IssueTypeIcon,
  },
  {
    key: SimilarIssueKey.Summary,
    title: 'Summary',
    type: EColumnType.Text,
  },
  {
    key: SimilarIssueKey.OwnerTeam,
    title: 'Owner team',
    type: EColumnType.Team,
  },
  {
    key: SimilarIssueKey.Priority,
    title: 'Priority',
    type: EColumnType.Priority,
  },
  {
    key: SimilarIssueKey.Status,
    title: 'Status',
    type: EColumnType.IssueStatus,
  },
  {
    key: SimilarIssueKey.Sprint,
    title: 'Planned sprint',
    type: EColumnType.Sprint,
  },
  {
    key: SimilarIssueKey.LastUpdate,
    title: 'Last update',
    type: EColumnType.Date,
  },
];

export const tempData: SimilarIssuesCustomData = {
  columns: issuesColumns,
  innerColumns: similarIssuesColumns,
  data: [
    {
      id: 1001,
      issueKey: {
        url: 'https://jira.company.com/browse/PROJ-123',
        text: 'PROJ-123',
      },
      issueType: EJiraType.Story,
      summary: 'Implement user authentication flow',
      status: {
        current: 'In Progress',
        previous: null,
      },
      assignee: {
        name: 'John Smith',
        avatar: 'https://avatars.company.com/john-smith.jpg',
      },
      priority: 'high',
      similarTasks: 3,
      innerData: [
        {
          id: 2001,
          issueKey: {
            url: 'https://jira.company.com/browse/PROJ-124',
            text: 'PROJ-124',
          },
          issueType: EJiraType.Story,
          summary: 'Design authentication API endpoints',
          ownerTeam: 'Backend Team',
          status: {
            current: 'Done',
            previous: null,
          },
          lastUpdate: '2025-05-01T10:30:45Z',
          priority: 'high',
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
          issueType: EJiraType.Story,
          summary: 'Create UI components for login form',
          ownerTeam: 'Frontend Team',
          status: {
            current: 'In Progress',
            previous: null,
          },
          lastUpdate: '2025-05-03T14:20:15Z',
          priority: 'medium',
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
          issueType: EJiraType.Story,
          summary: 'Set up authentication service',
          ownerTeam: 'DevOps Team',
          status: {
            current: 'To Do',
            previous: null,
          },
          lastUpdate: '2025-05-02T09:15:30Z',
          priority: 'high',
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
      issueType: EJiraType.Epic,
      summary: 'Payment gateway integration',
      status: {
        current: 'To Do',
        previous: null,
      },
      assignee: {
        name: 'Emma Johnson',
        avatar: 'https://avatars.company.com/emma-johnson.jpg',
      },
      priority: 'critical',
      similarTasks: 3,
      innerData: [
        {
          id: 3001,
          issueKey: {
            url: 'https://jira.company.com/browse/PROJ-457',
            text: 'PROJ-457',
          },
          issueType: EJiraType.Story,
          summary: 'Research payment gateway options',
          ownerTeam: 'Research Team',
          status: {
            current: 'Done',
            previous: null,
          },
          lastUpdate: '2025-04-28T16:45:22Z',
          priority: 'high',
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
          issueType: EJiraType.Story,
          summary: 'Implement payment gateway API connector',
          ownerTeam: 'Backend Team',
          status: {
            current: 'In Progress',
            previous: null,
          },
          lastUpdate: '2025-05-05T11:12:40Z',
          priority: 'critical',
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
          issueType: EJiraType.Story,
          summary: 'Design payment confirmation UI',
          ownerTeam: 'UX Team',
          status: {
            current: 'To Do',
            previous: null,
          },
          lastUpdate: '2025-05-06T13:25:10Z',
          priority: 'high',
          sprint: {
            current: 'Sprint 25',
            previous: null,
          },
        },
      ],
    },
  ],
};
