import { DataFrame } from '@grafana/data';

import { Cells } from '../../constants';
import { TeamMember } from '../../types';
import { getFieldConfig, updateFieldConfig, wrapCapacityField, wrapTeamMemberField } from '../../utils';

import { SprintPlaningColumns } from './constants';
import { SprintPlaningFiltersType } from './types';

export function configTeamMembersFrame(dataFrame: DataFrame): DataFrame {
  const fieldConfigs = [
    { field: SprintPlaningColumns.TeamMember, config: getFieldConfig(Cells.User, {}) },
    { field: SprintPlaningColumns.ScheduledPD, config: getFieldConfig(Cells.Simple, { align: 'right' }) },
    { field: SprintPlaningColumns.SelfReportedPD, config: getFieldConfig(Cells.Input, { align: 'right' }) },
    {
      field: SprintPlaningColumns.AssignedAvailableCapacitySP,
      config: getFieldConfig(Cells.Capacity, { align: 'right' }),
    },
  ];

  const wrapHandlers: Record<string, (df: DataFrame, field: string) => DataFrame> = {
    [SprintPlaningColumns.TeamMember]: wrapTeamMemberField,
    [SprintPlaningColumns.AssignedAvailableCapacitySP]: wrapCapacityField,
  };

  return fieldConfigs.reduce((df, { field, config }) => {
    const wrapHandler: (df: DataFrame, field: string) => DataFrame = wrapHandlers[field];
    const wrappedDf: any = wrapHandler ? wrapHandler(df, field) : df;
    return updateFieldConfig(wrappedDf, [field], config);
  }, dataFrame);
}

export function configRolesFrame(dataFrame: DataFrame): DataFrame {
  const fieldConfigs = [
    {
      field: SprintPlaningColumns.AssignedAvailableCapacitySP,
      config: getFieldConfig(Cells.Capacity, { align: 'right' }),
    },
  ];

  const wrapHandlers: Record<string, (df: DataFrame, field: string) => DataFrame> = {
    [SprintPlaningColumns.AssignedAvailableCapacitySP]: wrapCapacityField,
  };

  return fieldConfigs.reduce((df, { field, config }) => {
    const wrapHandler: (df: DataFrame, field: string) => DataFrame = wrapHandlers[field];
    const wrappedDf: any = wrapHandler ? wrapHandler(df, field) : df;
    return updateFieldConfig(wrappedDf, [field], config);
  }, dataFrame);
}

export function getTeamMemberOptions(data: DataFrame) {
  return Array.from(
    new Set(
      data.fields
        .find((field) => field.name === SprintPlaningColumns.TeamMember)
        ?.values.toArray()
        .map((value) => value.name) || []
    )
  );
}

export function getRoleOptions(data: DataFrame) {
  return Array.from(
    new Set(data.fields.find((field) => field.name === SprintPlaningColumns.TeamMemberRole)?.values.toArray() || [])
  );
}

export function filterTeamMembers(data: DataFrame, { teamMembers }: SprintPlaningFiltersType) {
  const teamMemberField = data.fields.find((field: any) => field.name === SprintPlaningColumns.TeamMember);

  const filteredIndexes = teamMemberField?.values.map((value: TeamMember) => {
    return teamMembers && teamMembers.length > 0 ? teamMembers.includes(value.name) : true;
  });

  return {
    ...data,
    length: filteredIndexes?.filter((value) => value === true).length || 0,
    fields: data.fields.map((field: any) => ({
      ...field,
      values: field.values.filter((_: any, index: number) => (filteredIndexes || [])[index]),
    })),
  };
}

export function filterRoles(data: DataFrame, { roles }: SprintPlaningFiltersType) {
  if (!roles || roles.length === 0) {
    return data;
  }

  const rolesField = data.fields.find((field) => field.name === SprintPlaningColumns.TeamMemberRole);

  if (!rolesField) {
    return data;
  }

  const filteredIndexes = Array.from(rolesField.values).map((value: string) => roles.includes(value));

  const filteredFields = data.fields.map((field) => ({
    ...field,
    values: field.values.filter((_: any, index: number) => filteredIndexes[index]),
  }));

  return {
    ...data,
    length: filteredIndexes.filter(Boolean).length,
    fields: filteredFields,
  };
}
