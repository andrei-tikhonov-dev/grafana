import { css, cx, keyframes } from '@emotion/css';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import * as React from 'react';

import { theme2 } from '../../theme/theme';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.95);
  }
`;

const dropdownMenuContentStyles = css`
  z-index: ${theme2.zIndices.popover};
  min-width: 160px;
  overflow: hidden;
  background-color: ${theme2.colors.background.surface};
  border: 1px solid ${theme2.colors.border.default};
  border-radius: ${theme2.radii.md};
  padding: ${theme2.spacing.xs};
  box-shadow: ${theme2.shadows.md};

  &[data-state='open'] {
    animation: ${fadeIn} ${theme2.transitions.duration.fast} ${theme2.transitions.easing.out};
  }

  &[data-state='closed'] {
    animation: ${fadeOut} ${theme2.transitions.duration.fast} ${theme2.transitions.easing.in};
  }
`;

const dropdownMenuItemStyles = css`
  display: flex;
  align-items: center;
  gap: ${theme2.spacing.sm};
  padding: ${theme2.spacing.sm} ${theme2.spacing.md};
  font-size: ${theme2.typography.fontSize.sm};
  color: ${theme2.colors.text.primary};
  border-radius: ${theme2.radii.sm};
  cursor: pointer;
  outline: none;
  user-select: none;

  &:hover,
  &:focus {
    background-color: ${theme2.colors.background.muted};
  }

  &[data-disabled] {
    color: ${theme2.colors.text.secondary};
    opacity: 0.5;
    pointer-events: none;
  }
`;

const dropdownMenuSeparatorStyles = css`
  height: 1px;
  margin: ${theme2.spacing.xs} 0;
  background-color: ${theme2.colors.border.default};
`;

const dropdownMenuLabelStyles = css`
  padding: ${theme2.spacing.sm} ${theme2.spacing.md};
  font-size: ${theme2.typography.fontSize.xs};
  font-weight: ${theme2.typography.fontWeight.semibold};
  color: ${theme2.colors.text.secondary};
`;

function DropdownMenu({ modal = false, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" modal={modal} {...props} />;
}

function DropdownMenuTrigger({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return <DropdownMenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />;
}

function DropdownMenuContent({
  className,
  sideOffset = 4,
  onPointerDownOutside,
  onFocusOutside,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        className={cx(dropdownMenuContentStyles, className)}
        onPointerDownOutside={(e) => {
          // Prevent dismiss when clicking the trigger itself
          // (zone.js may replay the pointerdown that opened the menu)
          const target = e.detail.originalEvent.target as HTMLElement | null;
          if (target?.closest('[data-slot="dropdown-menu-trigger"]')) {
            e.preventDefault();
          }
          onPointerDownOutside?.(e);
        }}
        onFocusOutside={(e) => {
          // Prevent focus-based dismiss entirely — zone.js synthetic focus events
          // cause false FOCUS_OUTSIDE dispatches. Menu still closes via
          // click-outside (pointerDownOutside) and Escape key.
          e.preventDefault();
          onFocusOutside?.(e);
        }}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

function DropdownMenuItem({ className, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Item>) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      className={cx(dropdownMenuItemStyles, className)}
      {...props}
    />
  );
}

function DropdownMenuSeparator({ className, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cx(dropdownMenuSeparatorStyles, className)}
      {...props}
    />
  );
}

function DropdownMenuLabel({ className, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Label>) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      className={cx(dropdownMenuLabelStyles, className)}
      {...props}
    />
  );
}

export {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
};
