export type HolidayPrefixesToolMetaType = {
  custom: {
    teamId: number;
    types: string[];
  };
};

export interface HolidayPrefixesUpdatePayload {
  propertyName: string;
  value: string;
}

export interface HolidayPrefixesCreateTableType {
  prefix: string;
  relevantForCapacity: boolean;
  showInCalendar: boolean;
  type: string;
}

export interface HolidayPrefixesCreatePayload {
  teamId: number;
  prefix: string;
  relevantForCapacity: boolean;
  showInCalendar: boolean;
  type: string;
}
