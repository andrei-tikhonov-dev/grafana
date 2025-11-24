import { css } from '@emotion/css';
import * as React from 'react';

import { theme3 } from '../../../theme';
import { TUser } from '../../../types';
import { Popover, PopoverContent, PopoverTrigger } from '../../shadcn/popover';
import { UiAvatar } from '../avatar/UiAvatar';
import { UiButton } from '../button/UiButton';
import { UiHorizontalGroup } from '../group/UiHorizontalGroup';
import { UiVerticalGroup } from '../group/UiVerticalGroup';
import { UiTypography } from '../typography/UiTypography';

interface UiAvatarGroupProps {
  users: TUser[];
  maxVisible?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const groupContainerStyles = css`
  display: flex;

  & > * {
    margin-left: -0.5rem;
  }

  & > *:first-child {
    margin-left: 0;
  }

  & [data-slot='avatar'] {
    border: 2px solid ${theme3.shadcn.background};
  }
`;

const popoverContentStyles = css`
  padding: calc(${theme3.tailwind.spacing} * 4);
`;

function UiAvatarGroup({ users, maxVisible = 5, className, size = 'md' }: UiAvatarGroupProps) {
  const visibleUsers = users.slice(0, maxVisible);
  const remainingUsers = users.slice(maxVisible);
  const remainingCount = remainingUsers.length;

  return (
    <UiHorizontalGroup className={className} justify="start" align="center" gap="xs">
      <div className={groupContainerStyles}>
        {visibleUsers.map((user, index) => (
          <UiAvatar key={index} user={user} size={size} />
        ))}
      </div>
      {remainingCount > 0 && (
        <Popover>
          <PopoverTrigger asChild>
            <UiButton
              variant="link"
              type="button"
              className={css`
                padding: 0;
              `}
            >
              +{remainingCount} more
            </UiButton>
          </PopoverTrigger>
          <PopoverContent className={popoverContentStyles} align="center">
            <UiVerticalGroup align="start" gap="md">
              {users.map((user, index) => (
                <UiHorizontalGroup gap="sm" key={index}>
                  <UiAvatar user={user} size="sm" />
                  <UiTypography as="span" variant="bodySmall">
                    {user.name}
                  </UiTypography>
                </UiHorizontalGroup>
              ))}
            </UiVerticalGroup>
          </PopoverContent>
        </Popover>
      )}
    </UiHorizontalGroup>
  );
}

export { UiAvatarGroup };
