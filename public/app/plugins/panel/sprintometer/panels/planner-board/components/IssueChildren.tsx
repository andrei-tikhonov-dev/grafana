import { css } from '@emotion/css';
import * as React from 'react';

import { UiIcon, UiTitle } from '../../../components/ui';
import { theme3 } from '../../../theme/theme';
import { MIssue } from '../types';

import { IssueCard } from './IssueCard';

interface IssueChildrenProps {
  issue: MIssue;
  className?: string;
}

const sectionStyles = css`
  margin-bottom: calc(${theme3.tailwind.spacing} * 2);
`;

const sectionHeaderStyles = css`
  display: flex;
  align-items: center;
  gap: calc(${theme3.tailwind.spacing} * 2);
  font-size: ${theme3.tailwind.textBase};
  font-weight: ${theme3.tailwind.fontWeightSemibold};
  color: ${theme3.shadcn.foreground};
  margin-top: calc(${theme3.tailwind.spacing} * 8);
  margin-bottom: calc(${theme3.tailwind.spacing} * 2);
`;

const childrenContainerStyles = css`
  display: flex;
  flex-direction: column;
  gap: calc(${theme3.tailwind.spacing} * 2);
`;

export function IssueChildren({ issue, className }: IssueChildrenProps) {
  if (!issue.children || issue.children.length === 0) {
    return null;
  }

  return (
    <div className={sectionStyles}>
      <div className={sectionHeaderStyles}>
        <UiIcon name="FormatListBulleted" size="md" />
        <UiTitle>Children ({issue.children.length})</UiTitle>
      </div>

      <div className={childrenContainerStyles}>
        {issue.children.map((childIssue) => (
          <IssueCard issue={childIssue} key={childIssue.issueKey} teamVisible />
        ))}
      </div>
    </div>
  );
}
