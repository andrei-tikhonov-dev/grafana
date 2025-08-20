import { css } from '@emotion/css';
import * as React from 'react';
import { useState } from 'react';

import { Drawer } from '@grafana/ui';

import { UiButton } from '../../../components/ui';
import { theme3 } from '../../../theme/theme';
import { MIssue } from '../types';

import { IssueAiInsights } from './IssueAiInsights';
import { IssueDependencies } from './IssueDependencies';
import { IssueGeneralInfo } from './IssueGeneralInfo';
import { IssueHeader } from './IssueHeader';

interface ShowMoreProps {
  issue: MIssue;
  buttonText?: string;
  className?: string;
}

const contentContainerStyles = css`
  padding: calc(${theme3.tailwind.spacing} * 8) calc(${theme3.tailwind.spacing} * 2);
`;

const footerStyles = css`
  display: flex;
  justify-content: flex-end;
  padding: calc(${theme3.tailwind.spacing} * 2);
  border-top: 1px solid ${theme3.shadcn.border};
`;

export function ShowMore({ issue, buttonText = 'Show more', className }: ShowMoreProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <UiButton size="xs" variant="outline" onClick={handleOpen} className={className}>
        {buttonText}
      </UiButton>

      {isOpen && (
        <Drawer onClose={handleClose}>
          <IssueHeader issue={issue} />

          <div className={contentContainerStyles}>
            <IssueAiInsights issue={issue} />

            <IssueGeneralInfo issue={issue} />

            <IssueDependencies issue={issue} />
          </div>

          <div className={footerStyles}>
            <UiButton variant="secondary" onClick={handleClose}>
              Close
            </UiButton>
          </div>
        </Drawer>
      )}
    </>
  );
}
