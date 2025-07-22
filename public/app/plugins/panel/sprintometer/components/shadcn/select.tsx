import { css, cx } from '@emotion/css';
import * as SelectPrimitive from '@radix-ui/react-select';
import * as React from 'react';

import { theme2 } from '../../theme/theme';
import { UiIcon } from '../ui';

const baseTransition = css`
  transition-property: color, box-shadow;
  transition-timing-function: ${theme2.transitions.easing.inOut};
  transition-duration: ${theme2.transitions.duration.fast};
`;

const focusRing = css`
  outline: none;

  &:focus-visible {
    border-color: ${theme2.colors.brand.primary};
    outline: none;
  }
`;

const disabledState = css`
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const selectTriggerBase = css`
  display: flex;
  width: fit-content;
  align-items: center;
  justify-content: space-between;
  gap: ${theme2.spacing.sm};
  border-radius: ${theme2.radii.md};
  border: 1px solid ${theme2.colors.border.default};
  background-color: transparent;
  padding: ${theme2.spacing.sm} ${theme2.spacing.md};
  font-size: ${theme2.typography.fontSize.md};
  line-height: ${theme2.typography.lineHeight.normal};
  white-space: nowrap;
  box-shadow: ${theme2.shadows.xs};

  ${baseTransition}
  ${focusRing}
  ${disabledState}

  &[data-placeholder] {
    color: ${theme2.colors.text.secondary};
  }

  &[aria-invalid='true'] {
    border-color: ${theme2.colors.semantic.error};
  }

  svg:not([class*='text-']) {
    color: ${theme2.colors.text.secondary};
    pointer-events: none;
    flex-shrink: 0;

    &:not([class*='size-']) {
      width: 16px;
      height: 16px;
    }
  }

  [data-slot='select-value'] {
    display: flex;
    align-items: center;
    gap: ${theme2.spacing.sm};
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
`;

const selectTriggerSizes = {
  default: css`
    height: 36px;
  `,
  sm: css`
    height: 32px;
  `,
};

const selectContentBase = css`
  position: relative;
  z-index: ${theme2.zIndices.dropdown};
  max-height: 320px;
  min-width: 128px;
  transform-origin: center;
  overflow-x: hidden;
  overflow-y: auto;
  border-radius: ${theme2.radii.lg};
  border: 1px solid ${theme2.colors.border.subtle};
  background-color: ${theme2.colors.background.surface};
  color: ${theme2.colors.text.primary};
  box-shadow: ${theme2.shadows.lg};

  &[data-state='open'] {
    animation: contentShow ${theme2.transitions.duration.fast} ${theme2.transitions.easing.inOut};
  }

  &[data-state='closed'] {
    animation: contentHide ${theme2.transitions.duration.fast} ${theme2.transitions.easing.inOut};
  }

  &[data-side='bottom'] {
    animation-name: slideInFromTop;
  }

  &[data-side='left'] {
    animation-name: slideInFromRight;
  }

  &[data-side='right'] {
    animation-name: slideInFromLeft;
  }

  &[data-side='top'] {
    animation-name: slideInFromBottom;
  }

  @keyframes contentShow {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes contentHide {
    from {
      opacity: 1;
      transform: scale(1);
    }
    to {
      opacity: 0;
      transform: scale(0.95);
    }
  }

  @keyframes slideInFromTop {
    from {
      transform: translateY(-8px);
    }
    to {
      transform: translateY(0);
    }
  }

  @keyframes slideInFromRight {
    from {
      transform: translateX(4px);
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes slideInFromLeft {
    from {
      transform: translateX(-4px);
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes slideInFromBottom {
    from {
      transform: translateY(8px);
    }
    to {
      transform: translateY(0);
    }
  }
`;

const selectContentPopper = css`
  &[data-side='bottom'] {
    transform: translateY(4px);
  }

  &[data-side='left'] {
    transform: translateX(-4px);
  }

  &[data-side='right'] {
    transform: translateX(4px);
  }

  &[data-side='top'] {
    transform: translateY(-4px);
  }
`;

const viewportBase = css`
  padding: ${theme2.spacing.xs};
`;

const viewportPopper = css`
  height: 36px;
  width: 100%;
  min-width: 128px;
  scroll-margin: ${theme2.spacing.xs};
`;

const selectLabelStyle = css`
  padding: ${theme2.spacing.xs} ${theme2.spacing.sm};
  font-size: ${theme2.typography.fontSize.sm};
  line-height: ${theme2.typography.lineHeight.tight};
  color: ${theme2.colors.text.secondary};
`;

const selectItemStyle = css`
  position: relative;
  display: flex;
  width: 100%;
  cursor: default;
  user-select: none;
  align-items: center;
  gap: ${theme2.spacing.sm};
  border-radius: ${theme2.radii.sm};
  padding: ${theme2.spacing.xs} 32px ${theme2.spacing.xs} ${theme2.spacing.sm};
  font-size: ${theme2.typography.fontSize.md};
  line-height: ${theme2.typography.lineHeight.normal};
  outline: none;

  &:focus {
    background-color: ${theme2.colors.background.muted};
    color: ${theme2.colors.text.primary};
  }

  &[data-disabled] {
    pointer-events: none;
    opacity: 0.5;
  }

  svg:not([class*='text-']) {
    color: ${theme2.colors.text.secondary};
    pointer-events: none;
    flex-shrink: 0;

    &:not([class*='size-']) {
      width: 16px;
      height: 16px;
    }
  }

  span:last-child {
    display: flex;
    align-items: center;
    gap: ${theme2.spacing.sm};
  }
`;

const selectItemIndicator = css`
  position: absolute;
  right: ${theme2.spacing.sm};
  display: flex;
  width: 14px;
  height: 14px;
  align-items: center;
  justify-content: center;
`;

const selectSeparatorStyle = css`
  margin: ${theme2.spacing.xs} -${theme2.spacing.xs};
  height: 1px;
  background-color: ${theme2.colors.border.subtle};
  pointer-events: none;
`;

const scrollButtonStyle = css`
  display: flex;
  cursor: default;
  align-items: center;
  justify-content: center;
  padding: ${theme2.spacing.xs} 0;
`;

function Select({ ...props }: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function SelectGroup({ ...props }: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

function SelectValue({ ...props }: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

function SelectTrigger({
  className,
  size = 'default',
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: 'sm' | 'default';
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cx(selectTriggerBase, selectTriggerSizes[size], className)}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <UiIcon name="KeyboardArrowDown" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({
  className,
  children,
  position = 'popper',
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cx(selectContentBase, position === 'popper' && selectContentPopper, className)}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport className={cx(viewportBase, position === 'popper' && viewportPopper)}>
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return <SelectPrimitive.Label data-slot="select-label" className={cx(selectLabelStyle, className)} {...props} />;
}

function SelectItem({ className, children, ...props }: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item data-slot="select-item" className={cx(selectItemStyle, className)} {...props}>
      <span className={selectItemIndicator}>
        <SelectPrimitive.ItemIndicator>
          <UiIcon name="Check" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cx(selectSeparatorStyle, className)}
      {...props}
    />
  );
}

function SelectScrollUpButton({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cx(scrollButtonStyle, className)}
      {...props}
    >
      <UiIcon name="KeyboardArrowUp" />
    </SelectPrimitive.ScrollUpButton>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cx(scrollButtonStyle, className)}
      {...props}
    >
      <UiIcon name="KeyboardArrowDown" />
    </SelectPrimitive.ScrollDownButton>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
