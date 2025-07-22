import { css } from '@emotion/css';
import React, { useState } from 'react';

import { UiMultiSelect, UiIcon } from '../../../components/ui';
import { JiraTypeEnum } from '../../../types';

const containerStyles = css`
  max-width: 576px;
`;

const jiraTypesList = [
  { value: JiraTypeEnum.Story, label: 'Story', icon: () => <UiIcon name="Bookmark" size="sm" /> },
  { value: JiraTypeEnum.Epic, label: 'Epic', icon: () => <UiIcon name="Lightbulb" size="sm" /> },
  { value: JiraTypeEnum.Task, label: 'Task', icon: () => <UiIcon name="Check" size="sm" /> },
  { value: JiraTypeEnum.Bug, label: 'Bug', icon: () => <UiIcon name="SquareDot" size="sm" /> },
  {
    value: JiraTypeEnum.Feature,
    label: 'Feature',
    icon: () => <UiIcon name="Bolt" size="sm" />,
  },
  {
    value: JiraTypeEnum.Improvement,
    label: 'Improvement',
    icon: () => <UiIcon name="ArrowUpward" size="sm" />,
  },
  {
    value: JiraTypeEnum.Incident,
    label: 'Incident',
    icon: () => <UiIcon name="FolderClose" size="sm" />,
  },
  {
    value: JiraTypeEnum.Capability,
    label: 'Capability',
    icon: () => <UiIcon name="Code" size="sm" />,
  },
  {
    value: JiraTypeEnum.Objective,
    label: 'Objective',
    icon: () => <UiIcon name="IssueTypeObjective" size="sm" />,
  },
  {
    value: JiraTypeEnum.StrategicTheme,
    label: 'Strategic Theme',
    icon: () => <UiIcon name="Checklist" size="sm" />,
  },
  {
    value: JiraTypeEnum.StrategicStep,
    label: 'Strategic Step',
    icon: () => <UiIcon name="Extension" size="sm" />,
  },
];

export function MultiSelectTest() {
  const [selectedJiraTypes, setSelectedJiraTypes] = useState<string[]>([JiraTypeEnum.Story, JiraTypeEnum.Task]);

  return (
    <div className={containerStyles}>
      <UiMultiSelect
        options={jiraTypesList}
        onValueChange={setSelectedJiraTypes}
        defaultValue={selectedJiraTypes}
        placeholder="Select Jira issue types"
        maxCount={3}
      />
    </div>
  );
}
