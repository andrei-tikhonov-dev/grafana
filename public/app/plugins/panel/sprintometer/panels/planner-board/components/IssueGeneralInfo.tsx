import { css, cx } from '@emotion/css';
import { Zap, Target, AlertCircle, User, Calendar, Users, CalendarArrowUp } from 'lucide-react';
import * as React from 'react';

import { UiIcon, UiAvatar, UiJiraStatusBadge, UiTitle } from '../../../components/ui';
import { UiJiraPriorityIcon } from '../../../components/ui/icon/UiJiraPriorityIcon';
import { theme3 } from '../../../theme/theme';
import { formatFullDate } from '../../../utils/dateTime';
import { MIssue } from '../types';

import { InfoRow } from './InfoRow';
import { TeamBadge } from './TeamBadge';

interface IssueGeneralInfoProps {
  issue: MIssue;
  className?: string;
}

const sectionStyles = css`
  margin-bottom: calc(${theme3.tailwind.spacing} * 8);
`;

const sectionHeaderStyles = css`
  display: flex;
  align-items: center;
  gap: calc(${theme3.tailwind.spacing} * 2);
  font-size: ${theme3.tailwind.textBase};
  font-weight: ${theme3.tailwind.fontWeightSemibold};
  color: ${theme3.shadcn.foreground};
  margin-bottom: calc(${theme3.tailwind.spacing} * 2);
`;

const infoGridStyles = css`
  display: grid;
  gap: calc(${theme3.tailwind.spacing} * 2);
`;

const userStyles = css`
  display: flex;
  align-items: center;
  gap: calc(${theme3.tailwind.spacing} * 2);
`;

export function IssueGeneralInfo({ issue, className }: IssueGeneralInfoProps) {
  return (
    <div className={cx(sectionStyles, className)}>
      <div className={sectionHeaderStyles}>
        <UiIcon name="Info" size="md" />
        <UiTitle>General information</UiTitle>
      </div>

      <div className={infoGridStyles}>
        {issue.status && (
          <InfoRow
            icon={<Zap size={16} />}
            label="Status:"
            value={<UiJiraStatusBadge size="sm" status={issue.status} />}
          />
        )}

        {issue.plannedPi && <InfoRow icon={<Target size={16} />} label="Planned PI:" value={issue.plannedPi.name} />}

        {issue.plannedFor && (
          <InfoRow icon={<CalendarArrowUp size={16} />} label="Planned for:" value={issue.plannedFor} />
        )}

        {issue.startDate && (
          <InfoRow icon={<Calendar size={16} />} label="Start date:" value={formatFullDate(issue.startDate)} />
        )}

        {issue.ownerTeam && (
          <InfoRow
            icon={<Users size={16} />}
            label="Owning team:"
            value={<TeamBadge size="sm" team={issue.ownerTeam} />}
          />
        )}

        {issue.assignee && (
          <InfoRow
            icon={<User size={16} />}
            label="Assignee:"
            value={
              <div className={userStyles}>
                {<UiAvatar size="sm" user={issue.assignee} />}
                <span>{issue.assignee.name || 'Unassigned'}</span>
              </div>
            }
          />
        )}

        {issue.priority && (
          <InfoRow
            icon={<AlertCircle size={16} />}
            label="Priority:"
            value={
              <>
                <UiJiraPriorityIcon name={issue.priority} />
                {issue.priority.charAt(0).toUpperCase() + issue.priority.slice(1)}
              </>
            }
          />
        )}
      </div>
    </div>
  );
}
