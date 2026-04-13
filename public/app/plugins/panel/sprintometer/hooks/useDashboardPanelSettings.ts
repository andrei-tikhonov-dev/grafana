import { useQuery } from '@tanstack/react-query';

import { getBackendSrv } from '@grafana/runtime';

import { EPanelType } from '../types';
import { safeParseJson } from '../utils/json';

import { useDashboardUid } from './useDashboardUid';

const PLUGIN_ID = 'architeq-sprintometer-panel';

// Lightweight equivalents of per-panel saved state types.
// The originals are defined locally in each panel component.

interface BurndownChartSavedState {
  valueMode: string;
  selectedIssues: string[];
  showNonWorkingDays: boolean;
}

interface CumulativeFlowDiagramSavedState {
  selectedIssues: string[];
  selectedStatuses: Record<string, boolean>;
  isStacked: boolean;
}

interface IssueMapSavedState {
  hiddenFields: string[];
  fieldsOrder: string[];
  filters: Record<string, string[]>;
}

interface PlannerBoardSavedState {
  selectedTeams: number[];
  hasProblems: boolean;
  hasDependencies: boolean;
  hasOpenDependencies: boolean;
}

interface PanelSavedStateMap {
  [EPanelType.BurndownChart]: BurndownChartSavedState;
  [EPanelType.CumulativeFlowDiagram]: CumulativeFlowDiagramSavedState;
  [EPanelType.IssueMap]: IssueMapSavedState;
  [EPanelType.PlannerBoard]: PlannerBoardSavedState;
}

export type DashboardPanelSettings = {
  [K in keyof PanelSavedStateMap]?: PanelSavedStateMap[K];
};

interface DashboardPanel {
  type: string;
  options?: {
    panelType?: string;
    savedState?: string;
  };
}

interface DashboardResponse {
  dashboard: {
    panels?: DashboardPanel[];
  };
}

const PANEL_TYPES_WITH_STATE = new Set<string>([
  EPanelType.BurndownChart,
  EPanelType.CumulativeFlowDiagram,
  EPanelType.IssueMap,
  EPanelType.PlannerBoard,
]);

function extractPanelSettings(panels: DashboardPanel[]): DashboardPanelSettings {
  const settings: DashboardPanelSettings = {};

  for (const panel of panels) {
    if (panel.type !== PLUGIN_ID) {
      continue;
    }

    const panelType = panel.options?.panelType;
    if (!panelType || !PANEL_TYPES_WITH_STATE.has(panelType)) {
      continue;
    }

    // Keep only the first panel of each type
    if (panelType in settings) {
      continue;
    }

    const parsed = safeParseJson<Record<string, unknown>>(panel.options?.savedState);
    if (parsed) {
      (settings as Record<string, unknown>)[panelType] = parsed;
    }
  }

  return settings;
}

/**
 * Fetches saved state from all Sprintometer panels on the current dashboard.
 * Returns an object keyed by panel type, with the parsed `savedState` of the
 * first panel found for each type.
 */
export function useDashboardPanelSettings(): DashboardPanelSettings | undefined {
  const dashboardUid = useDashboardUid();

  const { data } = useQuery({
    queryKey: ['dashboard-panel-settings', dashboardUid],
    queryFn: async () => {
      const response = await getBackendSrv().get<DashboardResponse>(`/api/dashboards/uid/${dashboardUid}`);
      const panels = response.dashboard.panels ?? [];

      return extractPanelSettings(panels);
    },
    enabled: !!dashboardUid,
    staleTime: 5 * 60 * 1000,
  });

  return data;
}
