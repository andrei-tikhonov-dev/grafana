import React from 'react';

import { UiZeroState } from '../../../components/ui/zero-state/UiZeroState';

import { Sankey } from './Sankey';

interface SankeyContentProps {
  visibleColumnsCount: number;
  id: number;
  pluginData: any;
  sankeyWidth: number;
  sankeyHeight: number;
  nodeWidth: number;
  nodePadding: number;
  labelSize: number;
}

export const SankeyContent: React.FC<SankeyContentProps> = React.memo(
  ({ visibleColumnsCount, id, pluginData, sankeyWidth, sankeyHeight, nodeWidth, nodePadding, labelSize }) => {
    if (visibleColumnsCount < 2) {
      return <UiZeroState title="Nothing to show" description="Select at least 2 columns to view the issue map" />;
    }

    return (
      <Sankey
        id={id}
        data={pluginData}
        width={sankeyWidth}
        height={sankeyHeight}
        nodeWidth={nodeWidth}
        nodePadding={nodePadding}
        labelSize={labelSize}
      />
    );
  }
);

SankeyContent.displayName = 'SankeyContent';
