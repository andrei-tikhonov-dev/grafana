import { css } from '@emotion/css';
import React, { useState } from 'react';

import { SelectableValue } from '@grafana/data';
import { MultiSelect, useStyles2 } from '@grafana/ui';

import { SprintPlaningColumns } from './constants';
import { SprintPlaningFiltersType } from './types';

export const FILTER_HEIGHT = 45;

const getStyles = () => {
  return {
    container: css`
      flex: 1;
    `,
  };
};

type Props = {
  teamMembers: string[];
  roles: string[];
  isGroupedByRole: boolean;
  onChange: (filter: SprintPlaningFiltersType) => void;
};

export const SprintPlaningFilters: React.FC<Props> = ({ teamMembers, roles, isGroupedByRole, onChange }) => {
  const [filter, setFilter] = useState<SprintPlaningFiltersType>({ teamMembers: [], roles: [] });
  const styles = useStyles2(getStyles);

  const handleSelectionChange = (selected: Array<SelectableValue<string>>) => {
    const selectedValues = selected.map((item) => item.value || '');
    const newFilter = isGroupedByRole
      ? { ...filter, roles: selectedValues }
      : { ...filter, teamMembers: selectedValues };
    setFilter(newFilter);
    onChange(newFilter);
  };

  return (
    <div className={styles.container}>
      <MultiSelect
        options={
          isGroupedByRole
            ? roles.map((role) => ({ label: role, value: role }))
            : teamMembers.map((teamMember) => ({ label: teamMember, value: teamMember }))
        }
        value={
          isGroupedByRole
            ? filter.roles.map((role) => ({ label: role, value: role }))
            : filter.teamMembers.map((teamMember) => ({ label: teamMember, value: teamMember }))
        }
        onChange={handleSelectionChange}
        placeholder={isGroupedByRole ? SprintPlaningColumns.TeamMemberRole : SprintPlaningColumns.TeamMember}
        isClearable
      />
    </div>
  );
};
