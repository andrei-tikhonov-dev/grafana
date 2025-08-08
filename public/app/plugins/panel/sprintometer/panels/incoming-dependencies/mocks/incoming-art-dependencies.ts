import { TColumnMeta, EColumnType, EJiraType } from '../../../types';
import { MCustomData, EInnerArtIssueKey, EOuterArtIssueKey } from '../types';

const columns: TColumnMeta[] = [
  {
    key: EOuterArtIssueKey.IssueKey,
    title: 'Feature key',
    type: EColumnType.Link,
  },
  {
    key: EOuterArtIssueKey.IssueType,
    type: EColumnType.IssueTypeIcon,
  },
  {
    key: EOuterArtIssueKey.Summary,
    title: 'Summary',
    type: EColumnType.Text,
  },
  {
    key: EOuterArtIssueKey.HasChanges,
    type: EColumnType.HasChanges,
  },
  {
    key: EOuterArtIssueKey.Status,
    title: 'Status',
    type: EColumnType.IssueStatus,
  },
  {
    key: EOuterArtIssueKey.ActiveDependencies,
    title: 'Active dependencies',
    type: EColumnType.Number,
  },
];

const innerColumns: TColumnMeta[] = [
  {
    key: EInnerArtIssueKey.IssueKey,
    title: 'Issue key',
    type: EColumnType.Link,
  },
  {
    key: EInnerArtIssueKey.IssueType,
    type: EColumnType.IssueTypeIcon,
  },
  {
    key: EInnerArtIssueKey.Summary,
    title: 'Summary',
    type: EColumnType.Text,
  },
  {
    key: EInnerArtIssueKey.HasChanges,
    type: EColumnType.HasChanges,
  },
  {
    key: EInnerArtIssueKey.OwnerArt,
    title: 'Owner ART',
    type: EColumnType.Team,
  },
  {
    key: EInnerArtIssueKey.OwnerTeam,
    title: 'Owner team',
    type: EColumnType.Team,
  },
  {
    key: EInnerArtIssueKey.Status,
    title: 'Status',
    type: EColumnType.IssueStatus,
  },
  {
    key: EInnerArtIssueKey.FixedVersion,
    title: 'Fixed version',
    type: EColumnType.Changes,
  },
  {
    key: EInnerArtIssueKey.PlannedVersion,
    title: 'Planned version',
    type: EColumnType.Changes,
    size: 'sm',
  },
  {
    key: EInnerArtIssueKey.LastUpdate,
    title: 'Last update',
    type: EColumnType.Date,
    size: 'sm',
  },
];

