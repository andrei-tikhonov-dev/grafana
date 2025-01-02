import React, { useState, useCallback } from 'react';

import { HorizontalGroup, IconButton, Select } from '@grafana/ui';

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

  const options = Array.from({ length: (max - min) / step + 1 }, (_, index) => {
    const zoomValue = min + index * step;
    return { label: `${zoomValue}%`, value: zoomValue };
  });

  const onChange = useCallback((selected: any) => {
    setValue(selected.value);
  }, []);

  const component = (
    <div style={{ paddingTop: '5px' }}>
      <HorizontalGroup>
        <IconButton name="search-minus" onClick={zoomOut} variant="secondary" tooltip="Zoom Out" />
        <Select
          options={options}
          value={options.find((option) => option.value === value)}
          onChange={onChange}
          width={12} // Adjust width as needed
        />
        <IconButton name="search-plus" onClick={zoomIn} variant="secondary" tooltip="Zoom In" />
      </HorizontalGroup>
    </div>
  );

  return { component, value, applyZoom };
}
