import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';

export const useEcharts = ({
  width,
  height,
  option,
  onLegendSelectChanged,
}: {
  width?: number;
  height?: number;
  option: echarts.EChartsOption;
  onLegendSelectChanged?: (params: any) => void;
}) => {
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

    if (onLegendSelectChanged) {
      chartInstance.current.on('legendselectchanged', onLegendSelectChanged);
    }

    return () => {
      if (chartInstance.current) {
        if (onLegendSelectChanged) {
          chartInstance.current.off('legendselectchanged', onLegendSelectChanged);
        }
        chartInstance.current.dispose();
        chartInstance.current = null;
      }
    };
  }, [width, height, option, onLegendSelectChanged]);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.resize();
    }
  }, [width, height]);

  return chartRef;
};
