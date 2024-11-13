import React from 'react';

import { CustomCellRendererProps } from '@grafana/ui';

import { InfoLineType } from '../../types';
import { InfoLine } from '../InfoLine';

export const InfoLineCell = ({ value }: CustomCellRendererProps) => {
  return <InfoLine {...(value as InfoLineType)} />;
};
