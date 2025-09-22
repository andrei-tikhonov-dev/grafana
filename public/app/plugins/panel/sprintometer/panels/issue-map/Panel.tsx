import React from 'react';

import { PanelProps } from '@grafana/data';

import { IssueMap } from './IssueMap';
import { SankeyProvider } from './components/SankeyContext';
import { SankeyOptions } from './types';
import { abbreviate } from './utils/utils';

export const Panel = (props: PanelProps<SankeyOptions>) => {
  const { width, height, options } = props;
  const unitLabel = abbreviate(options.valueField);

  return (
    <SankeyProvider panelWidth={width} panelHeight={height} unitLabel={unitLabel}>
      <IssueMap {...props} />
    </SankeyProvider>
  );
};
