import { locationService } from '@grafana/runtime';

export const setVariable = async (variableName: string, value: string) => {
  await locationService.partial({ [`var-${variableName}`]: value });
};

export const setVariables = async (variables: Record<string, string>) => {
  const updatedVariables = Object.fromEntries(Object.entries(variables).map(([key, value]) => [`var-${key}`, value]));

  await locationService.partial(updatedVariables);
};
