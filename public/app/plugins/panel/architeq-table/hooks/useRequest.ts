import { locationService } from '@grafana/runtime';

import { RequestMethod } from '../constants';

import { useLoading } from './useLoading';
import { useNotifications } from './useNotifications';

type ActionOptionsType = {
  url?: string;
  method?: RequestMethod;
};

type UseRequestOptionsType = {
  create?: ActionOptionsType;
  update?: ActionOptionsType;
  delete?: ActionOptionsType;
};

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

export function useRequest({ create, update, delete: deleteAction }: UseRequestOptionsType) {
  const { notifyError, notifySuccess } = useNotifications();
  const { loading, setLoadingNone, setLoadingUpdate } = useLoading();

  const performRequest = async (payload: any, action?: ActionOptionsType): Promise<boolean> => {
    if (!action?.url || !action?.method) {
      notifyError(['Invalid request configuration.']);
      return false;
    }

    setLoadingUpdate();

    try {
      const response = await fetch(action.url, {
        method: action.method,
        headers: generateHeaders(),
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to process request.');
      }

      notifySuccess(['Action completed successfully.']);
      locationService.reload();
      return true;
    } catch (error: any) {
      notifyError([error.message || 'Failed to process request.']);
      return false;
    } finally {
      setLoadingNone();
    }
  };

  const createRequest = (payload: any) => performRequest(payload, create);
  const updateRequest = (payload: any) => performRequest(payload, update);
  const deleteRequest = (payload: any) => performRequest(payload, deleteAction);

  return {
    createRequest,
    updateRequest,
    deleteRequest,
    loading,
  };
}
