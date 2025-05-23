import { InfoLineType } from '../../types';

export type CurrentSprintFiltersType = {
  teamMembers: string[];
  status: string[];
  types: string[];
  search?: string;
};

export type CurrentSprintTypeColumn = InfoLineType | string;
