import { AiForecastClient, GetForecastArgs } from '../panels/burndown-chart/api/types';
import { TAiForecast } from '../panels/burndown-chart/types';

const MOCK_DELAY_MS = 300;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Generates forecast data using linear interpolation algorithm
 */
function generateForecastData(startValue: number, futureDates: string[]): TAiForecast['data'] {
  return futureDates.map((date, index) => {
    // Linear decline to 0 at the end
    // Simple linear interpolation from startValue to 0
    const predictedValue = Math.max(0, startValue - (startValue * (index + 1)) / futureDates.length);

    // Create a spread that increases with uncertainty over time
    const spread = startValue * 0.1 * ((index + 1) / futureDates.length) + 1;

    return {
      date,
      value: Math.round(predictedValue * 10) / 10,
      upperBound: Math.round((predictedValue + spread) * 10) / 10,
      lowerBound: Math.round(Math.max(0, predictedValue - spread) * 10) / 10,
    };
  });
}

export function createMockAiForecastClient(): AiForecastClient {
  const getForecast = async (args: GetForecastArgs, _init?: RequestInit): Promise<TAiForecast> => {
    await delay(MOCK_DELAY_MS);

    const forecastData = generateForecastData(args.startValue, args.futureDates);

    return {
      data: forecastData,
    };
  };

  return {
    getForecast,
  };
}
