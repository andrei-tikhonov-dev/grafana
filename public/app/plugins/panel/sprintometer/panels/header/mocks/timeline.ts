import { TimelineInterface } from '../types';

export const sprintTimeline: TimelineInterface = {
  weeks: [
    {
      days: [
        {
          date: '2025-06-02T09:00:00Z', // Понедельник
          isWorking: true,
          events: [
            {
              type: 'Event',
              text: 'Sprint Planning Meeting',
              users: [
                { name: 'Alex Chen', avatar: '👨‍💻' },
                { name: 'Maria Garcia', avatar: '👩‍💻' },
                { name: 'John Smith', avatar: '👨‍💼' },
              ],
            },
            {
              type: 'Deadline',
              text: 'Sprint Backlog Finalization',
              users: [{ name: 'John Smith', avatar: '👨‍💼' }],
            },
          ],
        },
        {
          date: '2025-06-03T09:00:00Z', // Вторник
          isWorking: true,
          events: [
            {
              type: 'Event',
              text: 'Daily Standup',
              users: [
                { name: 'Alex Chen', avatar: '👨‍💻' },
                { name: 'Maria Garcia', avatar: '👩‍💻' },
                { name: 'Sarah Johnson', avatar: '👩‍🎨' },
              ],
            },
          ],
        },
        {
          date: '2025-06-04T09:00:00Z', // Среда
          isWorking: true,
          events: [
            {
              type: 'Event',
              text: 'Daily Standup',
              users: [
                { name: 'Alex Chen', avatar: '👨‍💻' },
                { name: 'Maria Garcia', avatar: '👩‍💻' },
              ],
            },
            {
              type: 'Event',
              text: 'Architecture Review Session',
              users: [
                { name: 'Alex Chen', avatar: '👨‍💻' },
                { name: 'David Kim', avatar: '👨‍🔧' },
              ],
            },
          ],
        },
        {
          date: '2025-06-05T09:00:00Z', // Четверг
          isWorking: true,
          events: [
            {
              type: 'Event',
              text: 'Daily Standup',
              users: [
                { name: 'Alex Chen', avatar: '👨‍💻' },
                { name: 'Maria Garcia', avatar: '👩‍💻' },
                { name: 'Sarah Johnson', avatar: '👩‍🎨' },
              ],
            },
            {
              type: 'Deadline',
              text: 'UI Mockups Delivery',
              users: [{ name: 'Sarah Johnson', avatar: '👩‍🎨' }],
            },
            {
              type: 'TimeOff',
              text: 'Maria - Doctor Appointment (2 hours)',
              users: [{ name: 'Maria Garcia', avatar: '👩‍💻' }],
            },
          ],
        },
        {
          date: '2025-06-06T09:00:00Z', // Пятница
          isWorking: true,
          events: [
            {
              type: 'Event',
              text: 'Daily Standup',
              users: [
                { name: 'Alex Chen', avatar: '👨‍💻' },
                { name: 'Maria Garcia', avatar: '👩‍💻' },
              ],
            },
            {
              type: 'Event',
              text: 'Team Retrospective (Week 1)',
              users: [
                { name: 'Alex Chen', avatar: '👨‍💻' },
                { name: 'Maria Garcia', avatar: '👩‍💻' },
                { name: 'John Smith', avatar: '👨‍💼' },
                { name: 'Sarah Johnson', avatar: '👩‍🎨' },
              ],
            },
          ],
        },
      ],
    },
    {
      // Неделя 2: 9-15 июня 2025
      days: [
        {
          date: '2025-06-09T09:00:00Z', // Понедельник
          isWorking: true,
          events: [
            {
              type: 'Event',
              text: 'Daily Standup',
              users: [
                { name: 'Alex Chen', avatar: '👨‍💻' },
                { name: 'Maria Garcia', avatar: '👩‍💻' },
                { name: 'David Kim', avatar: '👨‍🔧' },
              ],
            },
            {
              type: 'Deadline',
              text: 'API Integration Complete',
              users: [
                { name: 'Alex Chen', avatar: '👨‍💻' },
                { name: 'David Kim', avatar: '👨‍🔧' },
              ],
            },
          ],
        },
        {
          date: '2025-06-10T09:00:00Z', // Вторник
          isWorking: true,
          events: [
            {
              type: 'Event',
              text: 'Daily Standup',
              users: [
                { name: 'Alex Chen', avatar: '👨‍💻' },
                { name: 'Maria Garcia', avatar: '👩‍💻' },
                { name: 'Sarah Johnson', avatar: '👩‍🎨' },
              ],
            },
            {
              type: 'Event',
              text: 'Code Review Session',
              users: [
                { name: 'Alex Chen', avatar: '👨‍💻' },
                { name: 'Maria Garcia', avatar: '👩‍💻' },
              ],
            },
          ],
        },
        {
          date: '2025-06-11T09:00:00Z', // Среда
          isWorking: true,
          events: [
            {
              type: 'Event',
              text: 'Daily Standup',
              users: [
                { name: 'Alex Chen', avatar: '👨‍💻' },
                { name: 'Maria Garcia', avatar: '👩‍💻' },
                { name: 'David Kim', avatar: '👨‍🔧' },
              ],
            },
            {
              type: 'Event',
              text: 'Client Demo Preparation',
              users: [
                { name: 'John Smith', avatar: '👨‍💼' },
                { name: 'Sarah Johnson', avatar: '👩‍🎨' },
              ],
            },
            {
              type: 'Deadline',
              text: 'Frontend Features Complete',
              users: [{ name: 'Maria Garcia', avatar: '👩‍💻' }],
            },
          ],
        },
        {
          date: '2025-06-12T09:00:00Z', // Четверг
          isWorking: true,
          events: [
            {
              type: 'Event',
              text: 'Daily Standup',
              users: [
                { name: 'Alex Chen', avatar: '👨‍💻' },
                { name: 'David Kim', avatar: '👨‍🔧' },
              ],
            },
            {
              type: 'TimeOff',
              text: 'Maria - Personal Day',
              users: [{ name: 'Maria Garcia', avatar: '👩‍💻' }],
            },
          ],
        },
        {
          date: '2025-06-13T09:00:00Z', // Пятница
          isWorking: true,
          events: [
            {
              type: 'Event',
              text: 'Daily Standup',
              users: [
                { name: 'Alex Chen', avatar: '👨‍💻' },
                { name: 'Maria Garcia', avatar: '👩‍💻' },
                { name: 'David Kim', avatar: '👨‍🔧' },
              ],
            },
            {
              type: 'Event',
              text: 'Sprint Mid-Point Review',
              users: [
                { name: 'John Smith', avatar: '👨‍💼' },
                { name: 'Alex Chen', avatar: '👨‍💻' },
                { name: 'Maria Garcia', avatar: '👩‍💻' },
              ],
            },
            {
              type: 'Deadline',
              text: 'Testing Environment Setup',
              users: [{ name: 'David Kim', avatar: '👨‍🔧' }],
            },
          ],
        },
      ],
    },
    {
      // Неделя 3: 16-22 июня 2025
      days: [
        {
          date: '2025-06-16T09:00:00Z', // Понедельник
          isWorking: true,
          events: [
            {
              type: 'Event',
              text: 'Daily Standup',
              users: [
                { name: 'Alex Chen', avatar: '👨‍💻' },
                { name: 'Maria Garcia', avatar: '👩‍💻' },
                { name: 'David Kim', avatar: '👨‍🔧' },
              ],
            },
            {
              type: 'Event',
              text: 'Final Testing & Bug Fixes',
              users: [
                { name: 'Alex Chen', avatar: '👨‍💻' },
                { name: 'Maria Garcia', avatar: '👩‍💻' },
                { name: 'David Kim', avatar: '👨‍🔧' },
              ],
            },
            {
              type: 'Deadline',
              text: 'All Features Code Complete',
              users: [
                { name: 'Alex Chen', avatar: '👨‍💻' },
                { name: 'Maria Garcia', avatar: '👩‍💻' },
              ],
            },
          ],
        },
        {
          date: '2025-06-17T09:00:00Z', // Вторник
          isWorking: true,
          events: [
            {
              type: 'Event',
              text: 'Daily Standup',
              users: [
                { name: 'Alex Chen', avatar: '👨‍💻' },
                { name: 'Maria Garcia', avatar: '👩‍💻' },
              ],
            },
            {
              type: 'Event',
              text: 'Sprint Demo Preparation',
              users: [
                { name: 'John Smith', avatar: '👨‍💼' },
                { name: 'Sarah Johnson', avatar: '👩‍🎨' },
                { name: 'Alex Chen', avatar: '👨‍💻' },
              ],
            },
            {
              type: 'Deadline',
              text: 'QA Testing Complete',
              users: [{ name: 'David Kim', avatar: '👨‍🔧' }],
            },
          ],
        },
        {
          date: '2025-06-18T09:00:00Z', // Среда
          isWorking: false,
          events: [
            {
              type: 'TimeOff',
              text: 'Team Building Day',
              users: [
                { name: 'Alex Chen', avatar: '👨‍💻' },
                { name: 'Maria Garcia', avatar: '👩‍💻' },
                { name: 'John Smith', avatar: '👨‍💼' },
                { name: 'Sarah Johnson', avatar: '👩‍🎨' },
                { name: 'David Kim', avatar: '👨‍🔧' },
              ],
            },
          ],
        },
        {
          date: '2025-06-19T09:00:00Z', // Четверг
          isWorking: true,
          events: [
            {
              type: 'Event',
              text: 'Daily Standup',
              users: [
                { name: 'Alex Chen', avatar: '👨‍💻' },
                { name: 'Maria Garcia', avatar: '👩‍💻' },
                { name: 'David Kim', avatar: '👨‍🔧' },
              ],
            },
            {
              type: 'Event',
              text: 'Sprint Review & Demo',
              users: [
                { name: 'John Smith', avatar: '👨‍💼' },
                { name: 'Alex Chen', avatar: '👨‍💻' },
                { name: 'Maria Garcia', avatar: '👩‍💻' },
                { name: 'Sarah Johnson', avatar: '👩‍🎨' },
                { name: 'David Kim', avatar: '👨‍🔧' },
              ],
            },
            {
              type: 'Deadline',
              text: 'Sprint Deliverables Final',
              users: [
                { name: 'John Smith', avatar: '👨‍💼' },
                { name: 'Alex Chen', avatar: '👨‍💻' },
              ],
            },
          ],
        },
        {
          date: '2025-06-20T09:00:00Z', // Пятница
          isWorking: true,
          events: [
            {
              type: 'Event',
              text: 'Sprint Retrospective',
              users: [
                { name: 'John Smith', avatar: '👨‍💼' },
                { name: 'Alex Chen', avatar: '👨‍💻' },
                { name: 'Maria Garcia', avatar: '👩‍💻' },
                { name: 'Sarah Johnson', avatar: '👩‍🎨' },
                { name: 'David Kim', avatar: '👨‍🔧' },
              ],
            },
            {
              type: 'Event',
              text: 'Next Sprint Planning Prep',
              users: [
                { name: 'John Smith', avatar: '👨‍💼' },
                { name: 'Alex Chen', avatar: '👨‍💻' },
              ],
            },
            {
              type: 'TimeOff',
              text: 'David - Early Leave',
              users: [{ name: 'David Kim', avatar: '👨‍🔧' }],
            },
          ],
        },
      ],
    },
  ],
  currentDate: '2025-06-05T09:00:00Z',
};
