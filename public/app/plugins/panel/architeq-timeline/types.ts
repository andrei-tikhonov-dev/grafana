export interface PanelOptions {
  text: string;
}

export interface DayStatus {
  dayOfWeek: number;
  status: 'FINISHED' | 'IN_PROGRESS' | 'NOT_STARTED';
}

export interface WeekStatus {
  days: DayStatus[];
}

export interface SprintMeta {
  custom: {
    name: string;
    team: string;
    from: string;
    till: string;
    weeks: WeekStatus[];
    totalIssues: number;
    completedIssues: number;
    totalStoryPoints: number;
    completedStoryPoints: number;
    isSprintOnTarget: boolean;
  };
}
