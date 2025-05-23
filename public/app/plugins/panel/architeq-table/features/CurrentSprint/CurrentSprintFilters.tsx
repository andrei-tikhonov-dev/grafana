import { css } from '@emotion/css';
import React, { ChangeEvent, useCallback, useMemo } from 'react';

import { SelectableValue } from '@grafana/data';
import { Input, MultiSelect, useStyles2 } from '@grafana/ui';

import { HeaderItem } from '../../components/HeaderItem';
import { SprintPlaningColumns } from '../SprintPlaning/constants';

import { CurrentSprintColumns } from './constants';
import { CurrentSprintFiltersType } from './types';

export const FILTER_HEIGHT = 45;

const getStyles = () => ({
  container: css`
    display: flex;
    gap: 2px;
    margin-bottom: 20px;
    max-width: 1024px;
  `,
  input: css`
    flex: 1;
  `,
});

type Props = {
  assignees: string[];
  statuses: string[];
  types: string[];
  onChange: (filter: CurrentSprintFiltersType) => void;
  filters: CurrentSprintFiltersType;
};

type MultiSelectConfig = {
  key: keyof Pick<CurrentSprintFiltersType, 'teamMembers' | 'status' | 'types'>;
  options: string[];
  placeholder: string;
  filterValue: string[];
};

const createSelectOptions = (items: string[]): Array<SelectableValue<string>> =>
  items.map((item) => ({ label: item, value: item }));

export const CurrentSprintFilters: React.FC<Props> = ({ assignees, statuses, types, onChange, filters }) => {
  const styles = useStyles2(getStyles);

  const multiSelectConfigs: MultiSelectConfig[] = useMemo(
    () => [
      {
        key: 'teamMembers',
        options: assignees,
        placeholder: SprintPlaningColumns.TeamMember,
        filterValue: filters.teamMembers,
      },
      {
        key: 'status',
        options: statuses,
        placeholder: CurrentSprintColumns.Status,
        filterValue: filters.status,
      },
      {
        key: 'types',
        options: types,
        placeholder: CurrentSprintColumns.Type,
        filterValue: filters.types,
      },
    ],
    [assignees, statuses, types, filters.teamMembers, filters.status, filters.types]
  );

  const handleMultiSelectChange = useCallback(
    (key: MultiSelectConfig['key']) => (selected: Array<SelectableValue<string>>) => {
      const selectedValues = selected.map((item) => item.value || '');
      onChange({ ...filters, [key]: selectedValues });
    },
    [filters, onChange]
  );

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange({ ...filters, search: e.target.value });
    },
    [filters, onChange]
  );

  return (
    <div className={styles.container}>
      <div className={styles.input}>
        <HeaderItem>
          <Input value={filters.search} onChange={handleInputChange} placeholder="Search" />
        </HeaderItem>
      </div>

      {multiSelectConfigs.map(({ key, options, placeholder, filterValue }) => (
        <div key={key} className={styles.input}>
          <HeaderItem>
            <MultiSelect
              options={createSelectOptions(options)}
              value={createSelectOptions(filterValue)}
              onChange={handleMultiSelectChange(key)}
              placeholder={placeholder}
              isClearable
            />
          </HeaderItem>
        </div>
      ))}
    </div>
  );
};
