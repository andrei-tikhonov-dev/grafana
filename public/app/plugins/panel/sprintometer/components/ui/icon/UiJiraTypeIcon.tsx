import { css } from '@emotion/css';
import React from 'react';

import { JiraTypeEnum } from '../../../types';
import { toObjectKey } from '../../../utils/helpers';

import { UiIcon } from './UiIcon';
import { IconName, JiraTypeIconProps } from './types';

const DEFAULT_COLOR = '#FFFFFF';

export const issueTypeIcons: Record<JiraTypeEnum, IconName> = {
  [JiraTypeEnum.Story]: 'Bookmark',
  [JiraTypeEnum.StrategicTheme]: 'Checklist',
  [JiraTypeEnum.StrategicStep]: 'Extension',
  [JiraTypeEnum.Epic]: 'Lightbulb',
  [JiraTypeEnum.Capability]: 'Code',
  [JiraTypeEnum.Feature]: 'Bolt',
  [JiraTypeEnum.Objective]: 'IssueTypeObjective',
  [JiraTypeEnum.Task]: 'Check',
  [JiraTypeEnum.Bug]: 'SquareDot',
  [JiraTypeEnum.Incident]: 'FolderClose',
  [JiraTypeEnum.Improvement]: 'ArrowUpward',
};

export const issueTypeBackgroundColors: Record<JiraTypeEnum, string> = {
  [JiraTypeEnum.Story]: '#20BE66',
  [JiraTypeEnum.StrategicTheme]: '#FFFFFF',
  [JiraTypeEnum.StrategicStep]: '#0499D8',
  [JiraTypeEnum.Epic]: '#FCB32A',
  [JiraTypeEnum.Capability]: '#0499D8',
  [JiraTypeEnum.Feature]: '#6634FA',
  [JiraTypeEnum.Objective]: '#FFFFFF',
  [JiraTypeEnum.Task]: '#0499D8',
  [JiraTypeEnum.Bug]: '#D43758',
  [JiraTypeEnum.Incident]: '#FFFFFF',
  [JiraTypeEnum.Improvement]: '#20BE66',
};

export const issueTypeColors: Record<JiraTypeEnum, string> = {
  [JiraTypeEnum.Story]: DEFAULT_COLOR,
  [JiraTypeEnum.StrategicTheme]: '#212226',
  [JiraTypeEnum.StrategicStep]: DEFAULT_COLOR,
  [JiraTypeEnum.Epic]: DEFAULT_COLOR,
  [JiraTypeEnum.Capability]: DEFAULT_COLOR,
  [JiraTypeEnum.Feature]: DEFAULT_COLOR,
  [JiraTypeEnum.Objective]: '#02599B',
  [JiraTypeEnum.Task]: DEFAULT_COLOR,
  [JiraTypeEnum.Bug]: DEFAULT_COLOR,
  [JiraTypeEnum.Incident]: '#D43758',
  [JiraTypeEnum.Improvement]: DEFAULT_COLOR,
};

const getStyles = (name: JiraTypeEnum) => {
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
  const iconName = toObjectKey<JiraTypeEnum>(name);
  const styles = getStyles(iconName);

  return (
    <div className={styles.container}>
      <UiIcon name={issueTypeIcons[iconName]} size={size} {...props} />
    </div>
  );
};
