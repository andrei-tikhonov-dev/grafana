import { css, cx } from '@emotion/css';
import * as React from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';

import { theme3 } from '../../theme/theme';

const overlayStyles = css`
  position: fixed;
  inset: 0;
  z-index: 50;
  background-color: rgba(0, 0, 0, 0.5);

  &[data-state='open'] {
    animation: fadeIn 150ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  &[data-state='closed'] {
    animation: fadeOut 150ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;

const contentStyles = css`
  position: fixed;
  z-index: 50;
  display: flex;
  height: auto;
  flex-direction: column;
  background-color: ${theme3.shadcn.background};

  &[data-vaul-drawer-direction='top'] {
    inset-inline: 0;
    top: 0;
    margin-bottom: 6rem;
    max-height: 80vh;
    border-bottom-left-radius: ${theme3.tailwind.radiusLg};
    border-bottom-right-radius: ${theme3.tailwind.radiusLg};
    border-bottom: 1px solid ${theme3.shadcn.border};
  }

  &[data-vaul-drawer-direction='bottom'] {
    inset-inline: 0;
    bottom: 0;
    margin-top: 6rem;
    max-height: 80vh;
    border-top-left-radius: ${theme3.tailwind.radiusLg};
    border-top-right-radius: ${theme3.tailwind.radiusLg};
    border-top: 1px solid ${theme3.shadcn.border};
  }

  &[data-vaul-drawer-direction='right'] {
    inset-block: 0;
    right: 0;
    width: 75%;
    border-left: 1px solid ${theme3.shadcn.border};

    @media (min-width: ${theme3.tailwind.breakpointSm}) {
      max-width: 24rem;
    }
  }

  &[data-vaul-drawer-direction='left'] {
    inset-block: 0;
    left: 0;
    width: 75%;
    border-right: 1px solid ${theme3.shadcn.border};

    @media (min-width: ${theme3.tailwind.breakpointSm}) {
      max-width: 24rem;
    }
  }
`;

const handleStyles = css`
  margin-inline: auto;
  margin-top: 1rem;
  height: 0.5rem;
  width: 100px;
  flex-shrink: 0;
  border-radius: 9999px;
  background-color: ${theme3.shadcn.muted};
  display: none;

  .group\\/drawer-content[data-vaul-drawer-direction='bottom'] & {
    display: block;
  }
`;

const headerStyles = css`
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  padding: 1rem;

  .group\\/drawer-content[data-vaul-drawer-direction='bottom'] &,
  .group\\/drawer-content[data-vaul-drawer-direction='top'] & {
    text-align: center;
  }

  @media (min-width: ${theme3.tailwind.breakpointMd}) {
    gap: 0.375rem;
    text-align: left;
  }
`;

const footerStyles = css`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
`;

const titleStyles = css`
  color: ${theme3.shadcn.foreground};
  font-weight: 600;
`;

const descriptionStyles = css`
  color: ${theme3.shadcn.mutedForeground};
  font-size: ${theme3.tailwind.textSm};
  line-height: ${theme3.tailwind.textSmLineHeight};
`;

function Drawer({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Root>) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />;
}

function DrawerTrigger({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Trigger>) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />;
}

function DrawerPortal({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Portal>) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;
}

function DrawerClose({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Close>) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />;
}

function DrawerOverlay({ className, ...props }: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
  return <DrawerPrimitive.Overlay data-slot="drawer-overlay" className={cx(overlayStyles, className)} {...props} />;
}

function DrawerContent({ className, children, ...props }: React.ComponentProps<typeof DrawerPrimitive.Content>) {
  return (
    <DrawerPortal data-slot="drawer-portal">
      <DrawerOverlay />
      <DrawerPrimitive.Content
        data-slot="drawer-content"
        className={cx('group/drawer-content', contentStyles, className)}
        {...props}
      >
        <div className={handleStyles} />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
}

function DrawerHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="drawer-header" className={cx(headerStyles, className)} {...props} />;
}

function DrawerFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="drawer-footer" className={cx(footerStyles, className)} {...props} />;
}

function DrawerTitle({ className, ...props }: React.ComponentProps<typeof DrawerPrimitive.Title>) {
  return <DrawerPrimitive.Title data-slot="drawer-title" className={cx(titleStyles, className)} {...props} />;
}

function DrawerDescription({ className, ...props }: React.ComponentProps<typeof DrawerPrimitive.Description>) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cx(descriptionStyles, className)}
      {...props}
    />
  );
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
