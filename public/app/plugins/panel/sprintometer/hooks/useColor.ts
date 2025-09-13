import { useMemo, useRef } from 'react';

import { theme3 } from '../theme/theme';
import ColorManager from '../utils/colorManager';

export const useColor = (colors = theme3.custom.chart): ((id: string | number) => string) => {
  const colorManagerRef = useRef<ColorManager | null>(null);

  return useMemo(() => {
    if (!colorManagerRef.current) {
      colorManagerRef.current = ColorManager.getInstance(colors);
    }

    const colorManager = colorManagerRef.current;
    return (id: string | number) => colorManager.getColorForId(id);
  }, [colors]);
};
