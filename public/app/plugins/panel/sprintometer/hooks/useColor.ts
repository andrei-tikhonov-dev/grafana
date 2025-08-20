import { useMemo } from 'react';

import { theme3 } from '../theme/theme';
import ColorManager from '../utils/colorManager';

let isInitialized = false;

export const useColor = (id: string | number): string => {
  if (!isInitialized) {
    ColorManager.getInstance(theme3.custom.chart);
    isInitialized = true;
  }

  return useMemo(() => {
    const colorManager = ColorManager.getInstance();
    return colorManager.getColorForId(id);
  }, [id]);
};
