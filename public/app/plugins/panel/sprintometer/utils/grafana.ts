import { PanelData } from '@grafana/data';
import { locationService } from '@grafana/runtime';

export const setVariable = async (variableName: string, value: string) => {
  await locationService.partial({ [`var-${variableName}`]: value });
};

export const setVariables = async (variables: Record<string, string>) => {
  const updatedVariables = Object.fromEntries(Object.entries(variables).map(([key, value]) => [`var-${key}`, value]));

  await locationService.partial(updatedVariables);
};

export function getGrafanaCustomData<T>(data: PanelData): T {
  if (!data || !data.series || data.series.length === 0) {
    throw Error('No custom data');
  }

  const dataFrame = data.series[0];
  return dataFrame.meta?.custom as T;
}
