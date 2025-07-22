import { css, cx, keyframes } from '@emotion/css';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as React from 'react';

import { theme2 } from '../../theme/theme';
import { UiIcon } from '../ui';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const zoomIn = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;

const zoomOut = keyframes`
  from {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  to {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.95);
  }
`;

const dialogOverlayStyles = css`
  position: fixed;
  inset: 0;
  z-index: ${theme2.zIndices.modal};
  background-color: rgba(0, 0, 0, 0.5);

  &[data-state='open'] {
    animation: ${fadeIn} ${theme2.transitions.duration.normal} ${theme2.transitions.easing.out};
  }

  &[data-state='closed'] {
    animation: ${fadeOut} ${theme2.transitions.duration.normal} ${theme2.transitions.easing.in};
  }
`;

const dialogContentStyles = css`
  background-color: ${theme2.colors.background.surface};
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: ${theme2.zIndices.modal};
  display: grid;
  width: 100%;
  max-width: calc(100% - 32px);
  transform: translate(-50%, -50%);
  gap: 16px;
  border-radius: ${theme2.radii.lg};
  border: 1px solid ${theme2.colors.border.default};
  padding: 24px;
  box-shadow: ${theme2.shadows.lg};

  /* FIXED: Remove transition-duration as it conflicts with animations */

  &[data-state='open'] {
    animation: ${zoomIn} ${theme2.transitions.duration.normal} ${theme2.transitions.easing.out};
  }

  &[data-state='closed'] {
    animation: ${zoomOut} ${theme2.transitions.duration.normal} ${theme2.transitions.easing.in};
  }

  @media (min-width: 640px) {
    max-width: 512px;
  }
`;

const dialogCloseStyles = css`
  position: absolute;
  top: 16px;
  right: 16px;
  border-radius: ${theme2.radii.sm};
  opacity: 0.7;
  transition: opacity ${theme2.transitions.duration.normal};
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;

  &:hover {
    opacity: 1;
  }

  &:focus {
    outline: none;
  }

  &[data-state='open'] {
    background-color: ${theme2.colors.background.muted};
    color: ${theme2.colors.text.secondary};
  }

  &:disabled {
    pointer-events: none;
  }

  & svg {
    pointer-events: none;
    flex-shrink: 0;
    width: 16px;
    height: 16px;
  }
`;

const dialogHeaderStyles = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: center;

  @media (min-width: 640px) {
    text-align: left;
  }
`;

const dialogFooterStyles = css`
  display: flex;
  flex-direction: column-reverse;
  gap: 8px;

  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: flex-end;
  }
`;

const dialogTitleStyles = css`
  font-size: 18px;
  line-height: 1;
  font-weight: ${theme2.typography.fontWeight.semibold};
  color: ${theme2.colors.text.primary};
`;

const dialogDescriptionStyles = css`
  color: ${theme2.colors.text.secondary};
  font-size: ${theme2.typography.fontSize.sm};
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

function Dialog({ ...props }: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({ ...props }: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({ ...props }: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({ ...props }: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay data-slot="dialog-overlay" className={cx(dialogOverlayStyles, className)} {...props} />
  );
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean;
}) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content data-slot="dialog-content" className={cx(dialogContentStyles, className)} {...props}>
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close data-slot="dialog-close" className={dialogCloseStyles}>
            <UiIcon name="CloseSmall" />
            <span className={srOnlyStyles}>Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="dialog-header" className={cx(dialogHeaderStyles, className)} {...props} />;
}

function DialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="dialog-footer" className={cx(dialogFooterStyles, className)} {...props} />;
}

function DialogTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return <DialogPrimitive.Title data-slot="dialog-title" className={cx(dialogTitleStyles, className)} {...props} />;
}

function DialogDescription({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cx(dialogDescriptionStyles, className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
