import { getTemplateSrv } from '@grafana/runtime';
import { useMemo } from 'react';

export const useGrafanaVariables = (names: string[]): Record<string, string | string[]> => {
  return useMemo(() => {
    const templateSrv = getTemplateSrv();
    const variables = templateSrv.getVariables();
    const result: Record<string, string | string[]> = {};

    names.forEach((name) => {
      const variable = variables.find((v) => v.name === name);

      if (!variable) {
        console.warn(`Variable "${name}" not found in Grafana dashboard.`);
        return;
      }

      // @ts-ignore - access internal structure safely
      const currentValue = variable.current?.value;

      if (currentValue !== undefined) {
        result[name] = currentValue;
      } else {
        result[name] = templateSrv.replace(`$${name}`);
      }
    });

    return result;
  }, [names]);
};
