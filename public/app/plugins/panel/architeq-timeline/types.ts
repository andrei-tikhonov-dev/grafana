export interface PanelOptions {
  text: string;
}

export const enum Status {
  OK = 'OK',
  WARNING = 'WARNING',
  CRITICAL = 'CRITICAL',
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
    sprintOnTarget: {
      message: string;
      status: Status;
    };
  };
}
