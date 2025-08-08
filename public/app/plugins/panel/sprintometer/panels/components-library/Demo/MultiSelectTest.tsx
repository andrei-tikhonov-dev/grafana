import { css } from '@emotion/css';
import React, { useState } from 'react';

import { UiMultiSelect, UiIcon } from '../../../components/ui';
import { EJiraType } from '../../../types';

const containerStyles = css`
  max-width: 576px;
`;

const jiraTypesList = [
  { value: EJiraType.Story, label: 'Story', icon: () => <UiIcon name="Bookmark" size="sm" /> },
  { value: EJiraType.Epic, label: 'Epic', icon: () => <UiIcon name="Lightbulb" size="sm" /> },
  { value: EJiraType.Task, label: 'Task', icon: () => <UiIcon name="Check" size="sm" /> },
  { value: EJiraType.Bug, label: 'Bug', icon: () => <UiIcon name="SquareDot" size="sm" /> },
  {
    value: EJiraType.Feature,
    label: 'Feature',
    icon: () => <UiIcon name="Bolt" size="sm" />,
  },
  {
    value: EJiraType.Improvement,
    label: 'Improvement',
    icon: () => <UiIcon name="ArrowUpward" size="sm" />,
  },
  {
    value: EJiraType.Incident,
    label: 'Incident',
    icon: () => <UiIcon name="FolderClose" size="sm" />,
  },
  {
    value: EJiraType.Capability,
    label: 'Capability',
    icon: () => <UiIcon name="Code" size="sm" />,
  },
  {
    value: EJiraType.Objective,
    label: 'Objective',
    icon: () => <UiIcon name="IssueTypeObjective" size="sm" />,
  },
  {
    value: EJiraType.StrategicTheme,
    label: 'Strategic Theme',
    icon: () => <UiIcon name="Checklist" size="sm" />,
  },
  {
    value: EJiraType.StrategicStep,
    label: 'Strategic Step',
    icon: () => <UiIcon name="Extension" size="sm" />,
  },
];

export function MultiSelectTest() {
  const [selectedJiraTypes, setSelectedJiraTypes] = useState<string[]>([EJiraType.Story, EJiraType.Task]);

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
