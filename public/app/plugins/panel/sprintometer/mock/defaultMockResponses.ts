import { ChatMessageResponse } from '@architeq/core-api-client';

export const DEFAULT_AUTO_SUMMARY_RESPONSE: ChatMessageResponse = {
  messageId: 'mock-auto-summary',
  content: `## Sprint Status Overview

Your current sprint is progressing **on track** with some areas requiring attention.

### Key Metrics
- **Velocity**: 42 story points (87% of target)
- **Completed Issues**: 18/24 (75%)
- **Remaining Days**: 3

### Highlights
- The team has maintained consistent progress throughout the sprint
- Bug resolution rate is above average at 92%
- Two high-priority features are pending review

### Areas of Concern
- Backend API integration task is blocked pending third-party documentation
- Testing coverage for new features is at 65%, below the 80% target

### Recommendations
1. Prioritize unblocking the API integration task
2. Allocate additional resources to improve test coverage
3. Consider moving low-priority items to the next sprint`,
  suggestedPrompts: [
    'What are the main risks for this sprint?',
    'How does our velocity compare to previous sprints?',
    'Which team members have available capacity?',
    'What tasks should we prioritize today?',
  ],
  suggestedActions: [],
};

export const DEFAULT_GENERAL_RESPONSES: ChatMessageResponse[] = [
  {
    messageId: 'mock-general-1',
    content: `## Risk Analysis

Based on the current sprint data, here are the identified risks:

### High Risk
- **API Integration Delay**: The backend integration task has been blocked for 2 days. This could impact the release timeline if not resolved within 24 hours.

### Medium Risk
- **Test Coverage Gap**: Current coverage is 65%, which may lead to post-release issues.
- **Resource Allocation**: Two team members are approaching capacity limits.

### Low Risk
- **Documentation Updates**: Minor documentation tasks are pending but won't impact delivery.

### Mitigation Strategies
1. Escalate the API blocker to the platform team
2. Schedule a focused testing session for tomorrow
3. Consider pair programming to balance workload`,
    suggestedPrompts: [
      'How can we address the API integration blocker?',
      'What is the impact if we miss the deadline?',
      'Show me the team workload distribution',
    ],
    suggestedActions: [],
  },
  {
    messageId: 'mock-general-2',
    content: `## Velocity Comparison

### Current Sprint vs Historical Average

| Metric | Current | Avg (Last 5) | Trend |
|--------|---------|--------------|-------|
| Story Points | 42 | 38 | ↑ 10.5% |
| Issues Completed | 18 | 16 | ↑ 12.5% |
| Bug Fix Rate | 92% | 85% | ↑ 8.2% |

### Observations
- Your team is performing **above average** this sprint
- Consistent improvement over the last 3 sprints
- Bug resolution efficiency has significantly improved

### Contributing Factors
1. Better story point estimation
2. Reduced scope changes mid-sprint
3. Improved collaboration on blockers`,
    suggestedPrompts: [
      'What contributed to the velocity improvement?',
      'How can we maintain this momentum?',
      'Show me individual contributor metrics',
    ],
    suggestedActions: [],
  },
  {
    messageId: 'mock-general-3',
    content: `## Team Capacity Overview

### Current Availability

| Team Member | Allocated | Available | Status |
|-------------|-----------|-----------|--------|
| Alex Chen | 85% | 15% | ⚠️ High |
| Sam Wilson | 70% | 30% | ✅ Normal |
| Jordan Lee | 90% | 10% | 🔴 Critical |
| Casey Kim | 60% | 40% | ✅ Available |

### Recommendations
- **Casey Kim** has bandwidth for additional tasks
- Consider redistributing Jordan's workload
- Alex may need support on the current feature

### Upcoming Availability
- Sam will be on PTO next week (3 days)
- Plan accordingly for sprint capacity`,
    suggestedPrompts: [
      'Reassign tasks from overloaded members',
      'What tasks can Casey take on?',
      'Plan for Sam absence next week',
    ],
    suggestedActions: [],
  },
  {
    messageId: 'mock-general-4',
    content: `## Today's Priority Tasks

Based on sprint goals and current progress, here are the recommended priorities:

### Must Complete Today
1. **[PROJ-123]** Complete API endpoint testing - *Blocks release*
2. **[PROJ-145]** Fix authentication bug - *High priority*
3. **[PROJ-156]** Review pending PRs (3 waiting)

### Should Progress
4. **[PROJ-167]** Database migration script - 60% complete
5. **[PROJ-178]** User dashboard updates - In review

### Can Wait
6. **[PROJ-189]** Documentation updates
7. **[PROJ-190]** Code refactoring tasks

### Blocked Items
- **[PROJ-134]** Waiting on external API docs
- **[PROJ-156]** Needs design approval`,
    suggestedPrompts: [
      'Show details for PROJ-123',
      'Who is assigned to the blocked items?',
      'What are tomorrow priorities?',
    ],
    suggestedActions: [],
  },
];
