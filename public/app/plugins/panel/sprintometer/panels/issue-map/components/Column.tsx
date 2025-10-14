import { css } from '@emotion/css';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';

import { UiButton, UiSwitch } from '../../../components/ui';
import { theme3 } from '../../../theme/theme';

interface ColumnProps {
  id: string;
  name: string;
  index: number;
  show: boolean;
  onToggle: (id: string) => void;
  onMoveLeft: (index: number) => void;
  onMoveRight: (index: number) => void;
  isFirst: boolean;
  isLast: boolean;
}

const containerStyles = css`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid ${theme3.shadcn.input};
  border-radius: ${theme3.tailwind.radiusSm};
  background-color: ${theme3.shadcn.background};
  box-shadow: ${theme3.tailwind.shadowXs};
`;

const arrowButtonStyles = css`
  padding: 0;
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
`;

export const Column: React.FC<ColumnProps> = ({
  id,
  name,
  index,
  show,
  onToggle,
  onMoveLeft,
  onMoveRight,
  isFirst,
  isLast,
}) => {
  return (
    <div className={containerStyles}>
      {!isFirst && (
        <UiButton
          variant="ghost"
          size="sm"
          className={arrowButtonStyles}
          onClick={() => onMoveLeft(index)}
          aria-label="Переместить влево"
        >
          <ChevronLeft size={16} />
        </UiButton>
      )}

      <UiSwitch id={name} label={name} checked={show} onCheckedChange={() => onToggle(id)} />

      {!isLast && (
        <UiButton
          variant="ghost"
          size="sm"
          className={arrowButtonStyles}
          onClick={() => onMoveRight(index)}
          aria-label="Переместить вправо"
        >
          <ChevronRight size={16} />
        </UiButton>
      )}
    </div>
  );
};
