import { MBurndownCustomData } from './types';

export const initialData: MBurndownCustomData = {
  currentDate: '',
  days: [],
  issueTypes: [],
  summary: {
    storyPoints: { completed: 0, remaining: 0, total: 0, percentage: 0 },
    issuesAmount: { completed: 0, remaining: 0, total: 0, percentage: 0 },
  },
};
