export type JiraStatusMapperToolMetaType = {
  custom: {
    errors?: string[];
    possibleStatuses: Record<string, string>;
  };
};

export type BoardOption = {
  label: string;
  value: string;
};

export interface JiraStatusMapperToolUpdatePayload {
  sprintometerStatus: string;
  columnName: string;
}
