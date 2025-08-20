import { css, cx } from '@emotion/css';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import * as React from 'react';

import { theme3 } from '../../theme/theme';

const avatarStyles = css`
  position: relative;
  display: flex;
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;
  overflow: hidden;
  border-radius: 9999px;
`;

const avatarImageStyles = css`
  aspect-ratio: 1 / 1;
  width: 100%;
  height: 100%;
`;

const avatarFallbackStyles = css`
  background-color: ${theme3.custom.colorPrimary};
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
`;

function Avatar({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return <AvatarPrimitive.Root data-slot="avatar" className={cx(avatarStyles, className)} {...props} />;
}

function AvatarImage({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return <AvatarPrimitive.Image data-slot="avatar-image" className={cx(avatarImageStyles, className)} {...props} />;
}

function AvatarFallback({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback data-slot="avatar-fallback" className={cx(avatarFallbackStyles, className)} {...props} />
  );
}

export { Avatar, AvatarImage, AvatarFallback };
