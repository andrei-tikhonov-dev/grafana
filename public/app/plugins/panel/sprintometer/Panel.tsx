import React from 'react';

import { PanelProps } from '@grafana/data';

import { BurndownChart } from './panels/burndown-chart';
import { IncomingDependencies } from './panels/incoming-dependencies';
import { SimilarIssues } from './panels/similar-issues';
import { PanelOptions, PanelTypeEnum } from './types';
import { OutgoingDependencies } from './panels/outgoing-dependencies';
import { CumulativeFlowDiagram } from './panels/cumulative-flow-diagram';

interface Props extends PanelProps<PanelOptions> {}

const Panels = {
  [PanelTypeEnum.EmptyPanel]: () => <div>Select panel type in Sprintometer configuration.</div>,
  [PanelTypeEnum.BurndownChart]: BurndownChart,
  [PanelTypeEnum.CumulativeFlowDiagram]: CumulativeFlowDiagram,
  [PanelTypeEnum.IncomingDependencies]: IncomingDependencies,
  [PanelTypeEnum.OutgoingDependencies]: OutgoingDependencies,
  [PanelTypeEnum.SimilarTasks]: SimilarIssues,
  [PanelTypeEnum.Header]: () => <div>In development...</div>,
};

export const Panel: React.FC<Props> = (props) => {
  const Panel = Panels[props.options.panelType] || Panels[PanelTypeEnum.EmptyPanel];

  return <Panel {...props} />;
};
