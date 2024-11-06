import { css } from '@emotion/css';
import React, { useState, ChangeEvent } from 'react';

import { SelectableValue } from '@grafana/data';
import { Input, MultiSelect, useStyles2 } from '@grafana/ui';

import { FilterInputWrapper } from '../../components/FilterInputWrapper';
import { SprintPlaningColumns } from '../SprintPlaning/constants';

import { CurrentSprintColumns } from './constants';
import { Filters } from './types';

export const FILTER_HEIGHT = 45;

const getStyles = () => {
  return {
    container: css`
      display: flex;
      gap: 2px;
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
    teamMembers: [],
    status: [],
    search: '',
  });
  const styles = useStyles2(getStyles);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newFilter = { ...filter, search: e.target.value };
    setFilter(newFilter);
    onChange(newFilter);
  };

  const handleAssigneesChange = (selected: Array<SelectableValue<string>>) => {
    const selectedValues = selected.map((item) => item.value || '');
    const newFilter = { ...filter, teamMembers: selectedValues };
    setFilter(newFilter);
    onChange(newFilter);
  };

  const handleStatusChange = (selected: Array<SelectableValue<string>>) => {
    const selectedValues = selected.map((item) => item.value || '');
    const newFilter = { ...filter, status: selectedValues };
    setFilter(newFilter);
    onChange(newFilter);
  };

  return (
    <div className={styles.container}>
      <div className={styles.input}>
        <FilterInputWrapper>
          <Input value={filter.search} onChange={handleInputChange} placeholder="Search" />
        </FilterInputWrapper>
      </div>
      <div className={styles.input}>
        <FilterInputWrapper>
          <MultiSelect
            options={assignees.map((teamMember) => ({ label: teamMember, value: teamMember }))}
            value={filter.teamMembers.map((teamMember) => ({ label: teamMember, value: teamMember }))}
            onChange={handleAssigneesChange}
            placeholder={SprintPlaningColumns.TeamMember}
            isClearable
          />
        </FilterInputWrapper>
      </div>
      <div className={styles.input}>
        <FilterInputWrapper>
          <MultiSelect
            options={statuses.map((status) => ({ label: status, value: status }))}
            value={filter.status.map((status) => ({ label: status, value: status }))}
            onChange={handleStatusChange}
            placeholder={CurrentSprintColumns.Status}
            isClearable
          />
        </FilterInputWrapper>
      </div>
    </div>
  );
};
