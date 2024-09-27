import { Status } from '../../types';

export type SprintPlaningFiltersType = {
  teamMembers: string[];
  roles: string[];
};

export interface SprintPlaningInfoType {
  sprintName: string;
  sprintStatusMessage: string;
  startDate: string;
  endDate: string;
  personDaysScheduled: number;
  personDaysReported: number;
  storyPointsAssigned: number;
  storyPointsAvailable: number;
  teamVelocityFactor: number;
  sprintId: string;
  sprintStatus: {
    storiesInfo: {
      status: Status;
      message: string;
    };
    assignedAvailableRatioInfo: {
      status: Status;
      message: string;
    };
  };
}

export interface SprintPlaningPayload {
  sprintId: string;
  teamMemberEmail?: string;
  capacity: number;
}
