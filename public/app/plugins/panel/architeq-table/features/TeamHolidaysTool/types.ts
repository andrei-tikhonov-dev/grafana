export type TeamHolidaysToolMetaType = {
  custom: {
    teamId: number;
    types: string[];
  };
};

export interface HolidaysUpdatePayload {
  propertyName: string;
  value: string;
}

export interface HolidaysCreateTableType {
  description: string;
  type: string;
  date: string;
}

export interface HolidaysCreatePayload {
  teamId: number;
  description: string;
  date: string;
  type: string;
}
