import { DataFrame } from '@grafana/data';

import { getCapacityCellFieldConfig } from '../../components/CapacityCell';
import { getEditableCellFieldConfig } from '../../components/EditableCell';
import { getSimpleCellFieldConfig } from '../../components/SimpleCell';
import { getUserCellFieldConfig } from '../../components/UserCell';
import { TeamMember } from '../../types';
import { updateFieldConfig, wrapCapacityField, wrapTeamMemberField } from '../../utils';

import { SprintPlaningColumns } from './constants';
import { SprintPlaningFiltersType } from './types';

export function configData(dataFrame: DataFrame): DataFrame {
  const fieldConfigs = [
    { field: SprintPlaningColumns.TeamMember, config: getUserCellFieldConfig({}) },
    { field: SprintPlaningColumns.ScheduledPD, config: getSimpleCellFieldConfig({ align: 'right' }) },
    { field: SprintPlaningColumns.SelfReportedPD, config: getEditableCellFieldConfig({ align: 'right' }) },
    { field: SprintPlaningColumns.AssignedAvailableCapacitySP, config: getCapacityCellFieldConfig({ align: 'right' }) },
  ];

  const wrapHandlers: Record<string, (df: DataFrame, field: string) => DataFrame> = {
    [SprintPlaningColumns.TeamMember]: wrapTeamMemberField,
    [SprintPlaningColumns.AssignedAvailableCapacitySP]: wrapCapacityField,
  };

  return fieldConfigs.reduce((df, { field, config }) => {
    const wrapHandler: (df: DataFrame, field: string) => DataFrame = wrapHandlers[field];
    const wrappedDf = wrapHandler ? wrapHandler(df, field) : df;
    return updateFieldConfig(wrappedDf, [field], config);
  }, dataFrame);
}

export function getFilterOptions(data: DataFrame) {
  const namesSet = new Set<string>();

  data.fields.forEach((field) => {
    if (field.name === SprintPlaningColumns.TeamMember) {
      field.values.forEach((value) => namesSet.add(value.name));
    }
  });

  return {
    names: Array.from(namesSet),
  };
}

export function filterData(data: DataFrame, filters: SprintPlaningFiltersType) {
  const teamMemberField = data.fields.find((field: any) => field.name === SprintPlaningColumns.TeamMember);

  const filteredIndexes = teamMemberField?.values.map((value: TeamMember) => {
    return filters.teamMembers && filters.teamMembers.length > 0 ? filters.teamMembers.includes(value.name) : true;
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
