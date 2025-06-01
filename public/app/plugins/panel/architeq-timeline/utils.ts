import { getAppEvents, locationService, RefreshEvent } from '@grafana/runtime';

export const setVariable = async (variableName: string, value: string) => {
  await locationService.partial({ [`var-${variableName}`]: value });
};

export const setVariables = async (variables: Record<string, string>) => {
  const updatedVariables = Object.fromEntries(Object.entries(variables).map(([key, value]) => [`var-${key}`, value]));

  await locationService.partial(updatedVariables);
};

export const formatDate = (date?: string): string => {
  if (!date) {
    return '';
  }

  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = dateObj.toLocaleString('en-US', { month: 'short' });
  const year = dateObj.getFullYear();

  return `${day} ${month}, ${year}`;
};

export const formatRelativeDate = (dateString: string): string => {
  if (!dateString) {
    return '';
  }

  const date = new Date(dateString);
  const now = new Date();

  const dateDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const diffTime = today.getTime() - dateDay.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  }

  return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
};

export const refreshAllPanels = (): void => {
  getAppEvents().publish(new RefreshEvent());
};

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
