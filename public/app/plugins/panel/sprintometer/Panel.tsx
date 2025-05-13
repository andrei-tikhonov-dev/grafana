import React from 'react';

import { PanelProps } from '@grafana/data';

import { BurndownChart } from './features/burndown-chart';
import { IncomingDependencies } from './features/incoming-dependencies';
import { SimilarTasks } from './features/similar-tasks';
import { PanelOptions, PanelType } from './types';

interface Props extends PanelProps<PanelOptions> {}

const Panels = {
  [PanelType.EmptyPanel]: () => <div>Select panel type in Sprintometer configuration.</div>,
  [PanelType.BurndownChart]: BurndownChart,
  [PanelType.IncomingDependencies]: IncomingDependencies,
  [PanelType.SimilarTasks]: SimilarTasks,
};

export const Panel: React.FC<Props> = (props) => {
  const Panel = Panels[props.options.panelType] || Panels[PanelType.EmptyPanel];

  return <Panel {...props} />;
};
