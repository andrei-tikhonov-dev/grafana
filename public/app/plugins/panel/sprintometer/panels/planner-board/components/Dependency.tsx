import { css } from '@emotion/css';
import * as React from 'react';

import { Badge } from '../../../components/shadcn/badge';
import { UiEllipsis } from '../../../components/ui';
import { MTeam } from '../types';

const wrapperStyles = css`
  max-width: 100px;
  overflow: hidden;
`;

type Props = { team: MTeam };

export function Dependency({ team }: Props) {
  const isExternal = Boolean(team.art);
  return (
    <Badge className={wrapperStyles} variant={isExternal ? 'secondary' : 'default'}>
      <UiEllipsis>{team.name}</UiEllipsis>
    </Badge>
  );
}
