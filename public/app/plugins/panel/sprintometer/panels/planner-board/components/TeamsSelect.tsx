import { css } from '@emotion/css';
import React, { useState } from 'react';

import { UiMultiSelect, UiColorDot } from '../../../components/ui';
import { TId } from '../../../types';
import { MTeam } from '../types';

const containerStyles = css``;

interface TeamsSelectProps {
  teams: MTeam[];
  onSelectionChange?: (selectedTeamIds: TId[]) => void;
  defaultSelectedTeams?: TId[];
  placeholder?: string;
  maxCount?: number;
}

export function TeamsSelect({
  teams,
  onSelectionChange,
  defaultSelectedTeams = [],
  placeholder = 'Select teams',
  maxCount = 3,
}: TeamsSelectProps) {
  const [selectedTeams, setSelectedTeams] = useState<TId[]>(defaultSelectedTeams);

  const teamsOptions = teams.map((team) => ({
    value: String(team.id),
    label: team.name,
    icon: () => <UiColorDot color={String(team.color)} size="sm" />,
  }));

  const handleValueChange = (newSelectedTeams: string[]) => {
    const numericIds = newSelectedTeams.map((id) => Number(id) as TId);
    setSelectedTeams(numericIds);
    onSelectionChange?.(numericIds);
  };

  return (
    <div className={containerStyles}>
      <UiMultiSelect
        options={teamsOptions}
        onValueChange={handleValueChange}
        defaultValue={selectedTeams.map(String)}
        placeholder={placeholder}
        maxCount={maxCount}
      />
    </div>
  );
}
