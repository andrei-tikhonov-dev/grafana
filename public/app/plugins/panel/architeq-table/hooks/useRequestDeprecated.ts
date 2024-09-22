import { locationService } from '@grafana/runtime';

import { PanelOptions } from '../types';

import { useLoading } from './useLoading';
import { useNotifications } from './useNotifications';

function generateHeaders(headers?: Array<Record<string, string>>) {
  const initHeaders: HeadersInit = new Headers({
    'Content-Type': 'application/json',
  });

  headers?.forEach((parameter) => {
    const { name, value } = parameter;
    if (name && value) {
      initHeaders.set(name, value);
    }
  });

  return initHeaders;
}

export function useRequestDeprecated<T>(options: PanelOptions) {
  const { notifyError, notifySuccess } = useNotifications();
  const { loading, setLoadingNone, setLoadingUpdate } = useLoading();

  const updateData = async (payload: T): Promise<boolean> => {
    setLoadingUpdate();

    try {
      const response = await fetch(options.update.url, {
        method: options.update.method,
        headers: generateHeaders(options.update.header),
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to update data.');
      }

      notifySuccess(['Data updated successfully.']);
      locationService.reload();
      return true;
    } catch (error: any) {
      notifyError([error.message || 'Failed to update data.']);
      return false;
    } finally {
      setLoadingNone();
    }
  };

  return { update: updateData, loading };
}
