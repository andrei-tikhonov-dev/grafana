import { css } from '@emotion/css';
import React, { useState } from 'react';

import { SelectableValue } from '@grafana/data';
import { Select, useStyles2 } from '@grafana/ui';

import { SprintPlaningColumns } from './constants';
import { Filters } from './types';

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
  onChange: (filter: Filters) => void;
};

export const SprintPlaningFilters: React.FC<Props> = ({ assignees, onChange }) => {
  const [filter, setFilter] = useState<Filters>({ teamMember: '' });
  const styles = useStyles2(getStyles);

  const handleAssigneeChange = (selected: SelectableValue<string> | null) => {
    const newFilter = { ...filter, teamMember: selected?.value || '' };
    setFilter(newFilter);
    onChange(newFilter);
  };

  return (
    <div className={styles.container}>
      <div className={styles.input}>
        <Select
          options={assignees.map((teamMember) => ({ label: teamMember, value: teamMember }))}
          value={filter.teamMember ? { label: filter.teamMember, value: filter.teamMember } : null}
          onChange={handleAssigneeChange}
          placeholder={SprintPlaningColumns.TeamMember}
          isClearable
        />
      </div>
    </div>
  );
};
