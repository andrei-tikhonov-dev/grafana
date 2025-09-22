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
  className?: string;
}

const EMPTY_NAME = 'Unknown';

const getTeamLabel = (team: MTeam): string => {
  if (!team.isExternal) {
    return team?.name || EMPTY_NAME;
  }

  const artName = team?.art?.name;
  const teamName = team?.name;

  if (!artName && !teamName) {
    return EMPTY_NAME;
  }

  if (artName && teamName) {
    return `${artName}: ${teamName}`;
  }

  return artName || teamName || EMPTY_NAME;
};

const getTeamColor = (team: MTeam, idColor: string): string => {
  if (team.isExternal) {
    return theme3.tailwind.colorGray500;
  }

  return team.color || idColor;
};

export function TeamBadge({ team, size = 'xs', className }: TeamBadgeProps) {
  const getColor = useColor();

  if (!team) {
    return null;
  }

  const generatedColor = getColor(team.name);
  const label = getTeamLabel(team);
  const teamColor = getTeamColor(team, generatedColor);
  const wrapperClassName = className ? `${wrapperStyles} ${className}` : wrapperStyles;

  return (
    <UiColorDotBadge color={teamColor} size={size} className={wrapperClassName}>
      <UiEllipsis>{label}</UiEllipsis>
    </UiColorDotBadge>
  );
}
