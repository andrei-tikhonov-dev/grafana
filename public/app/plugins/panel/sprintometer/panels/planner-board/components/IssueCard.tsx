import { css, cx } from '@emotion/css';
import * as React from 'react';

import { Badge } from '../../../components/shadcn/badge';
import {
  UiAvatar,
  UiEllipsis,
  UiIcon,
  UiJiraTypeIcon,
  UiLink,
  UiColorCard,
  UiCardContent,
  UiCardFooter,
  UiJiraStatusBadge,
} from '../../../components/ui';
import { theme3 } from '../../../theme/theme';
import { MIssue } from '../types';
import { ESprintometerStatus } from '../../../types';
import { cardColors } from '../custom-theme';
import { findInEnum } from '../../../utils/enums';
import { TeamBadge } from './TeamBadge';
import { UiJiraPriorityBadge } from '../../../components/ui/badge/UiJiraPriorityBadge';

const cardStyles = css`
  border-radius: ${theme3.tailwind.radiusSm};
  padding-top: calc(${theme3.tailwind.spacing} * 2);
  padding-bottom: calc(${theme3.tailwind.spacing} * 2);
  gap: calc(${theme3.tailwind.spacing} * 2);
  box-shadow: none;
`;

const contentStyles = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
  gap: calc(${theme3.tailwind.spacing} * 2);
  padding-left: calc(${theme3.tailwind.spacing} * 2);
  padding-right: calc(${theme3.tailwind.spacing} * 2);
  width: 100%;
  min-width: 0;
`;

const footerStyles = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  gap: ${theme3.tailwind.spacing};
  padding-left: calc(${theme3.tailwind.spacing} * 2);
  padding-right: calc(${theme3.tailwind.spacing} * 2);
  width: 100%;
`;

const footerBagesStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${theme3.tailwind.spacing};
  overflow: hidden;
  min-width: 0;
`;

const badgeStyle = css`
  border: 1px solid ${theme3.shadcn.border};
  background-color: ${theme3.tailwind.colorWhite};
`;

type IssueCardProps = {
  issue: MIssue;
  teamVisible?: boolean;
  action?: React.ReactNode;
  className?: string;
};

export function IssueCard({ issue, className, action, teamVisible }: IssueCardProps) {
  const progress =
    issue.sprintometerData?.progress !== undefined ? <span>{issue.sprintometerData?.progress}%</span> : '';
  const status = findInEnum(ESprintometerStatus, String(issue.sprintometerData?.status), ESprintometerStatus.Default);
  const color = cardColors[status];

  return (
    <UiColorCard color={color} className={cx(cardStyles, className)}>
      <UiCardContent className={contentStyles}>
        <UiJiraTypeIcon type={issue.issueType.type} name={issue.issueType.name} />
        <UiLink url={issue.url}>{issue.issueKey}</UiLink>
        <UiEllipsis>{issue.summary}</UiEllipsis>
        {progress}
      </UiCardContent>
      <UiCardFooter className={footerStyles}>
        <div className={footerBagesStyle}>
          {issue.status && <UiJiraStatusBadge status={issue.status} />}
          {issue.priority && <UiJiraPriorityBadge priority={issue.priority} />}
          {issue.dependencies?.length > 0 && (
            <Badge size="xs" variant="secondary" className={badgeStyle}>
              <UiIcon name="AccountTree" />
              {issue.dependencies.length}
            </Badge>
          )}

          {issue.assignee && (
            <Badge variant="secondary" className={badgeStyle}>
              <UiAvatar size="xs" user={issue.assignee} />
              {issue.assignee?.name}
            </Badge>
          )}
          {teamVisible && issue.ownerTeam && <TeamBadge team={issue.ownerTeam} />}
        </div>
        {action}
      </UiCardFooter>
    </UiColorCard>
  );
}
