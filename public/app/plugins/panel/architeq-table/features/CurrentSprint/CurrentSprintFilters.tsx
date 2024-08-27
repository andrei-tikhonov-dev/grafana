import { css } from '@emotion/css';
import React, { useState, ChangeEvent } from 'react';

import { SelectableValue } from '@grafana/data';
import { Input, Select, useStyles2 } from '@grafana/ui';

import { CurrentSprintColumns } from './constants';
import { Filters } from './types';

export const FILTER_HEIGHT = 45;

const getStyles = () => {
  return {
    container: css`
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
      max-width: 800px;
    `,
    input: css`
      flex: 1;
    `,
  };
};

type Props = {
  assignees: string[];
  statuses: string[];
  onChange: (filter: Filters) => void;
};

export const CurrentSprintFilters: React.FC<Props> = ({ assignees, statuses, onChange }) => {
  const [filter, setFilter] = useState<Filters>({
    teamMember: '',
    status: '',
    search: '',
  });
  const styles = useStyles2(getStyles);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newFilter = { ...filter, search: e.target.value };
    setFilter(newFilter);
    onChange(newFilter);
  };

  const handleAssigneeChange = (selected: SelectableValue<string> | null) => {
    const newFilter = { ...filter, teamMember: selected?.value || '' };
    setFilter(newFilter);
    onChange(newFilter);
  };

  const handleStatusChange = (selected: SelectableValue<string> | null) => {
    const newFilter = { ...filter, status: selected?.value || '' };
    setFilter(newFilter);
    onChange(newFilter);
  };

  return (
    <div className={styles.container}>
      <div className={styles.input}>
        <Input value={filter.search} onChange={handleInputChange} placeholder="Search" />
      </div>
      <div className={styles.input}>
        <Select
          options={assignees.map((teamMember) => ({ label: teamMember, value: teamMember }))}
          value={filter.teamMember ? { label: filter.teamMember, value: filter.teamMember } : null}
          onChange={handleAssigneeChange}
          placeholder={CurrentSprintColumns.TeamMember}
          isClearable
        />
      </div>
      <div className={styles.input}>
        <Select
          options={statuses.map((status) => ({ label: status, value: status }))}
          value={filter.status ? { label: filter.status, value: filter.status } : null}
          onChange={handleStatusChange}
          placeholder={CurrentSprintColumns.Status}
          isClearable
        />
      </div>
    </div>
  );
};
