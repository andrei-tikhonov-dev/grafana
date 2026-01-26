import { locationService } from '@grafana/runtime';

/**
 * Extracts the dashboard UID from the current Grafana URL.
 * URL format: /d/<uid>/dashboard-name
 */
export function useDashboardUid(): string | undefined {
  const location = locationService.getLocation();
  // URL format: /d/<uid>/dashboard-name
  const match = location.pathname.match(/^\/d\/([^/]+)/);
  return match?.[1];
}
