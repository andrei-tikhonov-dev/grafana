import { useState, useMemo } from 'react';

import { DataFrame } from '@grafana/data';

import { TeamAdminToolFields } from '../constants';
import { TeamAdminFiltersType } from '../types';

export function filterTeamAdminToolData(data: DataFrame, filters: TeamAdminFiltersType): DataFrame {
  const teamMemberField = data.fields.find((field) => field.name === TeamAdminToolFields.TeamMember);
  const { teamMembers } = filters;

  if (!teamMemberField || teamMembers.length === 0) {
    return data;
  }

  const filterMask = Array.from({ length: data.length }, (_, index) =>
    teamMembers.includes(teamMemberField.values.get(index))
  );

  return {
    ...data,
    length: filterMask.filter(Boolean).length,
    fields: data.fields.map((field) => ({
      ...field,
      values: Array.from({ length: data.length }, (_, index) => field.values.get(index)).filter(
        (_, index) => filterMask[index]
      ),
    })),
  };
}

export function getTeamAdminFilterOptions(data: DataFrame) {
  const teamMemberField = data.fields.find((field) => field.name === TeamAdminToolFields.TeamMember);

  return {
    teamMembers: teamMemberField ? Array.from(teamMemberField.values).map(String) : [],
  };
}

export const useTeamAdminFilters = (configuredData: DataFrame) => {
  const [filters, setFilters] = useState<TeamAdminFiltersType>({ teamMembers: [] });
  const filterOptions = getTeamAdminFilterOptions(configuredData);

  const handleFiltersChange = (newFilters: TeamAdminFiltersType) => {
    setFilters(newFilters);
  };

  const filteredData = useMemo(() => {
    return filterTeamAdminToolData(configuredData, filters);
  }, [configuredData, filters]);

  return {
    filters,
    filterOptions,
    handleFiltersChange,
    filteredData,
  };
};
