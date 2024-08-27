import { DataFrame } from '@grafana/data';

import { getCapacityCellFieldConfig } from '../../components/CapacityCell';
import { getEditableCellFieldConfig } from '../../components/EditableCell';
import { getSimpleCellFieldConfig } from '../../components/SimpleCell';
import { getUserCellFieldConfig } from '../../components/UserCell';
import { updateFieldConfig } from '../../utils';
import { Filters } from '../CurrentSprint/types';

import { SprintPlaningColumns } from './constants';

export function configData(dataFrame: DataFrame): DataFrame {
  const fieldConfigs = [
    { fields: [SprintPlaningColumns.TeamMember], config: getUserCellFieldConfig({}) },
    { fields: [SprintPlaningColumns.ScheduledPD], config: getSimpleCellFieldConfig({ align: 'right' }) },
    { fields: [SprintPlaningColumns.SelfReportedPD], config: getEditableCellFieldConfig({ align: 'right' }) },
    {
      fields: [SprintPlaningColumns.AssignedAvailableCapacitySP],
      config: getCapacityCellFieldConfig({ align: 'right' }),
    },
  ];

  return fieldConfigs.reduce(
    (configuredData, { fields, config }) => updateFieldConfig(configuredData, fields, config),
    dataFrame
  );
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

export function filterData(data: DataFrame, filters: Filters) {
  const teamMemberField = data.fields.find((field: any) => field.name === SprintPlaningColumns.TeamMember);

  const filteredIndexes = teamMemberField?.values.map((_: any, index: number) => {
    return filters.teamMember ? teamMemberField.values[index].name === filters.teamMember : true;
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
