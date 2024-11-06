import React from 'react';

import { CustomCellRendererProps } from '@grafana/ui';

import { InfoListItemType } from '../../types';
import { InfoLine } from '../InfoLine';

export const InfoLineCell = ({ value }: CustomCellRendererProps) => {
  return <InfoLine {...(value as InfoListItemType)} />;
};
