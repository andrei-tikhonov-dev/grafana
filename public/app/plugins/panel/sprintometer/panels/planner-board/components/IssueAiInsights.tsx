import { css, cx } from '@emotion/css';
import { Lightbulb, Sparkles } from 'lucide-react';
import * as React from 'react';

import { UiColorCard, UiCardContent, UiCardHeader } from '../../../components/ui';
import { theme3 } from '../../../theme/theme';
import { ESprintometerStatus } from '../../../types';
import { findInEnum } from '../../../utils/enums';
import { cardColors } from '../custom-theme';
import { MIssue } from '../types';

interface IssueAiInsightsProps {
  issue: MIssue;
  className?: string;
}

const aiInsightsStyles = css`
  border: 1px solid ${theme3.custom.colorSecondary};
  border-radius: ${theme3.tailwind.radiusSm};
  padding: calc(${theme3.tailwind.spacing} * 6);
  margin-bottom: calc(${theme3.tailwind.spacing} * 8);
`;

const aiHeaderStyles = css`
  display: flex;
  align-items: center;
  gap: calc(${theme3.tailwind.spacing} * 2);
  color: ${theme3.custom.colorSecondary};
  margin-bottom: calc(${theme3.tailwind.spacing} * 2);
`;

const insightTextStyles = css`
  margin-bottom: calc(${theme3.tailwind.spacing} * 2);
`;

const suggestedActionStyles = css`
  box-shadow: none;
  padding-top: calc(${theme3.tailwind.spacing} * 2);
  padding-bottom: calc(${theme3.tailwind.spacing} * 2);
  gap: ${theme3.tailwind.spacing};
`;

const actionHeaderStyles = css`
  display: flex;
  align-items: center;
  gap: calc(${theme3.tailwind.spacing} * 2);
  margin: calc(${theme3.tailwind.spacing} * 2);
`;

const actionContentStyles = css`
  margin: calc(${theme3.tailwind.spacing} * 2);
`;

export function IssueAiInsights({ issue, className }: IssueAiInsightsProps) {
  if (!issue.sprintometerData?.info) {
    return null;
  }

  const status = findInEnum(ESprintometerStatus, String(issue.sprintometerData?.status), ESprintometerStatus.Default);
  const cardColor = cardColors[status];

  const suggestedActionColorStyles = css``;

  return (
    <div className={aiInsightsStyles}>
      <div className={aiHeaderStyles}>
        <Sparkles size={16} />
        <span>AI insights</span>
      </div>

      <div className={insightTextStyles}>{issue.sprintometerData.info.insights}</div>

      <UiColorCard color={cardColor} className={cx(suggestedActionStyles, suggestedActionColorStyles)}>
        <UiCardHeader className={actionHeaderStyles}>
          <Lightbulb size={16} />
          <span>Suggested action</span>
        </UiCardHeader>
        <UiCardContent className={actionContentStyles}>{issue.sprintometerData.info.action}</UiCardContent>
      </UiColorCard>
    </div>
  );
}
