import { ColumnMeta, ColumnTypeEnum, JiraPriorityEnum, JiraTypeEnum } from '../../../types';
import { IncomingDependenciesCustomData, InnerIssueKey, OuterIssueKey } from '../types';

const columns: ColumnMeta[] = [
  {
    key: OuterIssueKey.IssueKey,
    title: 'Issue key',
    type: ColumnTypeEnum.Link,
  },
  {
    key: OuterIssueKey.IssueType,
    type: ColumnTypeEnum.IssueTypeIcon,
  },
  {
    key: OuterIssueKey.Summary,
    title: 'Summary',
    type: ColumnTypeEnum.Text,
  },
  {
    key: OuterIssueKey.HasChanges,
    type: ColumnTypeEnum.HasChanges,
  },
  {
    key: OuterIssueKey.Priority,
    title: 'Priority',
    type: ColumnTypeEnum.Priority,
  },
  {
    key: OuterIssueKey.Assignee,
    title: 'Assignee',
    type: ColumnTypeEnum.User,
  },
  {
    key: OuterIssueKey.Status,
    title: 'Status',
    type: ColumnTypeEnum.IssueStatus,
  },
  {
    key: OuterIssueKey.ActiveDependencies,
    title: 'Active dependencies',
    type: ColumnTypeEnum.Number,
  },
];

const innerColumns: ColumnMeta[] = [
  {
    key: InnerIssueKey.IssueKey,
    title: 'Issue key',
    type: ColumnTypeEnum.Link,
  },
  {
    key: InnerIssueKey.IssueType,
    type: ColumnTypeEnum.IssueTypeIcon,
  },
  {
    key: InnerIssueKey.Summary,
    title: 'Summary',
    type: ColumnTypeEnum.Text,
  },
  {
    key: InnerIssueKey.HasChanges,
    type: ColumnTypeEnum.HasChanges,
  },
  {
    key: InnerIssueKey.OwnerTeam,
    title: 'Owner team',
    type: ColumnTypeEnum.Team,
  },
  {
    key: InnerIssueKey.Priority,
    title: 'Priority',
    type: ColumnTypeEnum.Priority,
  },
  {
    key: InnerIssueKey.Status,
    title: 'Status',
    type: ColumnTypeEnum.IssueStatus,
  },
  {
    key: InnerIssueKey.Sprint,
    title: 'Planned sprint',
    type: ColumnTypeEnum.Sprint,
  },
  {
    key: InnerIssueKey.LastUpdate,
    title: 'Last update',
    type: ColumnTypeEnum.Date,
  },
];

export const data: IncomingDependenciesCustomData = {
  columns,
  innerColumns,
  data: [
    {
      id: 1001,
      hasChanges: true,
      issueKey: {
        url: 'https://jira.company.com/browse/PROJ-123',
        text: 'PROJ-123',
      },
      issueType: JiraTypeEnum.Story,
      summary: 'Implement user authentication flow',
      status: {
        current: 'In Progress',
        previous: 'To Do',
      },
      assignee: {
        name: 'John Smith',
        avatar: 'https://avatars.company.com/john-smith.jpg',
      },
      priority: JiraPriorityEnum.High,
      activeDependencies: 3,
      innerData: [
        {
          id: 2001,
          hasChanges: true,
          issueKey: {
            url: 'https://jira.company.com/browse/PROJ-124',
            text: 'PROJ-124',
          },
          issueType: JiraTypeEnum.Story,
          summary: 'Design authentication API endpoints',
          ownerTeam: 'Backend Team',
          status: {
            current: 'Done',
            previous: 'In Progress',
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
          hasChanges: true,
          issueKey: {
            url: 'https://jira.company.com/browse/PROJ-125',
            text: 'PROJ-125',
          },
          issueType: JiraTypeEnum.Story,
          summary: 'Create UI components for login form',
          ownerTeam: 'Frontend Team',
          status: {
            current: 'In Progress',
            previous: 'To Do',
          },
          lastUpdate: '2025-05-03T14:20:15Z',
          priority: JiraPriorityEnum.Medium,
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
      hasChanges: false,
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
      activeDependencies: 3,
      innerData: [
        {
          id: 3001,
          hasChanges: false,
          issueKey: {
            url: 'https://jira.company.com/browse/PROJ-457',
            text: 'PROJ-457',
          },
          issueType: JiraTypeEnum.Story,
          summary: 'Research payment gateway options',
          ownerTeam: 'Research Team',
          status: {
            current: 'Done',
            previous: 'In Progress',
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
          hasChanges: false,
          issueKey: {
            url: 'https://jira.company.com/browse/PROJ-458',
            text: 'PROJ-458',
          },
          issueType: JiraTypeEnum.Story,
          summary: 'Implement payment gateway API connector',
          ownerTeam: 'Backend Team',
          status: {
            current: 'In Progress',
            previous: 'To Do',
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
          hasChanges: false,
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
            previous: 'Sprint 24',
          },
        },
      ],
    },
  ],
  total: 6,
};
