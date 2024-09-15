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
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
      max-width: 300px;
    `,
    input: css`
      flex: 1;
    `,
  };
};

type Props = {
  assignees: string[];
  onChange: (filter: SprintPlaningFiltersType) => void;
};

export const SprintPlaningFilters: React.FC<Props> = ({ assignees, onChange }) => {
  const [filter, setFilter] = useState<SprintPlaningFiltersType>({ teamMembers: [] });
  const styles = useStyles2(getStyles);

  const handleAssigneesChange = (selected: Array<SelectableValue<string>>) => {
    const selectedValues = selected.map((item) => item.value || '');
    const newFilter = { ...filter, teamMembers: selectedValues };
    setFilter(newFilter);
    onChange(newFilter);
  };

  return (
    <div className={styles.container}>
      <div className={styles.input}>
        <MultiSelect
          options={assignees.map((teamMember) => ({ label: teamMember, value: teamMember }))}
          value={filter.teamMembers.map((teamMember) => ({ label: teamMember, value: teamMember }))}
          onChange={handleAssigneesChange}
          placeholder={SprintPlaningColumns.TeamMember}
          isClearable
        />
      </div>
    </div>
  );
};
