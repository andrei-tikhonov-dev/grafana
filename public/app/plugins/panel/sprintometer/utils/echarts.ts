import { theme } from '../theme';

export function getCurrentDaySeries(currentDay?: string, name = 'Today'): any {
  if (!currentDay) {
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
          xAxis: currentDay,
        },
      ],
    },
  };
}
