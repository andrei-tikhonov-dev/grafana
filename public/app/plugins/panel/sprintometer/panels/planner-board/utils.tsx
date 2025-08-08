import { ColumnDef } from '@tanstack/react-table';
import * as React from 'react';

import { IssuesCell } from './components/IssuesCell';
import { TeamCell } from './components/TeamCell';
import { MPlannerBoardCustom, MTeam, MIssue, UTableRow, UTableData } from './types';

export function convertToTableFormat(plannerData: MPlannerBoardCustom): UTableData {
  const columns: Array<ColumnDef<UTableRow>> = [
    {
      id: 'team',
      header: () => 'Teams',
      accessorKey: 'team',
      cell: ({ getValue }) => {
        const team = getValue() as MTeam;
        return <TeamCell team={team} />;
      },
    },
    ...plannerData.phases.map((phase) => ({
      id: `phase_${phase.id}`,
      header: () => phase.name,
      accessorKey: `phase_${phase.id}`,
      cell: ({ getValue }: any) => {
        const issues = getValue() as MIssue[];
        return <IssuesCell issues={issues} />;
      },
    })),
  ];

  const data: UTableRow[] = plannerData.teams.map((team, teamIndex) => {
    const row: UTableRow = {
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
