import { css } from '@emotion/css';
import React, { useState } from 'react';

import { SelectableValue } from '@grafana/data';
import { MultiSelect, useStyles2 } from '@grafana/ui';

import { FilterInputWrapper } from '../../components/FilterInputWrapper';

import { TeamAdminToolFields } from './constants';
import { TeamAdminFiltersType } from './types';

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
  onChange: (filter: TeamAdminFiltersType) => void;
};

export const TeamAdminToolFilters: React.FC<Props> = ({ teamMembers, onChange }) => {
  const [filter, setFilter] = useState<TeamAdminFiltersType>({
    teamMembers: [],
  });
  const styles = useStyles2(getStyles);

  const handleChange = (selected: Array<SelectableValue<string>>) => {
    const selectedValues = selected.map((item) => item.value || '');
    const newFilter = { ...filter, teamMembers: selectedValues };
    setFilter(newFilter);
    onChange(newFilter);
  };

  return (
    <div className={styles.container}>
      <FilterInputWrapper>
        <MultiSelect
          options={teamMembers.map((teamMember) => ({ label: teamMember, value: teamMember }))}
          value={filter.teamMembers.map((teamMember) => ({ label: teamMember, value: teamMember }))}
          onChange={handleChange}
          placeholder={TeamAdminToolFields.TeamMember}
          isClearable
        />
      </FilterInputWrapper>
    </div>
  );
};
