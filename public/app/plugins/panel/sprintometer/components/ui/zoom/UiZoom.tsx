import { css } from '@emotion/css';
import { ZoomOut, ZoomIn } from 'lucide-react';
import React from 'react';

import { theme3 } from '../../../theme/theme';
import { UiButton } from '../button/UiButton';
import { UiHorizontalGroup } from '../group/UiHorizontalGroup';
import { UiSelect, UiSelectGroup } from '../select/UiSelect';

const containerStyles = css`
  padding-top: ${theme3.tailwind.spacing};
`;

const buttonStyles = css`
  height: 2.5rem;
  width: 2.5rem;
`;

const iconStyles = css`
  height: 1rem;
  width: 1rem;
`;

const selectStyles = css`
  width: 8rem;
`;

interface UiZoomProps {
  value: number;
  onValueChange: (value: string) => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  min?: number;
  max?: number;
  step?: number;
}

export function UiZoom({ value, onValueChange, onZoomIn, onZoomOut, min = 30, max = 200, step = 10 }: UiZoomProps) {
  const options = Array.from({ length: (max - min) / step + 1 }, (_, index) => {
    const zoomValue = min + index * step;
    return { label: `${zoomValue}%`, value: zoomValue.toString() };
  });

  const groups: UiSelectGroup[] = [
    {
      label: 'Zoom Level',
      options: options,
    },
  ];

  return (
    <div className={containerStyles}>
      <UiHorizontalGroup gap="xs">
        <UiButton
          variant="outline"
          className={buttonStyles}
          onClick={onZoomOut}
          disabled={value <= min}
          title="Zoom Out"
        >
          <ZoomOut className={iconStyles} />
        </UiButton>

        <UiSelect groups={groups} value={value.toString()} onValueChange={onValueChange} className={selectStyles} />

        <UiButton variant="outline" className={buttonStyles} onClick={onZoomIn} disabled={value >= max} title="Zoom In">
          <ZoomIn className={iconStyles} />
        </UiButton>
      </UiHorizontalGroup>
    </div>
  );
}
