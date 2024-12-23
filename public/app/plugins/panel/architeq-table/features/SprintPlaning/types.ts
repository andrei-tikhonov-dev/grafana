import { InfoLineType, Status } from '../../types';

export type SprintPlaningFiltersType = {
  teamMembers: string[];
  roles: string[];
};

interface DependencyTask extends InfoLineType {}

export interface ExternalDependency {
  team: string;
  tasks: DependencyTask[];
}

export interface ExternalDependencies {
  total: number;
  dependencies: ExternalDependency[];
}

export interface SprintPlaningMetaResponse {
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
  externalDependencies?: ExternalDependencies;
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
