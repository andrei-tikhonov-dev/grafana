import { css } from '@emotion/css';
import React from 'react';

import { PanelProps } from '@grafana/data';

import { ScrollArea } from '../../components/shadcn/scroll-area';
import { UiPanelContainer } from '../../components/ui/panel-container/PanelContainer';
import { useColor } from '../../hooks/useColor';
import { usePluginState } from '../../hooks/usePluginState';
import { TPanelOptions } from '../../types';
import { getGrafanaCustomData } from '../../utils/grafana';

import { DataTable } from './components/DataTable';
import { Filters } from './components/Filters';
import { MFilterState, MPlannerBoardCustom, MTeam } from './types';
import { convertToTableFormat, countTotalIssues, filterData } from './utils';

interface Props extends PanelProps<TPanelOptions> {}

const HEADER_HEIGHT = 102;

const initialData: MPlannerBoardCustom = {
  teams: [],
  phases: [],
};

const initialFilterState: MFilterState = {
  selectedTeams: [],
  hasOpenDependencies: false,
  hasDependencies: false,
  hasProblems: false,
};

export const PlannerBoard: React.FC<Props> = ({ width, height, data, options, onOptionsChange }) => {
  const getColor = useColor();
  const { phases, teams } = getGrafanaCustomData<MPlannerBoardCustom>(data, initialData);
  const [filterState, setFilterState] = usePluginState<MFilterState>(options, onOptionsChange, initialFilterState);
  const { teams: filteredTeams, phases: filteredPhases } = filterData({ teams, phases, filters: filterState });

  const teamOptions: MTeam[] = teams.map(({ id, name, color }) => ({
    id,
    name,
    color: color || getColor(name),
    members: [],
  }));

  const tableData = convertToTableFormat({ phases: filteredPhases, teams: filteredTeams });
  const totalIssues = countTotalIssues(phases);
  const filteredIssues = countTotalIssues(filteredPhases);

  return (
    <UiPanelContainer width={width} height={height} title="Planner board">
      <Filters
        teamOptions={teamOptions}
        onFilterChange={setFilterState}
        defaultFilterState={filterState}
        totalIssues={totalIssues}
        filteredIssues={filteredIssues}
      />
      <ScrollArea
        className={css`
          width: ${width}px;
          height: ${height - HEADER_HEIGHT}px;
        `}
      >
        <DataTable {...tableData} width={width} />
      </ScrollArea>
    </UiPanelContainer>
  );
};
