export interface PanelOptions {
  header: string;
  goalsTitle: string;
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

type InfoStatusType = {
  message: string;
  status: Status;
};

export type GoalType = {
  id: number;
  text: string;
  isCompleted?: boolean;
};

export interface SprintMeta {
  custom: {
    name: string;
    team: string;
    from: string;
    till: string;
    weeks?: WeekStatus[];
    /**
     * @deprecated use description instead with generated text "completedIssues of totalIssues issues have been completed"
     */
    totalIssues: number;
    /**
     * @deprecated use description instead with generated text "completedIssues of totalIssues issues have been completed"
     */
    completedIssues: number;
    /**
     * @deprecated use infoStatus instead
     */
    sprintOnTarget?: InfoStatusType;
    infoStatus?: InfoStatusType;
    description?: string;
    goals?: GoalType[];
  };
}
