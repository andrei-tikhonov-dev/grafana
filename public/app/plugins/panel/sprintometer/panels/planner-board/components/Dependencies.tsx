import { css } from '@emotion/css';
import * as React from 'react';

import { theme3 } from '../../../theme/theme';
import { MIssue } from '../types';

import { Dependency } from './Dependency';

const wrapperStyles = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${theme3.tailwind.spacing};
  border: 1px dotted ${theme3.shadcn.border};
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
  const dependenciesWithoutArt = dependencies.filter((issue) => !issue.ownerTeam.art);
  const dependenciesWithArt = dependencies.filter((issue) => issue.ownerTeam.art);

  if (dependencies.length === 0) {
    return null;
  }

  return (
    <div className={wrapperStyles}>
      {dependenciesWithoutArt.length > 0 && (
        <div className={containerStyles}>
          {dependenciesWithoutArt.map((issue) => (
            <Dependency team={issue.ownerTeam} key={issue.id} />
          ))}
        </div>
      )}

      {dependenciesWithArt.length > 0 && (
        <div className={containerStyles}>
          {dependenciesWithArt.map((issue) => (
            <Dependency team={issue.ownerTeam} key={issue.id} />
          ))}
        </div>
      )}
    </div>
  );
}
