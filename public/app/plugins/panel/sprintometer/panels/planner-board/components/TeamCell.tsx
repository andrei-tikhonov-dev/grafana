import { css } from '@emotion/css';
import * as React from 'react';

import { UiAvatarGroup, UiTitle } from '../../../components/ui';
import { theme3 } from '../../../theme/theme';
import { MTeam } from '../types';

const wrapperStyles = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${theme3.tailwind.spacing};
  padding: calc(${theme3.tailwind.spacing} * 4);
`;

type Props = {
  team: MTeam;
};

export function TeamCell({ team }: Props) {
  return (
    <div className={wrapperStyles}>
      <UiTitle>{team.name}</UiTitle>
      <UiAvatarGroup users={team.members} size="sm" />
    </div>
  );
}
