import { useState, useEffect } from 'react';

import { TAiForecast } from '../types';

interface UseAiPredictionProps {
  enabled: boolean;
  startValue: number;
  futureDates: string[];
}

export const useAiPrediction = ({ enabled, startValue, futureDates }: UseAiPredictionProps) => {
  const [data, setData] = useState<TAiForecast | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!enabled || futureDates.length === 0) {
      setData(null);
      return;
    }

    setLoading(true);

    const timer = setTimeout(() => {
      const forecastData = futureDates.map((date, index) => {
        // Linear decline to 0 at the end

        // Simple linear interpolation from startValue to 0
        // But we want the FIRST point of futureDates to be the next day?
        // Actually, for continuity, usually we include the start point.
        // But here `futureDates` are the days *after* the last actual data point.
        // So the first forecast point is the next day.

        // Let's assume target is 0 at the last day.
        const predictedValue = Math.max(0, startValue - (startValue * (index + 1)) / futureDates.length);

        // Create a spread
        const spread = startValue * 0.1 * ((index + 1) / futureDates.length) + 1; // Increasing uncertainty

        return {
          date,
          value: Math.round(predictedValue * 10) / 10,
          upperBound: Math.round((predictedValue + spread) * 10) / 10,
          lowerBound: Math.round(Math.max(0, predictedValue - spread) * 10) / 10,
        };
      });

      // To make the line connected, we might need the start point (the last actual data).
      // But ECharts can handle separate series if they share a point?
      // Or we should prepend the start point to the forecast data?
      // In the context of ECharts 'line' series, valid data points are plotted.
      // If we want a connected line:
      // Series 1 (Actual): [A, B, C, null, null]
      // Series 2 (Forecast): [null, null, C, D, E]
      // So Forecast needs to include the last point of Actual.

      // We will handle the "connection" point in the component (by merging or prepping data).
      // The API returns the FORECAST for the FUTURE.

      setData({
        data: forecastData,
      });
      setLoading(false);
    }, 0);

    return () => clearTimeout(timer);
  }, [enabled, startValue, JSON.stringify(futureDates)]);

  return { data, loading };
};
