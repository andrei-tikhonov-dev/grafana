import {
  JiraTypeEnum,
  JiraPriorityEnum,
  ColumnMeta,
  Table,
  ColumnTypeEnum,
  Link,
  JiraChangesHistory,
  UserInterface,
  JiraIssueTypeData,
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
  [TeamIssueKey.IssueKey]: Link;
  [TeamIssueKey.IssueType]: JiraTypeEnum | JiraIssueTypeData;
  [TeamIssueKey.Summary]: string;
  [TeamIssueKey.Status]: JiraChangesHistory;
  [TeamIssueKey.Assignee]: UserInterface;
  [TeamIssueKey.Priority]: JiraPriorityEnum;
  [TeamIssueKey.SimilarTasks]: number;
  [TeamIssueKey.InnerData]: SimilarIssue[];
}
export interface SimilarIssue {
  [SimilarIssueKey.Id]: number;
  [SimilarIssueKey.IssueKey]: Link;
  [SimilarIssueKey.IssueType]: JiraTypeEnum | JiraIssueTypeData;
  [SimilarIssueKey.Summary]: string;
  [SimilarIssueKey.OwnerTeam]: string;
  [SimilarIssueKey.Status]: JiraChangesHistory;
  [SimilarIssueKey.LastUpdate]: string;
  [SimilarIssueKey.Priority]: string;
  [SimilarIssueKey.Sprint]: JiraChangesHistory;
}

export interface SimilarIssuesCustomData extends Table<TeamIssue, SimilarIssue> {}

const issuesColumns: ColumnMeta[] = [
  {
    key: TeamIssueKey.IssueKey,
    title: 'Issue key',
    type: ColumnTypeEnum.Link,
  },
  {
    key: TeamIssueKey.IssueType,
    type: ColumnTypeEnum.IssueTypeIcon,
  },
  {
    key: TeamIssueKey.Summary,
    title: 'Summary',
    type: ColumnTypeEnum.Text,
  },
  {
    key: TeamIssueKey.Priority,
    title: 'Priority',
    type: ColumnTypeEnum.Priority,
  },
  {
    key: TeamIssueKey.Assignee,
    title: 'Assignee',
    type: ColumnTypeEnum.User,
  },
  {
    key: TeamIssueKey.Status,
    title: 'Status',
    type: ColumnTypeEnum.IssueStatus,
  },
  {
    key: TeamIssueKey.SimilarTasks,
    title: 'Similar issues',
    type: ColumnTypeEnum.Number,
  },
];

const similarIssuesColumns: ColumnMeta[] = [
  {
    key: SimilarIssueKey.IssueKey,
    title: 'Issue key',
    type: ColumnTypeEnum.Link,
  },
  {
    key: SimilarIssueKey.IssueType,
    type: ColumnTypeEnum.IssueTypeIcon,
  },
  {
    key: SimilarIssueKey.Summary,
    title: 'Summary',
    type: ColumnTypeEnum.Text,
  },
  {
    key: SimilarIssueKey.OwnerTeam,
    title: 'Owner team',
    type: ColumnTypeEnum.Team,
  },
  {
    key: SimilarIssueKey.Priority,
    title: 'Priority',
    type: ColumnTypeEnum.Priority,
  },
  {
    key: SimilarIssueKey.Status,
    title: 'Status',
    type: ColumnTypeEnum.IssueStatus,
  },
  {
    key: SimilarIssueKey.Sprint,
    title: 'Planned sprint',
    type: ColumnTypeEnum.Sprint,
  },
  {
    key: SimilarIssueKey.LastUpdate,
    title: 'Last update',
    type: ColumnTypeEnum.Date,
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
      issueType: JiraTypeEnum.Story,
      summary: 'Implement user authentication flow',
      status: {
        current: 'In Progress',
        previous: null,
      },
      assignee: {
        name: 'John Smith',
        avatar: 'https://avatars.company.com/john-smith.jpg',
      },
      priority: JiraPriorityEnum.High,
      similarTasks: 3,
      innerData: [
        {
          id: 2001,
          issueKey: {
            url: 'https://jira.company.com/browse/PROJ-124',
            text: 'PROJ-124',
          },
          issueType: JiraTypeEnum.Story,
          summary: 'Design authentication API endpoints',
          ownerTeam: 'Backend Team',
          status: {
            current: 'Done',
            previous: null,
          },
          lastUpdate: '2025-05-01T10:30:45Z',
          priority: JiraPriorityEnum.High,
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
          issueType: JiraTypeEnum.Story,
          summary: 'Create UI components for login form',
          ownerTeam: 'Frontend Team',
          status: {
            current: 'In Progress',
            previous: null,
          },
          lastUpdate: '2025-05-03T14:20:15Z',
          priority: JiraPriorityEnum.Medium,
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
          issueType: JiraTypeEnum.Story,
          summary: 'Set up authentication service',
          ownerTeam: 'DevOps Team',
          status: {
            current: 'To Do',
            previous: null,
          },
          lastUpdate: '2025-05-02T09:15:30Z',
          priority: JiraPriorityEnum.High,
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
      issueType: JiraTypeEnum.Epic,
      summary: 'Payment gateway integration',
      status: {
        current: 'To Do',
        previous: null,
      },
      assignee: {
        name: 'Emma Johnson',
        avatar: 'https://avatars.company.com/emma-johnson.jpg',
      },
      priority: JiraPriorityEnum.Critical,
      similarTasks: 3,
      innerData: [
        {
          id: 3001,
          issueKey: {
            url: 'https://jira.company.com/browse/PROJ-457',
            text: 'PROJ-457',
          },
          issueType: JiraTypeEnum.Story,
          summary: 'Research payment gateway options',
          ownerTeam: 'Research Team',
          status: {
            current: 'Done',
            previous: null,
          },
          lastUpdate: '2025-04-28T16:45:22Z',
          priority: JiraPriorityEnum.Highest,
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
          issueType: JiraTypeEnum.Story,
          summary: 'Implement payment gateway API connector',
          ownerTeam: 'Backend Team',
          status: {
            current: 'In Progress',
            previous: null,
          },
          lastUpdate: '2025-05-05T11:12:40Z',
          priority: JiraPriorityEnum.Critical,
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
          issueType: JiraTypeEnum.Story,
          summary: 'Design payment confirmation UI',
          ownerTeam: 'UX Team',
          status: {
            current: 'To Do',
            previous: null,
          },
          lastUpdate: '2025-05-06T13:25:10Z',
          priority: JiraPriorityEnum.High,
          sprint: {
            current: 'Sprint 25',
            previous: null,
          },
        },
      ],
    },
  ],
};
