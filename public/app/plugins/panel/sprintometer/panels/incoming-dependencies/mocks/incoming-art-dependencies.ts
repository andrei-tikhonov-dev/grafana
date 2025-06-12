import { ColumnMeta, ColumnTypeEnum, JiraTypeEnum } from '../../../types';
import { IncomingArtDependenciesCustomData, InnerArtIssueKey, OuterArtIssueKey } from '../types';

const columns: ColumnMeta[] = [
  {
    key: OuterArtIssueKey.IssueKey,
    title: 'Feature key',
    type: ColumnTypeEnum.Link,
  },
  {
    key: OuterArtIssueKey.IssueType,
    type: ColumnTypeEnum.IssueTypeIcon,
  },
  {
    key: OuterArtIssueKey.Summary,
    title: 'Summary',
    type: ColumnTypeEnum.Text,
  },
  {
    key: OuterArtIssueKey.HasChanges,
    type: ColumnTypeEnum.HasChanges,
  },
  {
    key: OuterArtIssueKey.Status,
    title: 'Status',
    type: ColumnTypeEnum.IssueStatus,
  },
  {
    key: OuterArtIssueKey.ActiveDependencies,
    title: 'Active dependencies',
    type: ColumnTypeEnum.Number,
  },
];

const innerColumns: ColumnMeta[] = [
  {
    key: InnerArtIssueKey.IssueKey,
    title: 'Issue key',
    type: ColumnTypeEnum.Link,
  },
  {
    key: InnerArtIssueKey.IssueType,
    type: ColumnTypeEnum.IssueTypeIcon,
  },
  {
    key: InnerArtIssueKey.Summary,
    title: 'Summary',
    type: ColumnTypeEnum.Text,
  },
  {
    key: InnerArtIssueKey.HasChanges,
    type: ColumnTypeEnum.HasChanges,
  },
  {
    key: InnerArtIssueKey.OwnerArt,
    title: 'Owner ART',
    type: ColumnTypeEnum.Team,
  },
  {
    key: InnerArtIssueKey.OwnerTeam,
    title: 'Owner team',
    type: ColumnTypeEnum.Team,
  },
  {
    key: InnerArtIssueKey.Status,
    title: 'Status',
    type: ColumnTypeEnum.IssueStatus,
  },
  {
    key: InnerArtIssueKey.FixedVersion,
    title: 'Fixed version',
    type: ColumnTypeEnum.Changes,
  },
  {
    key: InnerArtIssueKey.PlannedVersion,
    title: 'Planned version',
    type: ColumnTypeEnum.Changes,
    size: 'sm',
  },
  {
    key: InnerArtIssueKey.LastUpdate,
    title: 'Last update',
    type: ColumnTypeEnum.Date,
    size: 'sm',
  },
];

export const data: IncomingArtDependenciesCustomData = {
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
      issueType: JiraTypeEnum.Epic,
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
          issueType: JiraTypeEnum.Story,
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
          issueType: JiraTypeEnum.Story,
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
      issueType: JiraTypeEnum.Story,
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
          issueType: JiraTypeEnum.Story,
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
          issueType: JiraTypeEnum.Task,
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
          issueType: JiraTypeEnum.Story,
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
      issueType: JiraTypeEnum.Epic,
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
          issueType: JiraTypeEnum.Story,
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
