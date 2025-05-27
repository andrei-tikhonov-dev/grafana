export type JiraStatusMapperToolMetaType = {
  custom: {
    teamId: number;
    types: string[];
  };
};

export interface JiraStatusMapperToolUpdatePayload {
  propertyName: string;
  value: string;
}
