import { css, cx } from '@emotion/css';
import { Command as CommandPrimitive } from 'cmdk';
import * as React from 'react';

import { theme2 } from '../../theme/theme';
import { UiIcon } from '../ui';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './dialog';

const commandStyles = css`
  background-color: ${theme2.colors.background.surface};
  color: ${theme2.colors.text.primary};
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  overflow: hidden;
  border-radius: ${theme2.radii.md};
`;

const commandDialogContentStyles = css`
  overflow: hidden;
  padding: 0;
`;

const commandDialogCommandStyles = css`
  & [cmdk-group-heading] {
    color: ${theme2.colors.text.secondary};
    padding-left: ${theme2.spacing.sm};
    padding-right: ${theme2.spacing.sm};
    font-weight: ${theme2.typography.fontWeight.medium};
  }

  & [data-slot='command-input-wrapper'] {
    height: 48px;
  }

  & [cmdk-group] {
    padding-left: ${theme2.spacing.sm};
    padding-right: ${theme2.spacing.sm};
  }

  & [cmdk-group]:not([hidden]) ~ [cmdk-group] {
    padding-top: 0;
  }

  & [cmdk-input-wrapper] svg {
    height: 20px;
    width: 20px;
  }

  & [cmdk-input] {
    height: 48px;
  }

  & [cmdk-item] {
    padding-left: ${theme2.spacing.sm};
    padding-right: ${theme2.spacing.sm};
    padding-top: ${theme2.spacing.md};
    padding-bottom: ${theme2.spacing.md};
  }

  & [cmdk-item] svg {
    height: 20px;
    width: 20px;
  }
`;

const commandInputWrapperStyles = css`
  display: flex;
  height: 36px;
  align-items: center;
  gap: ${theme2.spacing.sm};
  border-bottom: 1px solid ${theme2.colors.border.default};
  padding-left: ${theme2.spacing.md};
  padding-right: ${theme2.spacing.md};
`;

const commandInputIconStyles = css`
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  opacity: 0.5;
`;

const commandInputStyles = css`
  display: flex;
  height: 40px;
  width: 100%;
  border-radius: ${theme2.radii.md};
  background-color: transparent;
  padding-top: ${theme2.spacing.md};
  padding-bottom: ${theme2.spacing.md};
  font-size: ${theme2.typography.fontSize.sm};
  outline: none;

  &::placeholder {
    color: ${theme2.colors.text.secondary};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const commandListStyles = css`
  max-height: 300px;
  scroll-padding-top: 4px;
  scroll-padding-bottom: 4px;
  overflow-x: hidden;
  overflow-y: auto;
`;

const commandEmptyStyles = css`
  padding-top: 24px;
  padding-bottom: 24px;
  text-align: center;
  font-size: ${theme2.typography.fontSize.sm};
`;

const commandGroupStyles = css`
  color: ${theme2.colors.text.primary};
  overflow: hidden;
  padding: 4px;

  & [cmdk-group-heading] {
    color: ${theme2.colors.text.secondary};
    padding-left: ${theme2.spacing.sm};
    padding-right: ${theme2.spacing.sm};
    padding-top: 6px;
    padding-bottom: 6px;
    font-size: ${theme2.typography.fontSize.xs};
    font-weight: ${theme2.typography.fontWeight.medium};
  }
`;

const commandSeparatorStyles = css`
  background-color: ${theme2.colors.border.default};
  margin-left: -4px;
  margin-right: -4px;
  height: 1px;
`;

const commandItemStyles = css`
  position: relative;
  display: flex;
  cursor: default;
  align-items: center;
  gap: ${theme2.spacing.sm};
  border-radius: ${theme2.radii.sm};
  padding-left: ${theme2.spacing.sm};
  padding-right: ${theme2.spacing.sm};
  padding-top: 6px;
  padding-bottom: 6px;
  font-size: ${theme2.typography.fontSize.sm};
  outline: none;
  user-select: none;

  &[data-selected='true'] {
    background-color: ${theme2.colors.background.muted};
    color: ${theme2.colors.text.primary};
  }

  &[data-disabled='true'] {
    pointer-events: none;
    opacity: 0.5;
  }

  & svg {
    pointer-events: none;
    flex-shrink: 0;
  }

  & svg:not([class*='size-']) {
    width: 16px;
    height: 16px;
  }
`;

const commandShortcutStyles = css`
  color: ${theme2.colors.text.secondary};
  margin-left: auto;
  font-size: ${theme2.typography.fontSize.xs};
  letter-spacing: 0.1em;
`;

const srOnlyStyles = css`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

function Command({ className, ...props }: React.ComponentProps<typeof CommandPrimitive>) {
  return <CommandPrimitive data-slot="command" className={cx(commandStyles, className)} {...props} />;
}

function CommandDialog({
  title = 'Command Palette',
  description = 'Search for a command to run...',
  children,
  className,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof Dialog> & {
  title?: string;
  description?: string;
  className?: string;
  showCloseButton?: boolean;
}) {
  return (
    <Dialog {...props}>
      <DialogHeader className={srOnlyStyles}>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent className={cx(commandDialogContentStyles, className)} showCloseButton={showCloseButton}>
        <Command className={commandDialogCommandStyles}>{children}</Command>
      </DialogContent>
    </Dialog>
  );
}

function CommandInput({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div data-slot="command-input-wrapper" className={commandInputWrapperStyles}>
      <UiIcon className={commandInputIconStyles} name="Search" />
      <CommandPrimitive.Input data-slot="command-input" className={cx(commandInputStyles, className)} {...props} />
    </div>
  );
}

function CommandList({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.List>) {
  return <CommandPrimitive.List data-slot="command-list" className={cx(commandListStyles, className)} {...props} />;
}

function CommandEmpty({ ...props }: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return <CommandPrimitive.Empty data-slot="command-empty" className={commandEmptyStyles} {...props} />;
}

function CommandGroup({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return <CommandPrimitive.Group data-slot="command-group" className={cx(commandGroupStyles, className)} {...props} />;
}

function CommandSeparator({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cx(commandSeparatorStyles, className)}
      {...props}
    />
  );
}

function CommandItem({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return <CommandPrimitive.Item data-slot="command-item" className={cx(commandItemStyles, className)} {...props} />;
}

function CommandShortcut({ className, ...props }: React.ComponentProps<'span'>) {
  return <span data-slot="command-shortcut" className={cx(commandShortcutStyles, className)} {...props} />;
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
