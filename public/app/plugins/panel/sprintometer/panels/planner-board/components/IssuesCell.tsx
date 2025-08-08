import { css } from '@emotion/css';
import * as React from 'react';

import { theme2 } from '../../../theme/theme';
import { MIssue } from '../types';

import { Issue } from './Issue';

const wrapperStyles = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${theme2.spacing.xl};
`;

type Props = { issues: MIssue[] };

export function IssuesCell({ issues }: Props) {
  return (
    <div className={wrapperStyles}>
      {issues.map((issue) => (
        <Issue issue={issue} key={issue.id} />
      ))}
    </div>
  );
}
