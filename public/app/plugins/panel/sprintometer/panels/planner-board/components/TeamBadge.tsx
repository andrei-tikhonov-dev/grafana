import { css } from '@emotion/css';
import * as React from 'react';

import { BadgeSize } from '../../../components/shadcn/badge';
import { UiColorDotBadge, UiEllipsis } from '../../../components/ui';
import { useColor } from '../../../hooks/useColor';
import { theme3 } from '../../../theme/theme';
import { MTeam } from '../types';

const wrapperStyles = css`
  max-width: ${theme3.tailwind.container3xs};
  overflow: hidden;
`;

type Props = { team: MTeam; size?: BadgeSize };

export function TeamBadge({ team, size }: Props) {
  const isExternal = Boolean(team.art);
  const teamColor = useColor(team.id);
  const color = isExternal ? theme3.tailwind.colorGray500 : teamColor;

  return (
    <UiColorDotBadge color={color} size={size} className={wrapperStyles}>
      <UiEllipsis>{team.name}</UiEllipsis>
    </UiColorDotBadge>
  );
}
