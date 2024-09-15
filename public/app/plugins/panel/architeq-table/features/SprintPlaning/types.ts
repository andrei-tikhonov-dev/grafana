export type SprintPlaningFiltersType = {
  teamMembers: string[];
};

export interface SprintPlaningInfoType {
  sprintName: string;
  sprintStatus: string;
  sprintStatusMessage: string;
  startDate: string;
  endDate: string;
  personDaysScheduled: number;
  personDaysReported: number;
  storyPointsAssigned: number;
  storyPointsAvailable: number;
  possibleSP: number;
  estimatedPD: number;
  teamVelocityFactor: number;
  sprintId: string;
}

export interface SprintPlaningPayload {
  sprintId: string;
  teamMemberEmail?: string;
  capacity: number;
}
