export const enum SprintDatesConfigToolFields {
  Team = 'Team',
  IncludeStartDate = 'Include Start Date',
  IncludeEndDate = 'Include End Date',
}

export const PROPERTY_NAME_MAP: Record<string, string> = {
  [SprintDatesConfigToolFields.IncludeStartDate]: 'INCLUDE_START_DATE',
  [SprintDatesConfigToolFields.IncludeEndDate]: 'INCLUDE_END_DATE',
};
