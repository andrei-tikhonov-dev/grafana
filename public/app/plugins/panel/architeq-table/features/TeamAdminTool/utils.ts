import { DataFrame } from '@grafana/data';

import { Cells, getFieldConfig, addActionsColumn } from '../../components/cells';
import { FieldValidation } from '../../types';
import { convertDateToBE, removeHiddenFields, updateFieldConfig } from '../../utils';

import { TeamAdminToolFields } from './constants';
import { TeamAdminToolCreatePayload, TeamAdminToolCreateTableType } from './types';

interface ConfigTeamAdminToolData {
  dataFrame: DataFrame;
  handleDelete: (rowIndex: number) => void;
  hiddenFields?: string[];
  maxWorkload: number;
}
export function configTeamAdminToolData({
  dataFrame,
  hiddenFields,
  handleDelete,
  maxWorkload,
}: ConfigTeamAdminToolData): DataFrame {
  const options = {
    align: 'left',
  };

  const emailOptions = {
    ...options,
    validation: [{ type: FieldValidation.EMAIL }],
  };

  const workloadRatioOptions = {
    ...options,
    validation: [{ type: FieldValidation.MAX, value: maxWorkload }],
  };

  const fieldConfigs = [
    { fields: [TeamAdminToolFields.Email], config: getFieldConfig(Cells.Input, { ...emailOptions }) },
    { fields: [TeamAdminToolFields.TeamMember], config: getFieldConfig(Cells.Input, { ...options }) },
    { fields: [TeamAdminToolFields.JiraID], config: getFieldConfig(Cells.Input, { ...options }) },
    { fields: [TeamAdminToolFields.OrgID], config: getFieldConfig(Cells.Input, { ...options, width: 115 }) },
    { fields: [TeamAdminToolFields.HourlyRate], config: getFieldConfig(Cells.Input, { ...options, width: 110 }) },
    { fields: [TeamAdminToolFields.YearlyHours], config: getFieldConfig(Cells.Input, { ...options, width: 110 }) },
    { fields: [TeamAdminToolFields.TeamID], config: getFieldConfig(Cells.Input, { ...options, width: 100 }) },
    {
      fields: [TeamAdminToolFields.WorkloadRatio],
      config: getFieldConfig(Cells.Input, { ...workloadRatioOptions, width: 120 }),
    },
    { fields: [TeamAdminToolFields.Role], config: getFieldConfig(Cells.RoleSelect, { ...options, width: 120 }) },
    { fields: [TeamAdminToolFields.StartDate], config: getFieldConfig(Cells.Date, { ...options, width: 120 }) },
    { fields: [TeamAdminToolFields.EndDate], config: getFieldConfig(Cells.Date, { ...options, width: 120 }) },
    {
      fields: [TeamAdminToolFields.ExcludeFromCapacity],
      config: getFieldConfig(Cells.Checkbox, { ...options, width: 80, align: 'center' }),
    },
  ];
  const visibleDataFrame = removeHiddenFields(dataFrame, hiddenFields);
  const dataFrameWithActions = addActionsColumn(visibleDataFrame, handleDelete);
  return fieldConfigs.reduce(
    (configuredData, { fields, config }) => updateFieldConfig(configuredData, fields, config),
    dataFrameWithActions
  );
}

export function getPayloadIDs(data: DataFrame): { [index: number]: { memberId?: number; teamId?: number } } {
  const memberIdField = data.fields.find((field) => field.name === TeamAdminToolFields.TeamMemberID);
  const teamIdField = data.fields.find((field) => field.name === TeamAdminToolFields.TeamID);

  const length = data.length;

  return Object.fromEntries(
    Array.from({ length }, (_, index) => [
      index,
      {
        memberId: memberIdField ? Number(memberIdField.values.get(index)) : undefined,
        teamId: teamIdField ? Number(teamIdField.values.get(index)) : undefined,
      },
    ])
  );
}

export function mapTeamAdminToolCreatePayload(
  data: TeamAdminToolCreateTableType,
  teamId: string
): TeamAdminToolCreatePayload {
  return {
    email: data.email,
    internalOrgId: data.internalOrgId,
    name: data.name,
    hourlyRate: data.hourlyRate,
    yearlyHours: data.yearlyHours,
    startDate: convertDateToBE(data.startDate),
    endDate: convertDateToBE(data.endDate),
    excludeFromCapacity: data.excludeFromCapacity,
    teamIdsToDetails: {
      [teamId]: {
        roleId: data.role,
        workload: data.workloadRatio,
      },
    },
  };
}
