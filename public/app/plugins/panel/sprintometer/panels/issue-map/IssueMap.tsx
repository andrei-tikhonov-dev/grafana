import React from 'react';

import { PanelProps } from '@grafana/data';

import { TPanelOptions } from '../../types';

import { IssueMapComponent } from './components/IssueMapComponent';
import { IssueMapProvider } from './components/SankeyContext';
import { DEFAULT_UNITS } from './constants';

export interface IssueMapProps extends PanelProps<TPanelOptions> {}

export const IssueMap = (props: IssueMapProps) => {
  const { width, height } = props;

  return (
    <IssueMapProvider panelWidth={width} panelHeight={height} unitLabel={DEFAULT_UNITS}>
      <IssueMapComponent {...props} />
    </IssueMapProvider>
  );
};
