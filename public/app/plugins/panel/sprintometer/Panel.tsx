import React from 'react';

import { PanelProps } from '@grafana/data';

import { BurndownChart } from './panels/burndown-chart';
import { ComponentsLibrary } from './panels/components-library';
import { CumulativeFlowDiagram } from './panels/cumulative-flow-diagram';
import { Header } from './panels/header';
import { IncomingDependencies } from './panels/incoming-dependencies';
import { OutgoingDependencies } from './panels/outgoing-dependencies';
import { SimilarIssues } from './panels/similar-issues';
import { PanelOptions, PanelTypeEnum } from './types';

import './theme/default.css';

interface Props extends PanelProps<PanelOptions> {}

const Panels = {
  [PanelTypeEnum.EmptyPanel]: () => <div>Select panel type in Sprintometer configuration.</div>,
  [PanelTypeEnum.BurndownChart]: BurndownChart,
  [PanelTypeEnum.CumulativeFlowDiagram]: CumulativeFlowDiagram,
  [PanelTypeEnum.IncomingDependencies]: IncomingDependencies,
  [PanelTypeEnum.OutgoingDependencies]: OutgoingDependencies,
  [PanelTypeEnum.SimilarTasks]: SimilarIssues,
  [PanelTypeEnum.Header]: Header,
  [PanelTypeEnum.ComponentsLibrary]: ComponentsLibrary,
};

export const Panel: React.FC<Props> = (props) => {
  const Panel = Panels[props.options.panelType] || Panels[PanelTypeEnum.EmptyPanel];

  return <Panel {...props} />;
};
