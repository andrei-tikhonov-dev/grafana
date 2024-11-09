export type TeamAdminFiltersType = {
  teamMembers: string[];
};

export type TeamAdminToolMetaType = {
  custom: {
    availableRoles: TeamAdminToolRoleType[];
    maxWorkload: number;
    teamId: string;
  };
};

export type UpdateDataType = {
  value: number | string;
};

export interface TeamAdminToolUpdatePayload {
  memberId: number;
  teamId: number;
  propertyName: string;
  value: number | string;
}

export interface TeamAdminToolDeletePayload {
  memberId: number;
  teamId: number;
}

export interface TeamAdminToolRoleType {
  id: number;
  name: string;
}

export interface TeamAdminToolCreateTableType {
  name: string;
  email: string;
  internalOrgId: string;
  hourlyRate: number;
  yearlyHours: number;
  workloadRatio: number;
  role: number;
  endDate: string;
  startDate: string;
  excludeFromCapacity: boolean;
}

export interface TeamAdminToolCreatePayload {
  name: string;
  email: string;
  internalOrgId: string;
  hourlyRate: number;
  yearlyHours: number;
  startDate: string;
  endDate: string;
  excludeFromCapacity: boolean;
  teamIdsToDetails: {
    [key: string]: {
      roleId: number;
      workload: number;
    };
  };
}
