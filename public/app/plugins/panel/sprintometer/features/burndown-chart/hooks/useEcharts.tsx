import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';

interface EChartsOptions {
  width?: number;
  height?: number;
  option: echarts.EChartsOption;
}

export const useEcharts = ({ width, height, option }: EChartsOptions) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) {
      return;
    }

    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current);
    }

    chartInstance.current.setOption(option);
    chartInstance.current.resize();

    return () => {
      if (chartInstance.current) {
        chartInstance.current.dispose();
        chartInstance.current = null;
      }
    };
  }, [width, height, option]);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.resize();
    }
  }, [width, height]);

  return chartRef;
};
