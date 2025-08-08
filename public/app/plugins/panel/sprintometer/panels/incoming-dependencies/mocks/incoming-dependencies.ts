import { TColumnMeta, EColumnType, EJiraType } from '../../../types';
import { MData, EInnerIssueKey, EOuterIssueKey } from '../types';

const columns: TColumnMeta[] = [
  {
    key: EOuterIssueKey.IssueKey,
    title: 'Issue key',
    type: EColumnType.Link,
  },
  {
    key: EOuterIssueKey.IssueType,
    type: EColumnType.IssueTypeIcon,
  },
  {
    key: EOuterIssueKey.Summary,
    title: 'Summary',
    type: EColumnType.Text,
  },
  {
    key: EOuterIssueKey.HasChanges,
    type: EColumnType.HasChanges,
  },
  {
    key: EOuterIssueKey.Priority,
    title: 'Priority',
    type: EColumnType.Priority,
  },
  {
    key: EOuterIssueKey.Assignee,
    title: 'Assignee',
    type: EColumnType.User,
  },
  {
    key: EOuterIssueKey.Status,
    title: 'Status',
    type: EColumnType.IssueStatus,
  },
  {
    key: EOuterIssueKey.ActiveDependencies,
    title: 'Active dependencies',
    type: EColumnType.Number,
  },
];

const innerColumns: TColumnMeta[] = [
  {
    key: EInnerIssueKey.IssueKey,
    title: 'Issue key',
    type: EColumnType.Link,
  },
  {
    key: EInnerIssueKey.IssueType,
    type: EColumnType.IssueTypeIcon,
  },
  {
    key: EInnerIssueKey.Summary,
    title: 'Summary',
    type: EColumnType.Text,
  },
  {
    key: EInnerIssueKey.HasChanges,
    type: EColumnType.HasChanges,
  },
  {
    key: EInnerIssueKey.OwnerTeam,
    title: 'Owner team',
    type: EColumnType.Team,
  },
  {
    key: EInnerIssueKey.Priority,
    title: 'Priority',
    type: EColumnType.Priority,
  },
  {
    key: EInnerIssueKey.Status,
    title: 'Status',
    type: EColumnType.IssueStatus,
  },
  {
    key: EInnerIssueKey.Sprint,
    title: 'Planned sprint',
    type: EColumnType.Sprint,
  },
  {
    key: EInnerIssueKey.LastUpdate,
    title: 'Last update',
    type: EColumnType.Date,
  },
];

export const data: MData = {
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
      issueType: EJiraType.Story,
      summary: 'Implement user authentication flow',
      status: {
        current: 'In Progress',
        previous: 'To Do',
      },
      assignee: {
        name: 'John Smith',
        avatar: 'https://avatars.company.com/john-smith.jpg',
      },
      priority: 'high',
      activeDependencies: 3,
      innerData: [
        {
          id: 2001,
          hasChanges: true,
          issueKey: {
            url: 'https://jira.company.com/browse/PROJ-124',
            text: 'PROJ-124',
          },
          issueType: EJiraType.Story,
          summary: 'Design authentication API endpoints',
          ownerTeam: 'Backend Team',
          status: {
            current: 'Done',
            previous: 'In Progress',
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
          hasChanges: true,
          issueKey: {
            url: 'https://jira.company.com/browse/PROJ-125',
            text: 'PROJ-125',
          },
          issueType: EJiraType.Story,
          summary: 'Create UI components for login form',
          ownerTeam: 'Frontend Team',
          status: {
            current: 'In Progress',
            previous: 'To Do',
          },
          lastUpdate: '2025-05-03T14:20:15Z',
          priority: 'medium',
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
      hasChanges: false,
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
      activeDependencies: 3,
      innerData: [
        {
          id: 3001,
          hasChanges: false,
          issueKey: {
            url: 'https://jira.company.com/browse/PROJ-457',
            text: 'PROJ-457',
          },
          issueType: EJiraType.Story,
          summary: 'Research payment gateway options',
          ownerTeam: 'Research Team',
          status: {
            current: 'Done',
            previous: 'In Progress',
          },
          lastUpdate: '2025-04-28T16:45:22Z',
          priority: 'highest',
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
          issueType: EJiraType.Story,
          summary: 'Implement payment gateway API connector',
          ownerTeam: 'Backend Team',
          status: {
            current: 'In Progress',
            previous: 'To Do',
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
          hasChanges: false,
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
            previous: 'Sprint 24',
          },
        },
      ],
    },
  ],
  total: 6,
};
