import React from 'react';

import { PanelOptionsEditorBuilder } from '@grafana/data';

import { AI } from './panels/ai';
import { BurndownChart, registerBurndownOptions } from './panels/burndown-chart';
import { ComponentsLibrary } from './panels/components-library';
import { CumulativeFlowDiagram } from './panels/cumulative-flow-diagram';
import { Header, registerHeaderOptions } from './panels/header';
import { IncomingDependencies } from './panels/incoming-dependencies';
import { IssueMap, registerIssueMapOptions } from './panels/issue-map';
import { OutgoingDependencies } from './panels/outgoing-dependencies';
import { PlannerBoard } from './panels/planner-board';
import { SimilarIssues } from './panels/similar-issues';
import { EPanelType, TPanelOptions } from './types';

export interface PanelDescriptor {
  component: React.ComponentType<any>;
  registerOptions?: (builder: PanelOptionsEditorBuilder<TPanelOptions>) => PanelOptionsEditorBuilder<TPanelOptions>;
}

export const PANELS_REGISTRY: Record<EPanelType, PanelDescriptor> = {
  [EPanelType.EmptyPanel]: { component: () => <div>Select panel type in Sprintometer configuration.</div> },
  [EPanelType.Header]: { component: Header, registerOptions: registerHeaderOptions },
  [EPanelType.BurndownChart]: { component: BurndownChart, registerOptions: registerBurndownOptions },
  [EPanelType.CumulativeFlowDiagram]: { component: CumulativeFlowDiagram },
  [EPanelType.IncomingDependencies]: { component: IncomingDependencies },
  [EPanelType.OutgoingDependencies]: { component: OutgoingDependencies },
  [EPanelType.SimilarIssues]: { component: SimilarIssues },
  [EPanelType.PlannerBoard]: { component: PlannerBoard },
  [EPanelType.ComponentsLibrary]: { component: ComponentsLibrary },
  [EPanelType.IssueMap]: { component: IssueMap, registerOptions: registerIssueMapOptions },
  [EPanelType.AI]: { component: AI },
  [EPanelType.Roadmap]: { component: () => <div>ToDo</div> },
};
