import { css, cx } from '@emotion/css';
import React from 'react';

import { PanelProps } from '@grafana/data';

import { ScrollArea } from '../../components/shadcn/scroll-area';
import { UiPanelTitle } from '../../components/ui';
import { UiZeroState } from '../../components/ui/zero-state/UiZeroState';
import { useColor } from '../../hooks/useColor';
import { usePluginState } from '../../hooks/usePluginState';
import { TPanelOptions } from '../../types';
import { getGrafanaCustomData } from '../../utils/grafana';

import { DataTable } from './components/DataTable';
import { Filters } from './components/Filters';
import { MFilterState, MPlannerBoardCustom, MTeam } from './types';
import { convertToTableFormat, countTotalIssues, filterData } from './utils';

interface Props extends PanelProps<TPanelOptions> {}

const styles = {
  wrapper: css`
    padding: 10px;
    display: flex;
    flex-direction: column;
  `,
};

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
  const { zeroState, phases, teams } = getGrafanaCustomData<MPlannerBoardCustom>(data, initialData);
  const [filterState, setFilterState] = usePluginState<MFilterState>(options, onOptionsChange, initialFilterState);
  const { teams: filteredTeams, phases: filteredPhases } = filterData({ teams, phases, filters: filterState });

  const teamOptions: MTeam[] = teams.map(({ id, name, color }) => ({
    id,
    name,
    color: color || getColor(id),
    members: [],
  }));

  const tableData = convertToTableFormat({ phases: filteredPhases, teams: filteredTeams });
  const totalIssues = countTotalIssues(phases);
  const filteredIssues = countTotalIssues(filteredPhases);

  if (zeroState) {
    return <UiZeroState {...zeroState} />;
  }

  return (
    <ScrollArea
      className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
        `
      )}
    >
      <UiPanelTitle>Planner board</UiPanelTitle>
      <Filters
        teamOptions={teamOptions}
        onFilterChange={setFilterState}
        defaultFilterState={filterState}
        totalIssues={totalIssues}
        filteredIssues={filteredIssues}
      />
      <DataTable {...tableData} width={width} />
    </ScrollArea>
  );
};
