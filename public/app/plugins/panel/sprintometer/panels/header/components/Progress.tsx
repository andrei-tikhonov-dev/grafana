import React from 'react';
import { css } from '@emotion/css';
import { Clock } from 'lucide-react';

import { UiHorizontalGroup, UiTypography } from '../../../components/ui';
import { MProgress } from '../types';
import { ProgressBar } from './ProgressBar';

interface Props extends MProgress {
  className?: string;
}

/**
 * Progress component.
 * Displays progress with a clock icon and a progress bar.
 */
export const Progress: React.FC<Props> = ({ percentage, name, className }) => {
  return (
    <UiHorizontalGroup gap="sm" className={className}>
      <Clock size={16} />
      <UiTypography as="span" variant="bodyBold">
        {name}
      </UiTypography>
      <ProgressBar
        value={percentage}
        size="sm"
        className={css`
          width: 50px;
          flex-shrink: 0;
        `}
      />
    </UiHorizontalGroup>
  );
};
