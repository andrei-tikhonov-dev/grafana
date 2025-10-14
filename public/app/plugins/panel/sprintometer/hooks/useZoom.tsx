import React, { useState, useCallback } from 'react';

import { UiZoom } from '../components/ui';

export function useZoom(initialValue = 100, step = 10, min = 30, max = 200) {
  const [value, setValue] = useState(initialValue);

  const zoomIn = useCallback(() => {
    setValue((prev) => Math.min(prev + step, max));
  }, [step, max]);

  const zoomOut = useCallback(() => {
    setValue((prev) => Math.max(prev - step, min));
  }, [step, min]);

  const applyZoom = useCallback(
    (originalValue: number) => {
      return (originalValue * value) / 100;
    },
    [value]
  );

  const onValueChange = useCallback((selected: string) => {
    setValue(Number(selected));
  }, []);

  const component = (
    <UiZoom
      value={value}
      onValueChange={onValueChange}
      onZoomIn={zoomIn}
      onZoomOut={zoomOut}
      min={min}
      max={max}
      step={step}
    />
  );

  return { component, value, applyZoom };
}
