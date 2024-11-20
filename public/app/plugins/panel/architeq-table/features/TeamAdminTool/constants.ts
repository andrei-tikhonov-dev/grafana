export const enum TeamAdminToolFields {
  TeamMemberID = 'Team member ID',
  TeamMember = 'Team member',
  Email = 'Email',
  JiraID = 'Jira ID',
  OrgID = 'Internal org ID',
  HourlyRate = 'Hourly rate',
  YearlyHours = 'Yearly hours',
  TeamID = 'Team ID',
  WorkloadRatio = 'Workload ratio',
  Role = 'Role',
  StartDate = 'Work start date',
  EndDate = 'Work end date',
  ExcludeFromCapacity = 'Excluded from capacity',
}

export const hiddenFields = [TeamAdminToolFields.TeamMemberID, TeamAdminToolFields.TeamID, TeamAdminToolFields.JiraID];
