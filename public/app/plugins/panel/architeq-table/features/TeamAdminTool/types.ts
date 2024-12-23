import { RoleType } from '../../types';

export type TeamAdminFiltersType = {
  teamMembers: string[];
};

export type TeamAdminToolMetaType = {
  custom: {
    availableRoles: RoleType['availableRoles'];
    maxWorkload: number;
    teamId: string;
  };
};

export interface TeamAdminToolUpdatePayload {
  memberId: number;
  teamId: number;
  propertyName: string;
  value: any;
}

export interface TeamAdminToolDeletePayload {
  memberId: number;
  teamId: number;
}

export interface TeamAdminToolCreateTableType {
  name: string;
  email: string;
  internalOrgId: string;
  hourlyRate: number;
  yearlyHours: number;
  workloadRatio: number;
  roles: { role: { label: string; value: number | string }; rate: number }[];
  workEndDate: string;
  workStartDate: string;
  excludedFromCapacity: boolean;
}

export interface TeamAdminToolCreatePayload {
  name: string;
  email: string;
  internalOrgId: string;
  hourlyRate: number;
  yearlyHours: number;
  teamIdsToDetails: {
    [key: string]: {
      workload: number;
      roles: { roleId?: string | number; rate: number }[];
      excludedFromCapacity: boolean;
      workStartDate: string | null;
      workEndDate: string | null;
    };
  };
}
