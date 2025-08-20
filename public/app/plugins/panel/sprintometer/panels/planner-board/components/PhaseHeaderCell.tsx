import { css } from '@emotion/css';
import * as React from 'react';

import { UiColorBadge, UiEllipsis, UiIcon } from '../../../components/ui';
import { theme3 } from '../../../theme/theme';
import { formatFullPeriod } from '../../../utils/dateTime';
import { MPhase } from '../types';

const wrapperStyles = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: calc(${theme3.tailwind.spacing} * 8);
  padding: calc(${theme3.tailwind.spacing} * 4) calc(${theme3.tailwind.spacing} * 2);
`;

const leftStyles = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: calc(${theme3.tailwind.spacing} * 4);
`;

const periodStyles = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${theme3.tailwind.spacing};
`;

const ellipsisStyles = css`
  max-width: ${theme3.tailwind.containerSm};
`;

type Props = {
  phase: MPhase;
};

export function PhaseHeaderCell({ phase }: Props) {
  const name = <UiEllipsis className={ellipsisStyles}>{phase.name}</UiEllipsis>;
  return (
    <div className={wrapperStyles}>
      <span className={leftStyles}>
        {phase.period.isCurrent ? <UiColorBadge size="default">{name}</UiColorBadge> : <span>{name}</span>}
        <span>/</span>
        <span className={periodStyles}>
          <UiIcon name="CalendarMonth" /> {formatFullPeriod(phase.period)}
        </span>
      </span>
      {phase.description && <UiEllipsis className={ellipsisStyles}>{phase.description}</UiEllipsis>}
    </div>
  );
}
