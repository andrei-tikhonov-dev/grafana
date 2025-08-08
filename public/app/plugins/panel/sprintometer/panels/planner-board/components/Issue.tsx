import { css } from '@emotion/css';
import * as React from 'react';

import { Badge } from '../../../components/shadcn/badge';
import { UiEllipsis } from '../../../components/ui';
import { theme3 } from '../../../theme/theme';
import { MIssue } from '../types';

import { Dependencies } from './Dependencies';
import { ShowMore } from './ShowMore';

const wrapperStyles = css`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: calc(${theme3.tailwind.spacing} * 4);
`;

const issueStyles = css`
  border: 1px solid ${theme3.shadcn.border};
  border-radius: ${theme3.tailwind.radiusXs};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${theme3.tailwind.spacing};
  overflow: hidden;
  padding: calc(${theme3.tailwind.spacing} * 2);
`;

const issueHeader = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
  width: 360px;
  gap: ${theme3.tailwind.spacing};
`;

const issueFooter = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
  gap: ${theme3.tailwind.spacing};
`;

type Props = { issue: MIssue };

export function Issue({ issue }: Props) {
  const progress = issue.sprintometerData?.progress !== undefined ? `${issue.sprintometerData?.progress}%` : '';
  return (
    <div className={wrapperStyles}>
      <div className={issueStyles}>
        <div className={issueHeader}>
          <Badge variant="secondary">{issue.issueType.name}</Badge>
          <span>{issue.issueKey}</span>
          <UiEllipsis>{issue.summary}</UiEllipsis>
          <span>{progress}</span>
        </div>
        <div className={issueFooter}>
          <Badge variant="secondary">{issue.status}</Badge>
          <Badge variant="secondary">{issue.priority}</Badge>
          <Badge variant="secondary">{issue.dependencies.length || 0}</Badge>
          <Badge variant="secondary">{issue.assignee.name}</Badge>
          <ShowMore issue={issue} />
        </div>
      </div>
      <Dependencies dependencies={issue.dependencies} />
    </div>
  );
}
