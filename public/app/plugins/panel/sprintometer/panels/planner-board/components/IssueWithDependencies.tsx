import { css } from '@emotion/css';
import * as React from 'react';

import { theme3 } from '../../../theme/theme';
import { MIssue } from '../types';

import { Dependencies } from './Dependencies';
import { IssueCard } from './IssueCard';
import { ShowMore } from './ShowMore';

const wrapperStyles = css`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 0;
`;

const issueCardStyles = css`
  width: ${theme3.tailwind.containerLg};
`;

const arrowStyles = css`
  display: flex;
  align-items: center;
  height: 100%;
  margin-left: -3px;
  margin-top: calc(${theme3.tailwind.spacing} * 4);
`;

type IssueWithDependenciesProps = {
  issue: MIssue;
};

export function IssueWithDependencies({ issue }: IssueWithDependenciesProps) {
  const validDependencies = React.useMemo(
    () => issue.dependencies?.filter((dependency) => dependency.ownerTeam) || [],
    [issue.dependencies]
  );

  return (
    <div className={wrapperStyles}>
      <IssueCard issue={issue} className={issueCardStyles} action={<ShowMore issue={issue} />} />

      {validDependencies.length > 0 && (
        <>
          <div className={arrowStyles}>
            <svg width="27" height="6" viewBox="0 0 27 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0.333333 3C0.333333 4.47276 1.52724 5.66667 3 5.66667C4.47276 5.66667 5.66667 4.47276 5.66667 3C5.66667 1.52724 4.47276 0.333333 3 0.333333C1.52724 0.333333 0.333333 1.52724 0.333333 3ZM27 3L22 0.113249V5.88675L27 3ZM3 3V3.5H22.5V3V2.5H3V3Z"
                fill="#7D797B"
              />
            </svg>
          </div>

          <Dependencies dependencies={validDependencies} />
        </>
      )}
    </div>
  );
}
