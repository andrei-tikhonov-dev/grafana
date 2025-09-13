import { css, cx } from '@emotion/css';
import * as React from 'react';

import { UiFiltersContainer, UiSwitch } from '../../../components/ui';
import { TId } from '../../../types';
import { MFilterState, MTeam } from '../types';

import { TeamsSelect } from './TeamsSelect';

interface FiltersProps {
  className?: string;
  teamOptions: MTeam[];
  onFilterChange?: (filterState: MFilterState) => void;
  defaultFilterState?: Partial<MFilterState>;
  totalIssues: number;
  filteredIssues: number;
}

const containerStyles = css``;

const defaultFilter: MFilterState = {
  selectedTeams: [],
  hasProblems: false,
  hasDependencies: false,
  hasOpenDependencies: false,
};

export function Filters({
  className,
  teamOptions,
  onFilterChange,
  defaultFilterState,
  totalIssues,
  filteredIssues,
  ...props
}: FiltersProps) {
  const [filterState, setFilterState] = React.useState<MFilterState>({
    ...defaultFilter,
    ...defaultFilterState,
  });

  const updateFilter = React.useCallback(
    (updates: Partial<MFilterState>) => {
      const newFilterState = { ...filterState, ...updates };
      setFilterState(newFilterState);
      onFilterChange?.(newFilterState);
    },
    [filterState, onFilterChange]
  );

  // Обработчики изменений
  const handleTeamsChange = React.useCallback(
    (selectedTeamIds: TId[]) => {
      updateFilter({ selectedTeams: selectedTeamIds });
    },
    [updateFilter]
  );

  const handleSwitchChange = React.useCallback(
    (field: keyof Omit<MFilterState, 'selectedTeams'>, checked: boolean) => {
      updateFilter({ [field]: checked });
    },
    [updateFilter]
  );

  return (
    <UiFiltersContainer
      suffix={
        <div>
          Showing {filteredIssues} of {totalIssues} issues
        </div>
      }
      className={cx(containerStyles, className)}
      {...props}
    >
      <TeamsSelect
        teams={teamOptions}
        onSelectionChange={handleTeamsChange}
        defaultSelectedTeams={filterState.selectedTeams}
      />
      <UiSwitch
        id="hasProblems"
        label="Problem issues only"
        checked={filterState.hasProblems}
        onCheckedChange={(checked) => handleSwitchChange('hasProblems', checked)}
      />
      <UiSwitch
        id="hasDependencies"
        label="Has dependencies"
        checked={filterState.hasDependencies}
        onCheckedChange={(checked) => handleSwitchChange('hasDependencies', checked)}
      />
      <UiSwitch
        id="hasOpenDependencies"
        label="Open dependencies"
        checked={filterState.hasOpenDependencies}
        onCheckedChange={(checked) => handleSwitchChange('hasOpenDependencies', checked)}
      />
    </UiFiltersContainer>
  );
}
