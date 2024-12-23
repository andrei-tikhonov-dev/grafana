export type TeamAdminFiltersType = {
  teamMembers: string[];
};

export type TeamHolidaysToolMetaType = {
  custom: {
    teamId: string;
  };
};

export interface TeamHolidaysToolUpdatePayload {
  teamId: string;
  propertyName: string;
  value: number | string;
}

export interface TeamHolidaysToolDeletePayload {
  id: string;
  teamId: string;
}

export interface TeamHolidaysToolCreateTableType {
  description: string;
  date: string;
}

export interface TeamHolidaysToolCreatePayload {
  description: string;
  date: string;
  teamId: string;
}
