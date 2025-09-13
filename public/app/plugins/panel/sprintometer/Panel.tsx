import React from 'react';

import { PanelProps } from '@grafana/data';

import { BurndownChart } from './panels/burndown-chart';
import { ComponentsLibrary } from './panels/components-library';
import { CumulativeFlowDiagram } from './panels/cumulative-flow-diagram';
import { Header } from './panels/header';
import { IncomingDependencies } from './panels/incoming-dependencies';
import { OutgoingDependencies } from './panels/outgoing-dependencies';
import { PlannerBoard } from './panels/planner-board';
import { SimilarIssues } from './panels/similar-issues';
import { TPanelOptions, EPanelType } from './types';

import './theme/default.css';

interface Props extends PanelProps<TPanelOptions> {}

const Panels = {
  [EPanelType.EmptyPanel]: () => <div>Select panel type in Sprintometer configuration.</div>,
  [EPanelType.BurndownChart]: BurndownChart,
  [EPanelType.CumulativeFlowDiagram]: CumulativeFlowDiagram,
  [EPanelType.IncomingDependencies]: IncomingDependencies,
  [EPanelType.OutgoingDependencies]: OutgoingDependencies,
  [EPanelType.SimilarTasks]: SimilarIssues,
  [EPanelType.Header]: Header,
  [EPanelType.ComponentsLibrary]: ComponentsLibrary,
  [EPanelType.PlannerBoard]: PlannerBoard,
  [EPanelType.Roadmap]: () => <div>ToDo</div>,
};

export const Panel: React.FC<Props> = (props) => {
  const Panel = Panels[props.options.panelType] || Panels[EPanelType.EmptyPanel];

  return <Panel {...props} />;
};
