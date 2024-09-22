import { DataFrame } from '@grafana/data';

import { addActionsColumn } from '../../components/ActionsCell';
import { getInputCellFieldConfig } from '../../components/InputCell';
import { getRoleSelectCellFieldConfig } from '../../components/RoleSelectCell';
import { removeHiddenFields, updateFieldConfig } from '../../utils';

import { TeamAdminToolFields } from './constants';
import { TeamAdminToolCreatePayload, TeamAdminToolCreateTableType } from './types';

interface ConfigTeamAdminToolData {
  dataFrame: DataFrame;
  handleDelete: (rowIndex: number) => void;
  hiddenFields?: string[];
}
export function configTeamAdminToolData({ dataFrame, hiddenFields, handleDelete }: ConfigTeamAdminToolData): DataFrame {
  const options = {
    align: 'left',
  };
  const fieldConfigs = [
    { fields: [TeamAdminToolFields.Email], config: getInputCellFieldConfig({ ...options }) },
    { fields: [TeamAdminToolFields.TeamMember], config: getInputCellFieldConfig({ ...options }) },
    { fields: [TeamAdminToolFields.JiraID], config: getInputCellFieldConfig({ ...options }) },
    { fields: [TeamAdminToolFields.OrgID], config: getInputCellFieldConfig({ ...options }) },
    { fields: [TeamAdminToolFields.HourlyRate], config: getInputCellFieldConfig({ ...options }) },
    { fields: [TeamAdminToolFields.YearlyHours], config: getInputCellFieldConfig({ ...options }) },
    { fields: [TeamAdminToolFields.TeamID], config: getInputCellFieldConfig({ ...options }) },
    { fields: [TeamAdminToolFields.WorkloadRatio], config: getInputCellFieldConfig({ ...options }) },
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
    role: data.role,
    hourlyRate: data.hourlyRate,
    yearlyHours: data.yearlyHours,
    workloadRatio: data.workloadRatio,
    teamIdsToDetails: {
      [teamId]: {
        role: data.role,
        workload: data.workloadRatio,
      },
    },
  };
}
