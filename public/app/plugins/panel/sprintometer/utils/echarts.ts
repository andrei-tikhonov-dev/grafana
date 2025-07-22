import { theme } from '../theme';

export function getCurrentPeriodSeries(currentPeriod?: string, name = 'Now'): any {
  if (!currentPeriod) {
    return null;
  }
  return {
    name,
    type: 'line',
    data: [],
    markLine: {
      symbol: 'none',
      label: {
        formatter: name,
        position: 'end',
        color: theme.colors.semantic.text,
      },
      lineStyle: {
        color: theme.colors.semantic.text,
        width: 1,
        type: 'dotted',
      },
      data: [
        {
          xAxis: currentPeriod,
        },
      ],
    },
  };
}