export const data: MCustomData = {
  columns,
  innerColumns,
  data: [
    {
      id: 4001,
      hasChanges: true,
      issueKey: {
        url: 'https://jira.company.com/browse/FEAT-789',
        text: 'FEAT-789',
      },
      issueType: EJiraType.Epic,
      summary: 'Mobile app performance optimization',
      status: {
        current: 'In Progress',
        previous: 'To Do',
      },
      activeDependencies: 2,
      innerData: [
        {
          id: 5001,
          hasChanges: true,
          issueKey: {
            url: 'https://jira.company.com/browse/TECH-101',
            text: 'TECH-101',
          },
          issueType: EJiraType.Story,
          summary: 'Optimize database queries for mobile API',
          ownerTeam: 'Platform Team',
          ownerArt: 'Platform ART',
          status: {
            current: 'Code Review',
            previous: 'In Progress',
          },
          lastUpdate: '2025-05-20T15:30:00Z',
          fixedVersion: {
            current: 'v2.1.0',
            previous: 'v2.0.0',
          },
          plannedVersion: {
            current: 'v2.1.0',
            previous: null,
          },
        },
        {
          id: 5002,
          hasChanges: false,
          issueKey: {
            url: 'https://jira.company.com/browse/TECH-102',
            text: 'TECH-102',
          },
          issueType: EJiraType.Story,
          summary: 'Implement image compression middleware',
          ownerTeam: 'Infrastructure Team',
          ownerArt: 'Platform ART',
          status: {
            current: 'To Do',
            previous: null,
          },
          lastUpdate: '2025-05-18T09:45:12Z',
          fixedVersion: {
            current: 'v2.2.0',
            previous: null,
          },
          plannedVersion: {
            current: 'v2.1.0',
            previous: 'v2.0.0',
          },
        },
      ],
    },
    {
      id: 4002,
      hasChanges: true,
      issueKey: {
        url: 'https://jira.company.com/browse/FEAT-890',
        text: 'FEAT-890',
      },
      issueType: EJiraType.Story,
      summary: 'Real-time notifications system',
      status: {
        current: 'Ready for Testing',
        previous: 'In Progress',
      },
      activeDependencies: 3,
      innerData: [
        {
          id: 6001,
          hasChanges: true,
          issueKey: {
            url: 'https://jira.company.com/browse/INFRA-201',
            text: 'INFRA-201',
          },
          issueType: EJiraType.Story,
          summary: 'Setup WebSocket infrastructure',
          ownerTeam: 'DevOps Team',
          ownerArt: 'Infrastructure ART',
          status: {
            current: 'Done',
            previous: 'Testing',
          },
          lastUpdate: '2025-05-22T11:15:30Z',
          fixedVersion: {
            current: 'v1.5.0',
            previous: 'v1.4.0',
          },
          plannedVersion: {
            current: 'v1.5.0',
            previous: null,
          },
        },
        {
          id: 6002,
          hasChanges: false,
          issueKey: {
            url: 'https://jira.company.com/browse/INFRA-202',
            text: 'INFRA-202',
          },
          issueType: EJiraType.Task,
          summary: 'Configure push notification service',
          ownerTeam: 'Backend Team',
          ownerArt: 'Platform ART',
          status: {
            current: 'In Progress',
            previous: 'To Do',
          },
          lastUpdate: '2025-05-24T14:20:45Z',
          fixedVersion: {
            current: 'v1.6.0',
            previous: null,
          },
          plannedVersion: {
            current: 'v1.5.0',
            previous: 'v1.4.0',
          },
        },
        {
          id: 6003,
          hasChanges: true,
          issueKey: {
            url: 'https://jira.company.com/browse/INFRA-203',
            text: 'INFRA-203',
          },
          issueType: EJiraType.Story,
          summary: 'Implement notification preferences API',
          ownerTeam: 'API Team',
          ownerArt: 'Product ART',
          status: {
            current: 'Code Review',
            previous: 'In Progress',
          },
          lastUpdate: '2025-05-25T16:30:20Z',
          fixedVersion: {
            current: 'v1.6.0',
            previous: 'v1.5.0',
          },
          plannedVersion: {
            current: 'v1.6.0',
            previous: null,
          },
        },
      ],
    },
    {
      id: 4003,
      hasChanges: false,
      issueKey: {
        url: 'https://jira.company.com/browse/FEAT-991',
        text: 'FEAT-991',
      },
      issueType: EJiraType.Epic,
      summary: 'Multi-language support implementation',
      status: {
        current: 'Planning',
        previous: null,
      },
      activeDependencies: 1,
      innerData: [
        {
          id: 7001,
          hasChanges: false,
          issueKey: {
            url: 'https://jira.company.com/browse/I18N-301',
            text: 'I18N-301',
          },
          issueType: EJiraType.Story,
          summary: 'Setup internationalization framework',
          ownerTeam: 'Frontend Team',
          ownerArt: 'UI/UX ART',
          status: {
            current: 'To Do',
            previous: null,
          },
          lastUpdate: '2025-05-15T10:00:00Z',
          fixedVersion: {
            current: 'v3.0.0',
            previous: null,
          },
          plannedVersion: {
            current: 'v3.0.0',
            previous: null,
          },
        },
      ],
    },
  ],
  total: 6,
};
