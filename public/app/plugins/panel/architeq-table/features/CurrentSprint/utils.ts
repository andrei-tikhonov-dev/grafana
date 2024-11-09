import { DataFrame } from '@grafana/data';

import { Cells, getFieldConfig } from '../../components/cells';
import { updateFieldConfig, wrapTeamMemberField } from '../../utils';

import { CurrentSprintColumns } from './constants';
import { Filters } from './types';

export function configCurrentSprintData(dataFrame: DataFrame): DataFrame {
  const fieldConfigs = [
    { fields: [CurrentSprintColumns.Identifier], config: getFieldConfig(Cells.Link, { width: 100 }) },
    { fields: [CurrentSprintColumns.SP], config: getFieldConfig(Cells.Simple, { width: 60, align: 'left' }) },
    { fields: [CurrentSprintColumns.Status], config: getFieldConfig(Cells.Simple, { width: 100 }) },
    { fields: [CurrentSprintColumns.Type], config: getFieldConfig(Cells.IssueType, { width: 100 }) },
    { fields: [CurrentSprintColumns.TeamMember], config: getFieldConfig(Cells.User, { width: 220 }) },
    { fields: [CurrentSprintColumns.InProgress], config: getFieldConfig(Cells.Days, { width: 100, align: 'left' }) },
  ];

  const dataWithTeamMembers = wrapTeamMemberField(dataFrame);

  return fieldConfigs.reduce(
    (configuredData, { fields, config }) => updateFieldConfig(configuredData, fields, config),
    dataWithTeamMembers
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
    assignees: Array.from(namesSet),
  };
}

const includesCaseInsensitive = (a: string, b: string) => a?.toLowerCase().includes(b?.toLowerCase());

export function filterData(data: DataFrame, filters: Filters) {
  const nameField = data.fields.find((field: any) => field.name === CurrentSprintColumns.TeamMember);
  const statusField = data.fields.find((field: any) => field.name === CurrentSprintColumns.Status);
  const identifierField = data.fields.find((field: any) => field.name === CurrentSprintColumns.Identifier);
  const taskTitleField = data.fields.find((field: any) => field.name === CurrentSprintColumns.TaskTitle);

  const filteredIndexes = nameField?.values.map((_: any, index: number) => {
    const matchesStatus =
      filters.status && filters.status.length > 0 ? filters.status.includes(statusField?.values[index]) : true;
    const matchesAssignee =
      filters.teamMembers && filters.teamMembers.length > 0
        ? filters.teamMembers.includes(nameField.values[index].name)
        : true;
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
