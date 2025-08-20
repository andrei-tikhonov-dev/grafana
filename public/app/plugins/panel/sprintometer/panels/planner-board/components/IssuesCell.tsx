import { css } from '@emotion/css';
import * as React from 'react';

import { theme3 } from '../../../theme/theme';
import { MIssue } from '../types';

import { IssueWithDependencies } from './IssueWithDependencies';

const wrapperStyles = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: calc(${theme3.tailwind.spacing} * 2);
  padding: calc(${theme3.tailwind.spacing} * 4) calc(${theme3.tailwind.spacing} * 2);
`;

type Props = { issues: MIssue[] };

export function IssuesCell({ issues }: Props) {
  return (
    <div className={wrapperStyles}>
      {issues.map((issue) => (
        <IssueWithDependencies issue={issue} key={issue.id} />
      ))}
    </div>
  );
}
