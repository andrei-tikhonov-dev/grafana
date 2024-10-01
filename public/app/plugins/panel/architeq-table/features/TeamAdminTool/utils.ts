import { DataFrame } from '@grafana/data';

import { addActionsColumn } from '../../components/ActionsCell';
import { getInputCellFieldConfig } from '../../components/InputCell';
import { getRoleSelectCellFieldConfig } from '../../components/RoleSelectCell';
import { FieldValidation } from '../../types';
import { removeHiddenFields, updateFieldConfig } from '../../utils';

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
    { fields: [TeamAdminToolFields.Email], config: getInputCellFieldConfig({ ...emailOptions }) },
    { fields: [TeamAdminToolFields.TeamMember], config: getInputCellFieldConfig({ ...options }) },
    { fields: [TeamAdminToolFields.JiraID], config: getInputCellFieldConfig({ ...options }) },
    { fields: [TeamAdminToolFields.OrgID], config: getInputCellFieldConfig({ ...options }) },
    { fields: [TeamAdminToolFields.HourlyRate], config: getInputCellFieldConfig({ ...options }) },
    { fields: [TeamAdminToolFields.YearlyHours], config: getInputCellFieldConfig({ ...options }) },
    { fields: [TeamAdminToolFields.TeamID], config: getInputCellFieldConfig({ ...options }) },
    { fields: [TeamAdminToolFields.WorkloadRatio], config: getInputCellFieldConfig({ ...workloadRatioOptions }) },
    { fields: [TeamAdminToolFields.Role], config: getRoleSelectCellFieldConfig({ ...options }) },
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
    teamIdsToDetails: {
      [teamId]: {
        roleId: data.role,
        workload: data.workloadRatio,
      },
    },
  };
}
