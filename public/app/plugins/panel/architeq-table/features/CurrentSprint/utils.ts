import { DataFrame } from '@grafana/data';

import { getDaysCellFieldConfig } from '../../components/DaysCell';
import { getIssueTypeCellFieldConfig } from '../../components/IssueTypeCell';
import { getLinkCellFieldConfig } from '../../components/LinkCell';
import { getSimpleCellFieldConfig } from '../../components/SimpleCell';
import { getUserCellFieldConfig } from '../../components/UserCell';
import { updateFieldConfig } from '../../utils';

import { CurrentSprintColumns } from './constants';
import { Filters } from './types';

export function configData(dataFrame: DataFrame): DataFrame {
  const fieldConfigs = [
    { fields: [CurrentSprintColumns.Identifier], config: getLinkCellFieldConfig({ width: 100 }) },
    { fields: [CurrentSprintColumns.SP], config: getSimpleCellFieldConfig({ width: 60, align: 'left' }) },
    { fields: [CurrentSprintColumns.Status], config: getSimpleCellFieldConfig({ width: 100 }) },
    { fields: [CurrentSprintColumns.Type], config: getIssueTypeCellFieldConfig({ width: 100 }) },
    { fields: [CurrentSprintColumns.TeamMember], config: getUserCellFieldConfig({ width: 220 }) },
    { fields: [CurrentSprintColumns.InProgress], config: getDaysCellFieldConfig({ width: 100, align: 'left' }) },
  ];

  return fieldConfigs.reduce(
    (configuredData, { fields, config }) => updateFieldConfig(configuredData, fields, config),
    dataFrame
  );
}

export function getFilterOptions(data: DataFrame) {
  const namesSet = new Set<string>();
  const statusesSet = new Set<string>();

  data.fields.forEach((field) => {
    if (field.name === CurrentSprintColumns.TeamMember) {
      field.values.forEach((value) => namesSet.add(value.name));
    }

    if (field.name === CurrentSprintColumns.Status) {
      field.values.forEach((value) => statusesSet.add(value));
    }
  });

  return {
    statuses: Array.from(statusesSet),
    names: Array.from(namesSet),
  };
}

const includesCaseInsensitive = (a: string, b: string) => a?.toLowerCase().includes(b?.toLowerCase());

export function filterData(data: DataFrame, filters: Filters) {
  const nameField = data.fields.find((field: any) => field.name === CurrentSprintColumns.TeamMember);
  const statusField = data.fields.find((field: any) => field.name === CurrentSprintColumns.Status);
  const identifierField = data.fields.find((field: any) => field.name === CurrentSprintColumns.Identifier);
  const taskTitleField = data.fields.find((field: any) => field.name === CurrentSprintColumns.TaskTitle);

  const filteredIndexes = nameField?.values.map((_: any, index: number) => {
    const matchesStatus = filters.status ? statusField?.values[index] === filters.status : true;
    const matchesAssignee = filters.teamMember ? nameField.values[index].name === filters.teamMember : true;
    const matchesSearch = filters.search
      ? includesCaseInsensitive(nameField.values[index].name, filters.search) ||
        includesCaseInsensitive(identifierField?.values[index], filters.search) ||
        includesCaseInsensitive(taskTitleField?.values[index], filters.search)
      : true;

    return matchesStatus && matchesAssignee && matchesSearch;
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
