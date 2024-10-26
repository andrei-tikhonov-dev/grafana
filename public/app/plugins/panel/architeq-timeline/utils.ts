import { locationService } from '@grafana/runtime';

export const setVariable = async (variableName: string, value: string) => {
  await locationService.partial({ [`var-${variableName}`]: value });
};
