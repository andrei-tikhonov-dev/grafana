import { css } from '@emotion/css';
import React from 'react';

import { EJiraType } from '../../../types';
import { findInEnum } from '../../../utils/enums';

import { UiIcon } from './UiIcon';
import { IconName, JiraTypeIconProps } from './types';

const DEFAULT_COLOR = '#FFFFFF';

export const issueTypeIcons: Record<EJiraType, IconName> = {
  [EJiraType.Story]: 'Bookmark',
  [EJiraType.StrategicTheme]: 'Checklist',
  [EJiraType.StrategicStep]: 'Extension',
  [EJiraType.Epic]: 'Lightbulb',
  [EJiraType.Capability]: 'Code',
  [EJiraType.Feature]: 'Bolt',
  [EJiraType.Objective]: 'IssueTypeObjective',
  [EJiraType.Task]: 'Check',
  [EJiraType.Bug]: 'SquareDot',
  [EJiraType.Incident]: 'FolderClose',
  [EJiraType.Improvement]: 'ArrowUpward',
};

export const issueTypeBackgroundColors: Record<EJiraType, string> = {
  [EJiraType.Story]: '#20BE66',
  [EJiraType.StrategicTheme]: '#FFFFFF',
  [EJiraType.StrategicStep]: '#0499D8',
  [EJiraType.Epic]: '#FCB32A',
  [EJiraType.Capability]: '#0499D8',
  [EJiraType.Feature]: '#6634FA',
  [EJiraType.Objective]: '#FFFFFF',
  [EJiraType.Task]: '#0499D8',
  [EJiraType.Bug]: '#D43758',
  [EJiraType.Incident]: '#FFFFFF',
  [EJiraType.Improvement]: '#20BE66',
};

export const issueTypeColors: Record<EJiraType, string> = {
  [EJiraType.Story]: DEFAULT_COLOR,
  [EJiraType.StrategicTheme]: '#212226',
  [EJiraType.StrategicStep]: DEFAULT_COLOR,
  [EJiraType.Epic]: DEFAULT_COLOR,
  [EJiraType.Capability]: DEFAULT_COLOR,
  [EJiraType.Feature]: DEFAULT_COLOR,
  [EJiraType.Objective]: '#02599B',
  [EJiraType.Task]: DEFAULT_COLOR,
  [EJiraType.Bug]: DEFAULT_COLOR,
  [EJiraType.Incident]: '#D43758',
  [EJiraType.Improvement]: DEFAULT_COLOR,
};

const getStyles = (name: EJiraType) => {
  return {
    container: css`
      display: inline-flex;
      color: ${issueTypeColors[name]};
      background-color: ${issueTypeBackgroundColors[name]};
      border-radius: 2px;
      padding: 4px;
    `,
  };
};

export const UiJiraTypeIcon: React.FC<JiraTypeIconProps> = ({ name, size = 'sm', ...props }) => {
  const normalizedName = findInEnum(EJiraType, name, EJiraType.Task);
  const styles = getStyles(normalizedName);

  return (
    <div className={styles.container}>
      <UiIcon name={issueTypeIcons[normalizedName]} size={size} {...props} />
    </div>
  );
};
