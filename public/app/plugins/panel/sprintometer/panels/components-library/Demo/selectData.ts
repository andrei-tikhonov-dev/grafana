import { UiSelectGroup } from '../../../components/ui/select/UiSelect';

export const jiraStatusGroups: UiSelectGroup[] = [
  {
    label: 'Agile/Scrum',
    options: [
      { value: 'todo', label: 'To Do' },
      { value: 'in-progress', label: 'In Progress' },
      { value: 'code-review', label: 'Code Review' },
      { value: 'testing', label: 'Testing' },
      { value: 'done', label: 'Done' },
    ],
    separator: true,
  },
  {
    label: 'Kanban',
    options: [
      { value: 'backlog', label: 'Backlog' },
      { value: 'selected-for-development', label: 'Selected for Development' },
      { value: 'kanban-in-progress', label: 'In Progress' },
      { value: 'kanban-code-review', label: 'Code Review' },
      { value: 'ready-for-testing', label: 'Ready for Testing' },
      { value: 'kanban-testing', label: 'Testing' },
      { value: 'kanban-done', label: 'Done' },
    ],
  },
  {
    label: 'Bug Tracking',
    options: [
      { value: 'open', label: 'Open' },
      { value: 'bug-in-progress', label: 'In Progress' },
      { value: 'resolved', label: 'Resolved' },
      { value: 'closed', label: 'Closed' },
      { value: 'reopened', label: 'Reopened' },
    ],
  },
  {
    label: 'Project Management',
    options: [
      { value: 'not-started', label: 'Not Started' },
      { value: 'pm-in-progress', label: 'In Progress' },
      { value: 'on-hold', label: 'On Hold', disabled: true }, // Пример отключенной опции
      { value: 'completed', label: 'Completed' },
      { value: 'cancelled', label: 'Cancelled' },
    ],
  },
];

export const timezoneGroups: UiSelectGroup[] = [
  {
    label: 'North America',
    options: [
      { value: 'est', label: 'Eastern Standard Time (EST)' },
      { value: 'cst', label: 'Central Standard Time (CST)' },
      { value: 'mst', label: 'Mountain Standard Time (MST)' },
      { value: 'pst', label: 'Pacific Standard Time (PST)' },
    ],
    separator: true,
  },
  {
    label: 'Europe',
    options: [
      { value: 'gmt', label: 'Greenwich Mean Time (GMT)' },
      { value: 'cet', label: 'Central European Time (CET)' },
      { value: 'eet', label: 'Eastern European Time (EET)' },
    ],
  },
];

export const priorityGroups: UiSelectGroup[] = [
  {
    label: 'Priority Levels',
    options: [
      { value: 'critical', label: '🔴 Critical' },
      { value: 'high', label: '🟠 High' },
      { value: 'medium', label: '🟡 Medium' },
      { value: 'low', label: '🟢 Low' },
      { value: 'trivial', label: '⚪ Trivial' },
    ],
  },
];
