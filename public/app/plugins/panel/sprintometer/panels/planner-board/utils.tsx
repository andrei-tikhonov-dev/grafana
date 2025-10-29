import { ColumnDef } from '@tanstack/react-table';
import * as React from 'react';

import { EJiraStatus, ESprintometerStatus } from '../../types';

import { IssuesCell } from './components/IssuesCell';
import { PhaseHeaderCell } from './components/PhaseHeaderCell';
import { TeamCell } from './components/TeamCell';
import { TeamHeaderCell } from './components/TeamHeaderCell';
import { MFilterState, MIssue, MPhase, MPlannerBoardCustom, MTeam, MTableData, MTableRow } from './types';

export function convertToTableFormat(plannerData: MPlannerBoardCustom): MTableData {
  const columns: Array<ColumnDef<MTableRow>> = [
    {
      id: 'team',
      header: () => <TeamHeaderCell />,
      accessorKey: 'team',
      cell: ({ getValue }) => {
        const team = getValue() as MTeam;
        return <TeamCell team={team} />;
      },
    },
    ...plannerData.phases.map((phase) => ({
      id: `phase_${phase.id}`,
      header: () => <PhaseHeaderCell phase={phase} />,
      accessorKey: `phase_${phase.id}`,
      cell: ({ getValue }: any) => {
        const issues = getValue() as MIssue[];
        return <IssuesCell issues={issues} />;
      },
    })),
  ];

  const data: MTableRow[] = plannerData.teams.map((team, teamIndex) => {
    const row: MTableRow = {
      team: team,
    };

    plannerData.phases.forEach((phase) => {
      const phaseKey = `phase_${phase.id}`;
      row[phaseKey] = phase.items[teamIndex]?.issues || [];
    });

    return row;
  });

  return {
    columns,
    data,
  };
}

export function filterData({ teams, phases, filters }: { teams: MTeam[]; phases: MPhase[]; filters: MFilterState }): {
  teams: MTeam[];
  phases: MPhase[];
} {
  const { selectedTeams, hasOpenDependencies, hasDependencies, hasProblems } = filters;

  let filteredTeams = [...teams];
  let filteredPhases = phases.map((phase) => ({
    ...phase,
    items: phase.items.map((item) => ({
      ...item,
      issues: [...item.issues],
    })),
  }));

  // 1. Team filtering
  if (selectedTeams.length > 0) {
    const deletedTeamKeys: number[] = [];

    // Find indices of teams to remove
    filteredTeams.forEach((team, index) => {
      if (!selectedTeams.includes(team.id)) {
        deletedTeamKeys.push(index);
      }
    });

    // Remove teams not in selectedTeams (in reverse order to maintain indices)
    for (let i = deletedTeamKeys.length - 1; i >= 0; i--) {
      filteredTeams.splice(deletedTeamKeys[i], 1);
    }

    // Remove corresponding items from phases (in reverse order)
    filteredPhases = filteredPhases.map((phase) => ({
      ...phase,
      items: phase.items.filter((_, index) => !deletedTeamKeys.includes(index)),
    }));
  }

  // 2. Dependencies filtering
  if (hasDependencies) {
    filteredPhases = filteredPhases.map((phase) => ({
      ...phase,
      items: phase.items.map((item) => ({
        ...item,
        issues: item.issues.filter((issue) => issue.dependencies && issue.dependencies.length > 0),
      })),
    }));
  }

  // 3. Problems filtering
  if (hasProblems) {
    filteredPhases = filteredPhases.map((phase) => ({
      ...phase,
      items: phase.items.map((item) => ({
        ...item,
        issues: item.issues.filter(
          (issue) =>
            issue.sprintometerData &&
            (issue.sprintometerData.status === ESprintometerStatus.NeedsAttention ||
              issue.sprintometerData.status === ESprintometerStatus.HighRisk)
        ),
      })),
    }));
  }

  // 4. Open dependencies filtering
  if (hasOpenDependencies) {
    filteredPhases = filteredPhases.map((phase) => ({
      ...phase,
      items: phase.items.map((item) => ({
        ...item,
        issues: item.issues.filter((issue) => {
          if (!issue.dependencies || issue.dependencies.length === 0) {
            return false;
          }

          // Check if any dependency is not completed
          return issue.dependencies.some((dependency) => dependency.status.type !== EJiraStatus.Done);
        }),
      })),
    }));
  }

  return { teams: filteredTeams, phases: filteredPhases };
}

export function countTotalIssues(phases: MPhase[]): number {
  return phases.reduce((totalCount, phase) => {
    const phaseCount = phase.items.reduce((itemsCount, item) => {
      return itemsCount + item.issues.length;
    }, 0);

    return totalCount + phaseCount;
  }, 0);
}
