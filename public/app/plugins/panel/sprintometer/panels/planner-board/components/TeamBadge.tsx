import { css } from '@emotion/css';
import * as React from 'react';

import { BadgeSize } from '../../../components/shadcn/badge';
import { UiColorDotBadge, UiEllipsis } from '../../../components/ui';
import { useColor } from '../../../hooks/useColor';
import { theme3 } from '../../../theme/theme';
import { MTeam } from '../types';

const wrapperStyles = css`
  max-width: ${theme3.tailwind.container4xs};
  overflow: hidden;
`;

interface TeamBadgeProps {
  team: MTeam;
  size?: BadgeSize;
  color?: string;
  isExternal?: boolean;
  className?: string;
}

export function TeamBadge({
  team,
  size = 'xs',
  color: overrideColor,
  isExternal: forceExternal,
  className,
}: TeamBadgeProps) {
  const isExternal = forceExternal ?? Boolean(team?.art);
  const getColor = useColor();
  const idColor = getColor(team?.id);
  const label = isExternal ? `ART ${team?.art?.name}: ${team?.name}` : team?.name;

  const teamColor = React.useMemo(() => {
    if (overrideColor) {
      return overrideColor;
    }
    if (isExternal) {
      return theme3.tailwind.colorGray500;
    }
    return team.color || idColor;
  }, [overrideColor, isExternal, team?.color, idColor]);

  if (!team) {
    return null;
  }

  return (
    <UiColorDotBadge
      color={teamColor}
      size={size}
      className={className ? `${wrapperStyles} ${className}` : wrapperStyles}
    >
      <UiEllipsis>{label}</UiEllipsis>
    </UiColorDotBadge>
  );
}
