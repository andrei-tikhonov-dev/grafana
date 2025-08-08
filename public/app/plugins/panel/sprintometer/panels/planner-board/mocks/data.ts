import { MPlannerBoardCustom } from '../types';

export const data: MPlannerBoardCustom = {
  teams: [
    {
      id: 1,
      name: 'Matterhorn',
      members: [
        {
          name: 'Emil Carter',
          avatar: 'https://i.pravatar.cc/150?img=1',
        },
        {
          name: 'Yuki Tanaka',
          avatar: 'https://i.pravatar.cc/150?img=6',
        },
      ],
      color: '#FF6B6B',
    },
    {
      id: 2,
      name: 'Helvetia',
      members: [
        {
          name: 'Rajesh Mehta',
          avatar: 'https://i.pravatar.cc/150?img=2',
        },
      ],
      color: '#4ECDC4',
    },
    {
      id: 3,
      name: 'Edelweiss',
      members: [
        {
          name: 'Assignee name',
          avatar: 'https://i.pravatar.cc/150?img=3',
        },
      ],
      color: '#45B7D1',
    },
    {
      id: 4,
      name: 'Rhône',
      members: [
        {
          name: 'Ava Nguyen',
          avatar: 'https://i.pravatar.cc/150?img=4',
        },
      ],
      color: '#96CEB4',
    },
    {
      id: 5,
      name: 'Alphorn',
      members: [
        {
          name: 'Mateo Silva',
          avatar: 'https://i.pravatar.cc/150?img=5',
        },
      ],
      color: '#FECA57',
    },
  ],
  phases: [
    {
      id: 1,
      name: 'Sprint 5 / Sprint 6',
      period: {
        startDate: '2025-04-07T00:00:00Z',
        endDate: '2025-05-04T00:00:00Z',
        isCurrent: true,
        currentDate: '2025-04-15T00:00:00Z',
      },
      description: 'DD Mon, 2025 - DD Mon, 2025',
      items: [
        // Matterhorn team (index 0)
        {
          issues: [
            {
              id: 1031,
              issueKey: 'EPC-1031',
              summary: 'Add Audit Logging for Compliance Monitoring',
              startDate: '2025-04-07T00:00:00Z',
              plannedPi: {
                id: 1,
                name: 'ART-NorthStar-Pi-2025-08-1',
              },
              dependencies: [
                {
                  id: 5001,
                  issueKey: 'ATL-5001',
                  summary: 'Setup Logging Infrastructure',
                  startDate: '2025-04-01T00:00:00Z',
                  dependencies: [],
                  assignee: {
                    name: 'Alex Turner',
                    avatar: 'https://i.pravatar.cc/150?img=16',
                  },
                  issueType: {
                    type: 'story',
                    name: 'Story',
                  },
                  priority: 'high',
                  status: 'Done',
                  ownerTeam: {
                    id: 201,
                    name: 'Atlas Infrastructure',
                    members: [],
                    color: '#9B59B6',
                    art: {
                      id: 201,
                      name: 'ART Atlas',
                    },
                  },
                  sprintometerData: {
                    status: 'OnTrack',
                    progress: 100,
                  },
                },
                {
                  id: 5002,
                  issueKey: 'EPC-5002',
                  summary: 'Database Schema Updates',
                  startDate: '2025-04-05T00:00:00Z',
                  dependencies: [],
                  assignee: {
                    name: 'Rajesh Mehta',
                    avatar: 'https://i.pravatar.cc/150?img=2',
                  },
                  issueType: {
                    type: 'task',
                    name: 'Task',
                  },
                  priority: 'medium',
                  status: 'Done',
                  ownerTeam: {
                    id: 2,
                    name: 'Helvetia',
                    members: [],
                    color: '#4ECDC4',
                  },
                  sprintometerData: {
                    status: 'OnTrack',
                    progress: 100,
                  },
                },
              ],
              assignee: {
                name: 'Emil Carter',
                avatar: 'https://i.pravatar.cc/150?img=1',
              },
              issueType: {
                type: 'story',
                name: 'Story',
              },
              priority: 'medium',
              status: 'Done',
              ownerTeam: {
                id: 1,
                name: 'Matterhorn',
                members: [],
                color: '#FF6B6B',
              },
              sprintometerData: {
                status: 'OnTrack',
                progress: 100,
                info: {
                  insights: 'Feature is progressing well with all dependencies resolved.',
                  confidence: 95,
                  action: 'Continue monitoring progress. Feature expected to complete on schedule.',
                },
              },
            },
            {
              id: 1032,
              issueKey: 'EPC-1023',
              summary: 'Enable Multi-Language Support for Global Users',
              startDate: '2025-07-28T00:00:00Z',
              plannedPi: {
                id: 2,
                name: 'ART-Global_Identity_Services-PI-2025-12-1',
              },
              dependencies: [
                {
                  id: 5003,
                  issueKey: 'PHX-5003',
                  summary: 'Translation Service API',
                  startDate: '2025-07-20T00:00:00Z',
                  dependencies: [],
                  assignee: {
                    name: 'Sarah Kim',
                    avatar: 'https://i.pravatar.cc/150?img=17',
                  },
                  issueType: {
                    type: 'story',
                    name: 'Story',
                  },
                  priority: 'high',
                  status: 'In progress',
                  ownerTeam: {
                    id: 301,
                    name: 'Phoenix Localization',
                    members: [],
                    color: '#E67E22',
                    art: {
                      id: 301,
                      name: 'ART Phoenix',
                    },
                  },
                  sprintometerData: {
                    status: 'OnTrack',
                    progress: 70,
                  },
                },
                {
                  id: 5004,
                  issueKey: 'ORI-5004',
                  summary: 'Cultural Content Validation',
                  startDate: '2025-07-22T00:00:00Z',
                  dependencies: [],
                  assignee: {
                    name: 'Maria Gonzalez',
                    avatar: 'https://i.pravatar.cc/150?img=18',
                  },
                  issueType: {
                    type: 'story',
                    name: 'Story',
                  },
                  priority: 'medium',
                  status: 'To Do',
                  ownerTeam: {
                    id: 401,
                    name: 'Orion Content',
                    members: [],
                    color: '#8E44AD',
                    art: {
                      id: 401,
                      name: 'ART Orion',
                    },
                  },
                  sprintometerData: {
                    status: 'OnTrack',
                    progress: 0,
                  },
                },
                {
                  id: 5005,
                  issueKey: 'EPC-5005',
                  summary: 'UI Components Localization',
                  startDate: '2025-07-25T00:00:00Z',
                  dependencies: [],
                  assignee: {
                    name: 'Assignee name',
                    avatar: 'https://i.pravatar.cc/150?img=3',
                  },
                  issueType: {
                    type: 'story',
                    name: 'Story',
                  },
                  priority: 'medium',
                  status: 'In progress',
                  ownerTeam: {
                    id: 3,
                    name: 'Edelweiss',
                    members: [],
                    color: '#45B7D1',
                  },
                  sprintometerData: {
                    status: 'OnTrack',
                    progress: 30,
                  },
                },
              ],
              assignee: {
                name: 'Yuki Tanaka',
                avatar: 'https://i.pravatar.cc/150?img=6',
              },
              issueType: {
                type: 'story',
                name: 'Story',
              },
              priority: 'critical',
              status: 'In progress',
              ownerTeam: {
                id: 1,
                name: 'Matterhorn',
                members: [],
                color: '#FF6B6B',
              },
              sprintometerData: {
                status: 'OnTrack',
                progress: 60,
                info: {
                  insights:
                    'Based on current progress and team velocity, this feature is expected to be delivered on schedule. No major risks or blockers identified.',
                  confidence: 92,
                  action: 'Monitor internal dependencies to maintain current pace. No action needed.',
                },
              },
            },
            {
              id: 1033,
              issueKey: 'EPC-1033',
              summary: 'Enhance Search Function with AI-Powered Filters',
              startDate: '2025-04-07T00:00:00Z',
              dependencies: [
                {
                  id: 5006,
                  issueKey: 'EPC-5006',
                  summary: 'Search Index Optimization',
                  startDate: '2025-04-05T00:00:00Z',
                  dependencies: [],
                  assignee: {
                    name: 'Mateo Silva',
                    avatar: 'https://i.pravatar.cc/150?img=5',
                  },
                  issueType: {
                    type: 'task',
                    name: 'Task',
                  },
                  priority: 'high',
                  status: 'Done',
                  ownerTeam: {
                    id: 5,
                    name: 'Alphorn',
                    members: [],
                    color: '#FECA57',
                  },
                  sprintometerData: {
                    status: 'OnTrack',
                    progress: 100,
                  },
                },
              ],
              assignee: {
                name: 'Assignee name',
                avatar: 'https://i.pravatar.cc/150?img=8',
              },
              issueType: {
                type: 'story',
                name: 'Story',
              },
              priority: 'medium',
              status: 'In progress',
              ownerTeam: {
                id: 1,
                name: 'Matterhorn',
                members: [],
                color: '#FF6B6B',
              },
              sprintometerData: {
                status: 'OnTrack',
                progress: 40,
                info: {
                  insights: 'Feature progressing steadily with manageable dependencies.',
                  confidence: 85,
                  action: 'Continue current pace. Monitor dependency completion.',
                },
              },
            },
          ],
        },
        // Helvetia team (index 1)
        {
          issues: [
            {
              id: 1036,
              issueKey: 'EPC-1036',
              summary: 'Build Real-Time Data Sync Between Microservices',
              startDate: '2025-04-07T00:00:00Z',
              dependencies: [
                {
                  id: 5007,
                  issueKey: 'ATL-5007',
                  summary: 'Message Queue Configuration',
                  startDate: '2025-04-01T00:00:00Z',
                  dependencies: [],
                  assignee: {
                    name: 'David Chen',
                    avatar: 'https://i.pravatar.cc/150?img=19',
                  },
                  issueType: {
                    type: 'task',
                    name: 'Task',
                  },
                  priority: 'high',
                  status: 'In progress',
                  ownerTeam: {
                    id: 201,
                    name: 'Atlas Infrastructure',
                    members: [],
                    color: '#9B59B6',
                    art: {
                      id: 201,
                      name: 'ART Atlas',
                    },
                  },
                  sprintometerData: {
                    status: 'OnTrack',
                    progress: 80,
                  },
                },
                {
                  id: 5008,
                  issueKey: 'PHX-5008',
                  summary: 'Event Stream Processing',
                  startDate: '2025-04-03T00:00:00Z',
                  dependencies: [],
                  assignee: {
                    name: 'Lisa Wang',
                    avatar: 'https://i.pravatar.cc/150?img=20',
                  },
                  issueType: {
                    type: 'story',
                    name: 'Story',
                  },
                  priority: 'high',
                  status: 'To Do',
                  ownerTeam: {
                    id: 301,
                    name: 'Phoenix Localization',
                    members: [],
                    color: '#E67E22',
                    art: {
                      id: 301,
                      name: 'ART Phoenix',
                    },
                  },
                  sprintometerData: {
                    status: 'Warning',
                    progress: 0,
                  },
                },
                {
                  id: 5009,
                  issueKey: 'EPC-5009',
                  summary: 'Data Validation Layer',
                  startDate: '2025-04-06T00:00:00Z',
                  dependencies: [],
                  assignee: {
                    name: 'Assignee name',
                    avatar: 'https://i.pravatar.cc/150?img=3',
                  },
                  issueType: {
                    type: 'story',
                    name: 'Story',
                  },
                  priority: 'medium',
                  status: 'In progress',
                  ownerTeam: {
                    id: 3,
                    name: 'Edelweiss',
                    members: [],
                    color: '#45B7D1',
                  },
                  sprintometerData: {
                    status: 'OnTrack',
                    progress: 60,
                  },
                },
                {
                  id: 5010,
                  issueKey: 'EPC-5010',
                  summary: 'API Rate Limiting',
                  startDate: '2025-04-04T00:00:00Z',
                  dependencies: [],
                  assignee: {
                    name: 'Ava Nguyen',
                    avatar: 'https://i.pravatar.cc/150?img=4',
                  },
                  issueType: {
                    type: 'task',
                    name: 'Task',
                  },
                  priority: 'medium',
                  status: 'Done',
                  ownerTeam: {
                    id: 4,
                    name: 'Rhône',
                    members: [],
                    color: '#96CEB4',
                  },
                  sprintometerData: {
                    status: 'OnTrack',
                    progress: 100,
                  },
                },
              ],
              assignee: {
                name: 'Rajesh Mehta',
                avatar: 'https://i.pravatar.cc/150?img=2',
              },
              issueType: {
                type: 'task',
                name: 'Task',
              },
              priority: 'high',
              status: 'To Do',
              ownerTeam: {
                id: 2,
                name: 'Helvetia',
                members: [],
                color: '#4ECDC4',
              },
              sprintometerData: {
                status: 'Warning',
                progress: 0,
                info: {
                  insights: 'High priority task with potential delays due to complexity.',
                  confidence: 70,
                  action: 'Monitor closely and consider additional resources if needed.',
                },
              },
            },
            {
              id: 1035,
              issueKey: 'EPC-1035',
              summary: 'Implement Usage Analytics for Customer Insights',
              startDate: '2025-04-07T00:00:00Z',
              dependencies: [
                {
                  id: 5011,
                  issueKey: 'ORI-5011',
                  summary: 'Analytics Data Pipeline',
                  startDate: '2025-04-02T00:00:00Z',
                  dependencies: [],
                  assignee: {
                    name: 'John Adams',
                    avatar: 'https://i.pravatar.cc/150?img=21',
                  },
                  issueType: {
                    type: 'story',
                    name: 'Story',
                  },
                  priority: 'high',
                  status: 'In progress',
                  ownerTeam: {
                    id: 401,
                    name: 'Orion Content',
                    members: [],
                    color: '#8E44AD',
                    art: {
                      id: 401,
                      name: 'ART Orion',
                    },
                  },
                  sprintometerData: {
                    status: 'OnTrack',
                    progress: 90,
                  },
                },
                {
                  id: 5012,
                  issueKey: 'EPC-5012',
                  summary: 'Dashboard UI Components',
                  startDate: '2025-04-06T00:00:00Z',
                  dependencies: [],
                  assignee: {
                    name: 'Emil Carter',
                    avatar: 'https://i.pravatar.cc/150?img=1',
                  },
                  issueType: {
                    type: 'story',
                    name: 'Story',
                  },
                  priority: 'medium',
                  status: 'In progress',
                  ownerTeam: {
                    id: 1,
                    name: 'Matterhorn',
                    members: [],
                    color: '#FF6B6B',
                  },
                  sprintometerData: {
                    status: 'OnTrack',
                    progress: 50,
                  },
                },
              ],
              assignee: {
                name: 'Assignee name',
                avatar: 'https://i.pravatar.cc/150?img=12',
              },
              issueType: {
                type: 'story',
                name: 'Story',
              },
              priority: 'medium',
              status: 'In progress',
              ownerTeam: {
                id: 2,
                name: 'Helvetia',
                members: [],
                color: '#4ECDC4',
              },
              sprintometerData: {
                status: 'OnTrack',
                progress: 40,
                info: {
                  insights: 'Analytics implementation progressing with cross-team coordination.',
                  confidence: 80,
                  action: 'Coordinate with dependent teams for data integration.',
                },
              },
            },
          ],
        },
        // Edelweiss team (index 2)
        {
          issues: [
            {
              id: 1037,
              issueKey: 'EPC-1037',
              summary: 'Launch Beta Program with Feature Feedback Collection',
              startDate: '2025-04-07T00:00:00Z',
              dependencies: [
                {
                  id: 5013,
                  issueKey: 'ATL-5013',
                  summary: 'Beta Environment Setup',
                  startDate: '2025-03-28T00:00:00Z',
                  dependencies: [],
                  assignee: {
                    name: 'Kevin Brown',
                    avatar: 'https://i.pravatar.cc/150?img=22',
                  },
                  issueType: {
                    type: 'task',
                    name: 'Task',
                  },
                  priority: 'critical',
                  status: 'Blocked',
                  ownerTeam: {
                    id: 201,
                    name: 'Atlas Infrastructure',
                    members: [],
                    color: '#9B59B6',
                    art: {
                      id: 201,
                      name: 'ART Atlas',
                    },
                  },
                  sprintometerData: {
                    status: 'Warning',
                    progress: 10,
                  },
                },
                {
                  id: 5014,
                  issueKey: 'EPC-5014',
                  summary: 'User Feedback Integration',
                  startDate: '2025-04-05T00:00:00Z',
                  dependencies: [],
                  assignee: {
                    name: 'Yuki Tanaka',
                    avatar: 'https://i.pravatar.cc/150?img=6',
                  },
                  issueType: {
                    type: 'story',
                    name: 'Story',
                  },
                  priority: 'high',
                  status: 'In progress',
                  ownerTeam: {
                    id: 1,
                    name: 'Matterhorn',
                    members: [],
                    color: '#FF6B6B',
                  },
                  sprintometerData: {
                    status: 'OnTrack',
                    progress: 30,
                  },
                },
                {
                  id: 5015,
                  issueKey: 'EPC-5015',
                  summary: 'Beta User Onboarding Flow',
                  startDate: '2025-04-04T00:00:00Z',
                  dependencies: [],
                  assignee: {
                    name: 'Mateo Silva',
                    avatar: 'https://i.pravatar.cc/150?img=5',
                  },
                  issueType: {
                    type: 'story',
                    name: 'Story',
                  },
                  priority: 'high',
                  status: 'To Do',
                  ownerTeam: {
                    id: 5,
                    name: 'Alphorn',
                    members: [],
                    color: '#FECA57',
                  },
                  sprintometerData: {
                    status: 'OnTrack',
                    progress: 0,
                  },
                },
              ],
              assignee: {
                name: 'Assignee name',
                avatar: 'https://i.pravatar.cc/150?img=7',
              },
              issueType: {
                type: 'bug',
                name: 'Bug',
              },
              priority: 'critical',
              status: 'Blocked',
              ownerTeam: {
                id: 3,
                name: 'Edelweiss',
                members: [],
                color: '#45B7D1',
              },
              sprintometerData: {
                status: 'Warning',
                progress: 20,
                info: {
                  insights: 'Critical priority bug with current blocking issues.',
                  confidence: 60,
                  action: 'Urgent: Resolve blocking dependencies and escalate if needed.',
                },
              },
            },
            {
              id: 1038,
              issueKey: 'EPC-1038',
              summary: 'Introduce Machine Learning-Based Recommendation Engine',
              startDate: '2025-04-07T00:00:00Z',
              dependencies: [
                {
                  id: 5016,
                  issueKey: 'PHX-5016',
                  summary: 'ML Model Training Pipeline',
                  startDate: '2025-04-01T00:00:00Z',
                  dependencies: [],
                  assignee: {
                    name: 'Amy Foster',
                    avatar: 'https://i.pravatar.cc/150?img=23',
                  },
                  issueType: {
                    type: 'story',
                    name: 'Story',
                  },
                  priority: 'medium',
                  status: 'In progress',
                  ownerTeam: {
                    id: 301,
                    name: 'Phoenix Localization',
                    members: [],
                    color: '#E67E22',
                    art: {
                      id: 301,
                      name: 'ART Phoenix',
                    },
                  },
                  sprintometerData: {
                    status: 'OnTrack',
                    progress: 75,
                  },
                },
              ],
              assignee: {
                name: 'Assignee name',
                avatar: 'https://i.pravatar.cc/150?img=9',
              },
              issueType: {
                type: 'story',
                name: 'Story',
              },
              priority: 'low',
              status: 'To do',
              ownerTeam: {
                id: 3,
                name: 'Edelweiss',
                members: [],
                color: '#45B7D1',
              },
              sprintometerData: {
                status: 'OnTrack',
                progress: 0,
                info: {
                  insights: 'Low priority story ready to start when capacity allows.',
                  confidence: 90,
                  action: 'Schedule when team has bandwidth. No immediate action required.',
                },
              },
            },
          ],
        },
        // Rhône team (index 3)
        {
          issues: [
            {
              id: 1034,
              issueKey: 'EPC-1034',
              summary: 'Develop Self-Service Password Reset Portal',
              startDate: '2025-04-07T00:00:00Z',
              dependencies: [
                {
                  id: 5017,
                  issueKey: 'ORI-5017',
                  summary: 'Security Policy Validation',
                  startDate: '2025-04-02T00:00:00Z',
                  dependencies: [],
                  assignee: {
                    name: 'Robert Taylor',
                    avatar: 'https://i.pravatar.cc/150?img=24',
                  },
                  issueType: {
                    type: 'task',
                    name: 'Task',
                  },
                  priority: 'high',
                  status: 'Done',
                  ownerTeam: {
                    id: 401,
                    name: 'Orion Content',
                    members: [],
                    color: '#8E44AD',
                    art: {
                      id: 401,
                      name: 'ART Orion',
                    },
                  },
                  sprintometerData: {
                    status: 'OnTrack',
                    progress: 100,
                  },
                },
                {
                  id: 5018,
                  issueKey: 'EPC-5018',
                  summary: 'Email Notification Service',
                  startDate: '2025-04-05T00:00:00Z',
                  dependencies: [],
                  assignee: {
                    name: 'Rajesh Mehta',
                    avatar: 'https://i.pravatar.cc/150?img=2',
                  },
                  issueType: {
                    type: 'story',
                    name: 'Story',
                  },
                  priority: 'medium',
                  status: 'Done',
                  ownerTeam: {
                    id: 2,
                    name: 'Helvetia',
                    members: [],
                    color: '#4ECDC4',
                  },
                  sprintometerData: {
                    status: 'OnTrack',
                    progress: 100,
                  },
                },
              ],
              assignee: {
                name: 'Assignee name',
                avatar: 'https://i.pravatar.cc/150?img=10',
              },
              issueType: {
                type: 'story',
                name: 'Story',
              },
              priority: 'high',
              status: 'In progress',
              ownerTeam: {
                id: 4,
                name: 'Rhône',
                members: [],
                color: '#96CEB4',
              },
              sprintometerData: {
                status: 'OnTrack',
                progress: 80,
                info: {
                  insights: 'High priority feature nearing completion with strong progress.',
                  confidence: 95,
                  action: 'Final testing and review phase. Expected completion soon.',
                },
              },
            },
            {
              id: 1039,
              issueKey: 'EPC-1041',
              summary: 'Migrate Legacy Services to Microservice Architecture',
              startDate: '2025-07-28T00:00:00Z',
              plannedPi: {
                id: 3,
                name: 'ART-NorthStar-PI-2025-07-28',
              },
              dependencies: [
                {
                  id: 5019,
                  issueKey: 'ATL-5019',
                  summary: 'Container Orchestration Setup',
                  startDate: '2025-07-20T00:00:00Z',
                  dependencies: [],
                  assignee: {
                    name: 'Michael Davis',
                    avatar: 'https://i.pravatar.cc/150?img=25',
                  },
                  issueType: {
                    type: 'epic',
                    name: 'Epic',
                  },
                  priority: 'critical',
                  status: 'Blocked',
                  ownerTeam: {
                    id: 201,
                    name: 'Atlas Infrastructure',
                    members: [],
                    color: '#9B59B6',
                    art: {
                      id: 201,
                      name: 'ART Atlas',
                    },
                  },
                  sprintometerData: {
                    status: 'Warning',
                    progress: 0,
                  },
                },
                {
                  id: 5020,
                  issueKey: 'PHX-5020',
                  summary: 'Service Mesh Implementation',
                  startDate: '2025-07-22T00:00:00Z',
                  dependencies: [],
                  assignee: {
                    name: 'Jennifer Wilson',
                    avatar: 'https://i.pravatar.cc/150?img=26',
                  },
                  issueType: {
                    type: 'story',
                    name: 'Story',
                  },
                  priority: 'high',
                  status: 'To Do',
                  ownerTeam: {
                    id: 301,
                    name: 'Phoenix Localization',
                    members: [],
                    color: '#E67E22',
                    art: {
                      id: 301,
                      name: 'ART Phoenix',
                    },
                  },
                  sprintometerData: {
                    status: 'Warning',
                    progress: 0,
                  },
                },
                {
                  id: 5021,
                  issueKey: 'ORI-5021',
                  summary: 'Database Migration Scripts',
                  startDate: '2025-07-25T00:00:00Z',
                  dependencies: [],
                  assignee: {
                    name: 'Thomas Anderson',
                    avatar: 'https://i.pravatar.cc/150?img=27',
                  },
                  issueType: {
                    type: 'task',
                    name: 'Task',
                  },
                  priority: 'high',
                  status: 'To Do',
                  ownerTeam: {
                    id: 401,
                    name: 'Orion Content',
                    members: [],
                    color: '#8E44AD',
                    art: {
                      id: 401,
                      name: 'ART Orion',
                    },
                  },
                  sprintometerData: {
                    status: 'OnTrack',
                    progress: 0,
                  },
                },
                {
                  id: 5022,
                  issueKey: 'EPC-5022',
                  summary: 'Legacy API Deprecation Plan',
                  startDate: '2025-07-26T00:00:00Z',
                  dependencies: [],
                  assignee: {
                    name: 'Emil Carter',
                    avatar: 'https://i.pravatar.cc/150?img=1',
                  },
                  issueType: {
                    type: 'story',
                    name: 'Story',
                  },
                  priority: 'medium',
                  status: 'To Do',
                  ownerTeam: {
                    id: 1,
                    name: 'Matterhorn',
                    members: [],
                    color: '#FF6B6B',
                  },
                  sprintometerData: {
                    status: 'OnTrack',
                    progress: 0,
                  },
                },
                {
                  id: 5023,
                  issueKey: 'EPC-5023',
                  summary: 'Service Discovery Configuration',
                  startDate: '2025-07-24T00:00:00Z',
                  dependencies: [],
                  assignee: {
                    name: 'Assignee name',
                    avatar: 'https://i.pravatar.cc/150?img=3',
                  },
                  issueType: {
                    type: 'task',
                    name: 'Task',
                  },
                  priority: 'medium',
                  status: 'To Do',
                  ownerTeam: {
                    id: 3,
                    name: 'Edelweiss',
                    members: [],
                    color: '#45B7D1',
                  },
                  sprintometerData: {
                    status: 'OnTrack',
                    progress: 0,
                  },
                },
              ],
              assignee: {
                name: 'Ava Nguyen',
                avatar: 'https://i.pravatar.cc/150?img=11',
              },
              issueType: {
                type: 'story',
                name: 'Story',
              },
              priority: 'low',
              status: 'Blocked',
              ownerTeam: {
                id: 4,
                name: 'Rhône',
                members: [],
                color: '#96CEB4',
              },
              sprintometerData: {
                status: 'Warning',
                progress: 0,
                info: {
                  insights:
                    'AI forecasts a minimum 4-week delay based on stalled progress, unresolved cross-ART dependencies with Team Atlas, and no velocity logged in the last sprint. Multiple blockers are open, and the feature is now at risk of missing the PI objective.',
                  confidence: 96,
                  action:
                    'Initiate unblocker sync with Team Atlas. Evaluate scope reduction or deferral to next PI. Add mitigation task to program board and notify ART Leads.',
                },
              },
            },
          ],
        },
        // Alphorn team (index 4)
        {
          issues: [
            {
              id: 1040,
              issueKey: 'EPC-1042',
              summary: 'Add Offline Mode Support for Mobile Users',
              startDate: '2025-07-28T00:00:00Z',
              plannedPi: {
                id: 4,
                name: 'ART-NorthStar-PI-2025-07-28',
              },
              dependencies: [
                {
                  id: 5024,
                  issueKey: 'ATL-5024',
                  summary: 'Mobile Data Caching Framework',
                  startDate: '2025-07-20T00:00:00Z',
                  dependencies: [],
                  assignee: {
                    name: 'Chris Martinez',
                    avatar: 'https://i.pravatar.cc/150?img=28',
                  },
                  issueType: {
                    type: 'story',
                    name: 'Story',
                  },
                  priority: 'high',
                  status: 'In progress',
                  ownerTeam: {
                    id: 201,
                    name: 'Atlas Infrastructure',
                    members: [],
                    color: '#9B59B6',
                    art: {
                      id: 201,
                      name: 'ART Atlas',
                    },
                  },
                  sprintometerData: {
                    status: 'Warning',
                    progress: 40,
                  },
                },
                {
                  id: 5025,
                  issueKey: 'EPC-5025',
                  summary: 'Offline State Management',
                  startDate: '2025-07-25T00:00:00Z',
                  dependencies: [],
                  assignee: {
                    name: 'Assignee name',
                    avatar: 'https://i.pravatar.cc/150?img=3',
                  },
                  issueType: {
                    type: 'story',
                    name: 'Story',
                  },
                  priority: 'medium',
                  status: 'To Do',
                  ownerTeam: {
                    id: 3,
                    name: 'Edelweiss',
                    members: [],
                    color: '#45B7D1',
                  },
                  sprintometerData: {
                    status: 'OnTrack',
                    progress: 0,
                  },
                },
              ],
              assignee: {
                name: 'Mateo Silva',
                avatar: 'https://i.pravatar.cc/150?img=13',
              },
              issueType: {
                type: 'story',
                name: 'Story',
              },
              priority: 'major',
              status: 'In progress',
              ownerTeam: {
                id: 5,
                name: 'Alphorn',
                members: [],
                color: '#FECA57',
              },
              sprintometerData: {
                status: 'Warning',
                progress: 25,
                info: {
                  insights:
                    'AI detects a potential 2-week delay due to unresolved dependencies with Team Delta and slower-than-expected velocity in the last sprint.',
                  confidence: 74,
                  action:
                    'Coordinate with Team Delta to address the dependency. Consider rebalancing workload or reducing scope to stay within the PI.',
                },
              },
            },
          ],
        },
      ],
    },
    {
      id: 2,
      name: 'Sprint 7 / Sprint 8',
      period: {
        startDate: '2025-05-05T00:00:00Z',
        endDate: '2025-06-01T00:00:00Z',
      },
      description: '05 Mon, 2025 - 01 Mon, 2025',
      items: [
        // Matterhorn team (index 0)
        {
          issues: [],
        },
        // Helvetia team (index 1)
        {
          issues: [
            {
              id: 2001,
              issueKey: 'EPC-2001',
              summary: 'Enable Single Sign-On (SSO) for Enterprise Customers',
              startDate: '2025-05-05T00:00:00Z',
              dependencies: [
                {
                  id: 6001,
                  issueKey: 'PHX-6001',
                  summary: 'Identity Provider Integration',
                  startDate: '2025-05-01T00:00:00Z',
                  dependencies: [],
                  assignee: {
                    name: 'Rachel Green',
                    avatar: 'https://i.pravatar.cc/150?img=29',
                  },
                  issueType: {
                    type: 'story',
                    name: 'Story',
                  },
                  priority: 'high',
                  status: 'To Do',
                  ownerTeam: {
                    id: 301,
                    name: 'Phoenix Localization',
                    members: [],
                    color: '#E67E22',
                    art: {
                      id: 301,
                      name: 'ART Phoenix',
                    },
                  },
                  sprintometerData: {
                    status: 'OnTrack',
                    progress: 0,
                  },
                },
                {
                  id: 6002,
                  issueKey: 'ORI-6002',
                  summary: 'OAuth 2.0 Configuration',
                  startDate: '2025-05-02T00:00:00Z',
                  dependencies: [],
                  assignee: {
                    name: 'Brian Cooper',
                    avatar: 'https://i.pravatar.cc/150?img=30',
                  },
                  issueType: {
                    type: 'task',
                    name: 'Task',
                  },
                  priority: 'high',
                  status: 'To Do',
                  ownerTeam: {
                    id: 401,
                    name: 'Orion Content',
                    members: [],
                    color: '#8E44AD',
                    art: {
                      id: 401,
                      name: 'ART Orion',
                    },
                  },
                  sprintometerData: {
                    status: 'OnTrack',
                    progress: 0,
                  },
                },
                {
                  id: 6003,
                  issueKey: 'EPC-6003',
                  summary: 'User Session Management',
                  startDate: '2025-05-03T00:00:00Z',
                  dependencies: [],
                  assignee: {
                    name: 'Ava Nguyen',
                    avatar: 'https://i.pravatar.cc/150?img=4',
                  },
                  issueType: {
                    type: 'story',
                    name: 'Story',
                  },
                  priority: 'medium',
                  status: 'To Do',
                  ownerTeam: {
                    id: 4,
                    name: 'Rhône',
                    members: [],
                    color: '#96CEB4',
                  },
                  sprintometerData: {
                    status: 'OnTrack',
                    progress: 0,
                  },
                },
              ],
              assignee: {
                name: 'Assignee name',
                avatar: 'https://i.pravatar.cc/150?img=14',
              },
              issueType: {
                type: 'story',
                name: 'Story',
              },
              priority: 'high',
              status: 'To do',
              ownerTeam: {
                id: 2,
                name: 'Helvetia',
                members: [],
                color: '#4ECDC4',
              },
              sprintometerData: {
                status: 'OnTrack',
                progress: 0,
                info: {
                  insights: 'SSO implementation ready to start with clear requirements.',
                  confidence: 85,
                  action: 'Begin development once Sprint 7 starts.',
                },
              },
            },
          ],
        },
        // Edelweiss team (index 2)
        {
          issues: [],
        },
        // Rhône team (index 3)
        {
          issues: [],
        },
        // Alphorn team (index 4)
        {
          issues: [
            {
              id: 2002,
              issueKey: 'EPC-2002',
              summary: 'Build Mobile-Friendly UI for Dashboard Components',
              startDate: '2025-05-05T00:00:00Z',
              dependencies: [
                {
                  id: 6004,
                  issueKey: 'EPC-6004',
                  summary: 'Design System Component Library',
                  startDate: '2025-05-01T00:00:00Z',
                  dependencies: [],
                  assignee: {
                    name: 'Yuki Tanaka',
                    avatar: 'https://i.pravatar.cc/150?img=6',
                  },
                  issueType: {
                    type: 'story',
                    name: 'Story',
                  },
                  priority: 'medium',
                  status: 'To Do',
                  ownerTeam: {
                    id: 1,
                    name: 'Matterhorn',
                    members: [],
                    color: '#FF6B6B',
                  },
                  sprintometerData: {
                    status: 'OnTrack',
                    progress: 0,
                  },
                },
              ],
              assignee: {
                name: 'Assignee name',
                avatar: 'https://i.pravatar.cc/150?img=15',
              },
              issueType: {
                type: 'story',
                name: 'Story',
              },
              priority: 'medium',
              status: 'To do',
              ownerTeam: {
                id: 5,
                name: 'Alphorn',
                members: [],
                color: '#FECA57',
              },
              sprintometerData: {
                status: 'OnTrack',
                progress: 0,
                info: {
                  insights: 'Mobile UI development planned with design system integration.',
                  confidence: 80,
                  action: 'Coordinate with design team before Sprint 7 kickoff.',
                },
              },
            },
          ],
        },
      ],
    },
  ],
};
