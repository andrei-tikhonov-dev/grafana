import { css, cx } from '@emotion/css';
import * as React from 'react';

import { theme3 } from '../../../theme/theme';
import { TUser } from '../../../types';
import { Avatar, AvatarImage, AvatarFallback } from '../../shadcn/avatar';

interface UiAvatarProps {
  user: TUser;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const avatarSizeStyles = {
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

const fallbackTextStyles = css`
  font-size: ${theme3.tailwind.textSm};
  font-weight: ${theme3.tailwind.fontWeightMedium};
  color: ${theme3.shadcn.mutedForeground};
`;

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function UiAvatar({ user, className, size = 'sm' }: UiAvatarProps) {
  const initials = getInitials(user.name);

  return (
    <Avatar className={cx(avatarSizeStyles[size], className)}>
      {user.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
      <AvatarFallback className={fallbackTextStyles}>{initials}</AvatarFallback>
    </Avatar>
  );
}

export { UiAvatar };
