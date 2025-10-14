import { DataFrame, PanelData } from '@grafana/data';
import { locationService } from '@grafana/runtime';

export const setVariable = async (variableName: string, value: string) => {
  await locationService.partial({ [`var-${variableName}`]: value });
};

export const setVariables = async (variables: Record<string, string>) => {
  const updatedVariables = Object.fromEntries(Object.entries(variables).map(([key, value]) => [`var-${key}`, value]));

  await locationService.partial(updatedVariables);
};

export function getGrafanaCustomData<T>(data: PanelData, initialData: T): T {
  const dataFrame = getGrafanaFirstSeries(data);

  if (!dataFrame || !dataFrame.meta?.custom) {
    console.error('No meta data');

    return initialData;
  }
  return dataFrame.meta?.custom as T;
}

export function getGrafanaFirstSeries(data: PanelData): DataFrame | null {
  if (!data || !data.series || data.series.length === 0) {
    console.error('No data');

    return null;
  }
  return data.series[0];
}
