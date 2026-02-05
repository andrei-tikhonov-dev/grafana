import React from 'react';

import { PanelOptionsEditorBuilder } from '@grafana/data';

import { AI, registerAIOptions } from './panels/ai';
import { BurndownChart, registerBurndownOptions } from './panels/burndown-chart';
import { ComponentsLibrary } from './panels/components-library';
import { CumulativeFlowDiagram, registerCumulativeFlowDiagramOptions } from './panels/cumulative-flow-diagram';
import { Header, registerHeaderOptions } from './panels/header';
import { IncomingDependencies, registerIncomingDependenciesOptions } from './panels/incoming-dependencies';
import { IssueMap, registerIssueMapOptions } from './panels/issue-map';
import { OutgoingDependencies, registerOutgoingDependenciesOptions } from './panels/outgoing-dependencies';
import { PlannerBoard, registerPlannerBoardOptions } from './panels/planner-board';
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
  [EPanelType.CumulativeFlowDiagram]: { component: CumulativeFlowDiagram, registerOptions: registerCumulativeFlowDiagramOptions },
  [EPanelType.IncomingDependencies]: { component: IncomingDependencies, registerOptions: registerIncomingDependenciesOptions },
  [EPanelType.OutgoingDependencies]: { component: OutgoingDependencies, registerOptions: registerOutgoingDependenciesOptions },
  [EPanelType.SimilarIssues]: { component: SimilarIssues },
  [EPanelType.PlannerBoard]: { component: PlannerBoard, registerOptions: registerPlannerBoardOptions },
  [EPanelType.ComponentsLibrary]: { component: ComponentsLibrary },
  [EPanelType.IssueMap]: { component: IssueMap, registerOptions: registerIssueMapOptions },
  [EPanelType.AI]: { component: AI, registerOptions: registerAIOptions },
  [EPanelType.Roadmap]: { component: () => <div>ToDo</div> },
};
