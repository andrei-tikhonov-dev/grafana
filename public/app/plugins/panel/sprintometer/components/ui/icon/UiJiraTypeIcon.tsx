import { css } from '@emotion/css';
import React from 'react';

import { JiraType } from '../../../types';
import { toObjectKey } from '../../../utils/helpers';

import { UiIcon } from './UiIcon';
import { IconName, JiraTypeIconProps } from './types';

const DEFAULT_COLOR = '#FFFFFF';

export const issueTypeIcons: Record<JiraType, IconName> = {
  [JiraType.Story]: 'Bookmark',
  [JiraType.StrategicTheme]: 'Checklist',
  [JiraType.StrategicStep]: 'Extension',
  [JiraType.Epic]: 'Lightbulb',
  [JiraType.Capability]: 'Code',
  [JiraType.Feature]: 'Bolt',
  [JiraType.Objective]: 'IssueTypeObjective',
  [JiraType.Task]: 'Check',
  [JiraType.Bug]: 'SquareDot',
  [JiraType.Incident]: 'FolderClose',
  [JiraType.Improvement]: 'ArrowUpward',
};

export const issueTypeBackgroundColors: Record<JiraType, string> = {
  [JiraType.Story]: '#20BE66',
  [JiraType.StrategicTheme]: '#FFFFFF',
  [JiraType.StrategicStep]: '#0499D8',
  [JiraType.Epic]: '#FCB32A',
  [JiraType.Capability]: '#0499D8',
  [JiraType.Feature]: '#6634FA',
  [JiraType.Objective]: '#FFFFFF',
  [JiraType.Task]: '#0499D8',
  [JiraType.Bug]: '#D43758',
  [JiraType.Incident]: '#FFFFFF',
  [JiraType.Improvement]: '#20BE66',
};

export const issueTypeColors: Record<JiraType, string> = {
  [JiraType.Story]: DEFAULT_COLOR,
  [JiraType.StrategicTheme]: '#212226',
  [JiraType.StrategicStep]: DEFAULT_COLOR,
  [JiraType.Epic]: DEFAULT_COLOR,
  [JiraType.Capability]: DEFAULT_COLOR,
  [JiraType.Feature]: DEFAULT_COLOR,
  [JiraType.Objective]: '#02599B',
  [JiraType.Task]: DEFAULT_COLOR,
  [JiraType.Bug]: DEFAULT_COLOR,
  [JiraType.Incident]: '#D43758',
  [JiraType.Improvement]: DEFAULT_COLOR,
};

const getStyles = (name: JiraType) => {
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
  const iconName = toObjectKey<JiraType>(name);
  const styles = getStyles(iconName);

  return (
    <div className={styles.container}>
      <UiIcon name={issueTypeIcons[iconName]} size={size} {...props} />
    </div>
  );
};
