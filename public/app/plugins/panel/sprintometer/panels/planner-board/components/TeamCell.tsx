import { css } from '@emotion/css';
import * as React from 'react';

import { UiAvatarGroup } from '../../../components/ui';
import { theme3 } from '../../../theme/theme';
import { MTeam } from '../types';

import { TeamBadge } from './TeamBadge';

const wrapperStyles = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: calc(${theme3.tailwind.spacing} * 2);
  padding: calc(${theme3.tailwind.spacing} * 4) calc(${theme3.tailwind.spacing} * 2);
`;

type Props = {
  team: MTeam;
};

export function TeamCell({ team }: Props) {
  return (
    <div className={wrapperStyles}>
      <TeamBadge team={team} size="lg" />
      <UiAvatarGroup users={team.members} size="sm" />
    </div>
  );
}
