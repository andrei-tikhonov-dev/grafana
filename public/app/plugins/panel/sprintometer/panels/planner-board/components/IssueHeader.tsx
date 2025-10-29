import { css, cx } from '@emotion/css';
import * as React from 'react';

import { UiJiraTypeIcon, UiLink, UiTypography } from '../../../components/ui';
import { theme3 } from '../../../theme';
import { MIssue } from '../types';

interface IssueHeaderProps {
  issue: MIssue;
  className?: string;
}

const headerStyles = css`
  padding: calc(${theme3.tailwind.spacing} * 6) calc(${theme3.tailwind.spacing} * 2);
  border-bottom: 1px solid ${theme3.shadcn.border};
`;

const issueKeyStyles = css`
  display: flex;
  align-items: center;
  gap: calc(${theme3.tailwind.spacing} * 2);
  margin-bottom: calc(${theme3.tailwind.spacing} * 4);
`;

const titleStyles = css`
  margin-bottom: calc(${theme3.tailwind.spacing} * 2);
  line-height: calc(${theme3.tailwind.spacing} * 2);
`;

export function IssueHeader({ issue, className }: IssueHeaderProps) {
  return (
    <div className={cx(headerStyles, className)}>
      <div className={issueKeyStyles}>
        <UiJiraTypeIcon type={issue.issueType.type} name={issue.issueType.name} />
        <UiLink url={issue.url}>{issue.issueKey}</UiLink>
      </div>

      <UiTypography variant="title" className={titleStyles}>
        {issue.summary}
      </UiTypography>
    </div>
  );
}
