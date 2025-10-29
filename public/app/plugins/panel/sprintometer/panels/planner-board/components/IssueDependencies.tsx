import { css } from '@emotion/css';
import * as React from 'react';

import { UiIcon, UiTypography } from '../../../components/ui';
import { theme3 } from '../../../theme';
import { MIssue } from '../types';

import { IssueCard } from './IssueCard';
import { PlannedForBadge } from './PlannedForBadge';

interface IssueDependenciesProps {
  issue: MIssue;
  className?: string;
}

const sectionStyles = css`
  margin-bottom: ${theme3.tailwind.spacing2};
`;

const sectionHeaderStyles = css`
  display: flex;
  align-items: center;
  gap: ${theme3.tailwind.spacing2};
  font-size: ${theme3.tailwind.textBase};
  font-weight: ${theme3.tailwind.fontWeightSemibold};
  color: ${theme3.shadcn.foreground};
  margin-bottom: ${theme3.tailwind.spacing2};
`;

const dependencyContainerStyles = css`
  margin-top: ${theme3.tailwind.spacing2};
  display: flex;
  flex-direction: column;
  gap: ${theme3.tailwind.spacing2};
`;

const dependencyHeaderStyles = css`
  font-size: ${theme3.tailwind.textSm};
  font-weight: ${theme3.tailwind.fontWeightMedium};
  color: ${theme3.shadcn.foreground};
  margin-top: ${theme3.tailwind.spacing2};
`;

const artGroupContainerStyles = css`
  display: flex;
  flex-direction: column;
  gap: ${theme3.tailwind.spacing2};
`;

export function IssueDependencies({ issue, className }: IssueDependenciesProps) {
  if (!issue.dependencies || issue.dependencies.length === 0) {
    return null;
  }

  const internalDependencies =
    issue.dependencies?.filter((dep) => dep.ownerTeam?.art?.id === issue.ownerTeam?.art?.id) || [];

  const externalDependencies =
    issue.dependencies?.filter((dep) => dep.ownerTeam?.art?.id !== issue.ownerTeam?.art?.id) || [];

  const externalDependenciesByArt = externalDependencies.reduce((acc, dep) => {
    const artId = dep.ownerTeam?.art?.id;
    const artName = dep.ownerTeam?.art?.name;

    if (!artId || !artName) {
      return acc;
    }

    if (!acc[artId]) {
      acc[artId] = {
        name: artName,
        dependencies: [],
      };
    }

    acc[artId].dependencies.push(dep);
    return acc;
  }, {} as Record<string, { name: string; dependencies: MIssue[] }>);

  return (
    <div className={sectionStyles}>
      <div className={sectionHeaderStyles}>
        <UiIcon name="AccountTree" size="md" />
        <UiTypography variant="title" as="span">
          Dependencies ({issue.dependencies.length})
        </UiTypography>
      </div>

      {internalDependencies.length > 0 && (
        <div className={dependencyContainerStyles}>
          {internalDependencies.map((dependencyIssue) => (
            <IssueCard
              issue={dependencyIssue}
              key={dependencyIssue.issueKey}
              bottomSlot={dependencyIssue.plannedFor && <PlannedForBadge plannedFor={dependencyIssue.plannedFor} />}
              teamVisible
            />
          ))}
        </div>
      )}

      {Object.keys(externalDependenciesByArt).length > 0 && (
        <div className={dependencyContainerStyles}>
          {Object.entries(externalDependenciesByArt).map(([artId, artGroup]) => (
            <div key={artId} className={artGroupContainerStyles}>
              <div className={dependencyHeaderStyles}>ART: {artGroup.name}</div>
              {artGroup.dependencies.map((dependencyIssue) => (
                <IssueCard
                  issue={dependencyIssue}
                  key={dependencyIssue.issueKey}
                  bottomSlot={dependencyIssue.plannedFor && <PlannedForBadge plannedFor={dependencyIssue.plannedFor} />}
                  teamVisible
                />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
