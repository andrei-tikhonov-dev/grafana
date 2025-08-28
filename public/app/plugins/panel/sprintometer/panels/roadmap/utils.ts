import * as echarts from 'echarts';

interface RoadmapOptions {
  data: Array<{ data: number[]; name: string }>;
  periods: string[];
  currentPeriod: string;
  selected: Record<string, boolean>;
}

export const getRoadmapOptions = ({ data }: RoadmapOptions): echarts.EChartsOption => {
  return {};
};
