import { CumulativeFlowDiagramData } from '../types';

export const cfdData: CumulativeFlowDiagramData = {
  currentPeriod: '2025-04-13T00:00:00Z',
  periodType: 'date',
  periods: [
    { value: '2025-04-02T00:00:00Z' },
    { value: '2025-04-03T00:00:00Z' },
    { value: '2025-04-04T00:00:00Z' },
    { value: '2025-04-05T00:00:00Z' },
    { value: '2025-04-06T00:00:00Z' },
    { value: '2025-04-07T00:00:00Z' },
    { value: '2025-04-08T00:00:00Z' },
    { value: '2025-04-09T00:00:00Z' },
    { value: '2025-04-10T00:00:00Z' },
    { value: '2025-04-11T00:00:00Z' },
    { value: '2025-04-12T00:00:00Z' },
    { value: '2025-04-13T00:00:00Z' },
    { value: '2025-04-14T00:00:00Z' },
  ],
  issueTypes: [
    {
      name: 'Story',
      issuesAmount: {
        actual: [7, 7, 7, 7, 6, 6, 5, 5, 4, 3, 3, 2, 0],
        ideal: [8, 7, 6, 5, 4, 4, 3, 2, 2, 1, 0, 0, 0],
      },
    },
    {
      name: 'Bug',
      issuesAmount: {
        actual: [30, 29, 26, 26, 26, 24, 22, 18, 16, 14, 11, 6, 1],
        ideal: [30, 27, 24, 21, 18, 15, 12, 9, 6, 3, 1, 1, 0],
      },
    },
    {
      name: 'Task',
      issuesAmount: {
        actual: [12, 12, 11, 11, 11, 10, 9, 7, 7, 6, 4, 2, 0],
        ideal: [12, 11, 10, 9, 8, 6, 5, 4, 2, 1, 1, 0, 0],
      },
    },
  ],
};
