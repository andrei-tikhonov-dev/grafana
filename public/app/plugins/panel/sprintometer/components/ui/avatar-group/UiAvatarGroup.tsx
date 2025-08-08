import { css, cx } from '@emotion/css';
import * as React from 'react';

import { theme3 } from '../../../theme/theme';
import { TUser } from '../../../types';
import { Popover, PopoverContent, PopoverTrigger } from '../../shadcn/popover';
import { UiAvatar } from '../avatar/UiAvatar';
import { UiButton } from '../button/UiButton';

interface UiAvatarGroupProps {
  users: TUser[];
  maxVisible?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const containerStyles = css`
  display: flex;
  gap: calc(${theme3.tailwind.spacing} * 4);
`;

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

const moreButtonSizeStyles = {
  sm: css`
    width: 1.5rem;
    height: 1.5rem;
  `,
  md: css`
    width: 2rem;
    height: 2rem;
  `,
  lg: css`
    width: 3rem;
    height: 3rem;
  `,
};

const popoverContentStyles = css`
  padding: calc(${theme3.tailwind.spacing} * 4);
`;

const userListStyles = css`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const userItemStyles = css`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border-radius: ${theme3.tailwind.radiusSm};
`;

const userNameStyles = css`
  font-size: ${theme3.tailwind.textSm};
  font-weight: ${theme3.tailwind.fontWeightMedium};
  color: ${theme3.shadcn.foreground};
`;

function UiAvatarGroup({ users, maxVisible = 5, className, size = 'md' }: UiAvatarGroupProps) {
  const visibleUsers = users.slice(0, maxVisible);
  const remainingUsers = users.slice(maxVisible);
  const remainingCount = remainingUsers.length;

  return (
    <div className={cx(containerStyles, className)}>
      <div className={groupContainerStyles}>
        {visibleUsers.map((user, index) => (
          <UiAvatar key={index} user={user} size={size} />
        ))}
      </div>
      <div>
        {remainingCount > 0 && (
          <Popover>
            <PopoverTrigger asChild>
              <UiButton variant="link" className={moreButtonSizeStyles[size]} type="button">
                +{remainingCount} more
              </UiButton>
            </PopoverTrigger>
            <PopoverContent className={popoverContentStyles} align="center">
              <div className={cx(userListStyles)}>
                {users.map((user, index) => (
                  <div key={index} className={userItemStyles}>
                    <UiAvatar user={user} size="sm" />
                    <span className={userNameStyles}>{user.name}</span>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
}

export { UiAvatarGroup };
