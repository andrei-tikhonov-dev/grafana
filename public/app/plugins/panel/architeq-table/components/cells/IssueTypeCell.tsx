import { css } from '@emotion/css';
import { IssueTypeIcon, IssueType } from 'architeq-library';
import React from 'react';

import { CustomCellRendererProps, useStyles2 } from '@grafana/ui';

import { InfoLineType } from '../../types';
import { InfoLine } from '../InfoLine';

const getStyles = () => {
  return {
    cell: css`
      display: flex;
      align-items: center;
      gap: 5px;
    `,
  };
};

const icons: Record<string, IssueType> = {
  Story: 'Story',
  Task: 'Task',
  Bug: 'Bug',
  Incident: 'Incident',
  Improvement: 'Improvement',
  Capability: 'Capability',
  Objective: 'Objective',
  Feature: 'Feature',
  Epic: 'Epic',
  'Strategic Theme': 'StrategicTheme',
};

const getIssueType = (inputType: string): IssueType => {
  if (!inputType) {
    return 'Story';
  }

  const lowerInput = inputType.toLowerCase();

  const sortedKeys = Object.keys(icons).sort((a, b) => b.length - a.length);

  for (const key of sortedKeys) {
    const lowerKey = key.toLowerCase();

    if (lowerInput === lowerKey || lowerInput.startsWith(lowerKey + ' ')) {
      return icons[key];
    }
  }

  return 'Story';
};

export const IssueTypeCell = ({ value }: CustomCellRendererProps) => {
  const styles = useStyles2(getStyles);

  if (typeof value === 'object') {
    return <InfoLine {...(value as InfoLineType)} />;
  }

  const type = String(value);
  return (
    <div className={styles.cell}>
      <IssueTypeIcon name={getIssueType(type) || 'Story'} /> {type}
    </div>
  );
};
