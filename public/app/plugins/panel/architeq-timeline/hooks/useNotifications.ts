import { useCallback } from 'react';

import { AlertErrorPayload, AlertPayload, AppEvents } from '@grafana/data';
import { getAppEvents } from '@grafana/runtime';

export function useNotifications() {
  const appEvents = getAppEvents();
  const notifyError = useCallback(
    (payload: AlertErrorPayload) => appEvents.publish({ type: AppEvents.alertError.name, payload }),
    [appEvents]
  );
  const notifySuccess = useCallback(
    (payload: AlertPayload) => appEvents.publish({ type: AppEvents.alertSuccess.name, payload }),
    [appEvents]
  );

  return { notifyError, notifySuccess };
}
