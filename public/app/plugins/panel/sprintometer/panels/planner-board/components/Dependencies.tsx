import { css } from '@emotion/css';
import * as React from 'react';

import { theme3 } from '../../../theme/theme';
import { MIssue } from '../types';

import { TeamBadge } from './TeamBadge';

const wrapperStyles = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${theme3.tailwind.spacing};
  border: 1px dashed ${theme3.shadcn.border};
  padding: ${theme3.tailwind.spacing};
  border-radius: ${theme3.tailwind.radiusXs};
`;

const containerStyles = css`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: ${theme3.tailwind.spacing};
`;

type Props = {
  dependencies: MIssue[];
};

export function Dependencies({ dependencies }: Props) {
  const internalDependencies = dependencies.filter((issue) => !issue.ownerTeam?.isExternal);
  const externalDependencies = dependencies.filter((issue) => issue.ownerTeam?.isExternal);

  if (dependencies.length === 0) {
    return null;
  }

  return (
    <div className={wrapperStyles}>
      {internalDependencies.length > 0 && (
        <div className={containerStyles}>
          {internalDependencies.map((issue) => (
            <TeamBadge team={issue.ownerTeam} key={issue.id} />
          ))}
        </div>
      )}

      {externalDependencies.length > 0 && (
        <div className={containerStyles}>
          {externalDependencies.map((issue) => (
            <TeamBadge team={issue.ownerTeam} key={issue.id} />
          ))}
        </div>
      )}
    </div>
  );
}
