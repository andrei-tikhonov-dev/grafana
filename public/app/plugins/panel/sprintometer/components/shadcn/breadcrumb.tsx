import { css, cx } from '@emotion/css';
import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';

import { theme2 } from '../../theme/theme';
import { UiIcon } from '../ui';

const breadcrumbListStyles = css`
  color: ${theme2.colors.text.secondary};
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  font-size: ${theme2.typography.fontSize.sm};
  word-break: break-word;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const breadcrumbItemStyles = css`
  display: inline-flex;
  align-items: center;
  gap: 6px;
`;

const breadcrumbLinkStyles = css`
  color: ${theme2.colors.text.secondary};
  transition: color ${theme2.transitions.duration.normal};

  &:hover {
    color: ${theme2.colors.text.primary};
  }
`;

const breadcrumbPageStyles = css`
  color: ${theme2.colors.text.primary};
  font-weight: ${theme2.typography.fontWeight.regular};
`;

const breadcrumbSeparatorStyles = css`
  display: flex;
  & > svg {
    width: 14px;
    height: 14px;
  }
`;

const breadcrumbEllipsisStyles = css`
  display: flex;
  width: 36px;
  height: 36px;
  align-items: center;
  justify-content: center;
`;

const ellipsisIconStyles = css`
  width: 16px;
  height: 16px;
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

function Breadcrumb({ ...props }: React.ComponentProps<'nav'>) {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />;
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<'ol'>) {
  return <ol data-slot="breadcrumb-list" className={cx(breadcrumbListStyles, className)} {...props} />;
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<'li'>) {
  return <li data-slot="breadcrumb-item" className={cx(breadcrumbItemStyles, className)} {...props} />;
}

function BreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<'a'> & {
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot : 'a';

  return <Comp data-slot="breadcrumb-link" className={cx(breadcrumbLinkStyles, className)} {...props} />;
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cx(breadcrumbPageStyles, className)}
      {...props}
    />
  );
}

function BreadcrumbSeparator({ children, className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cx(breadcrumbSeparatorStyles, className)}
      {...props}
    >
      {children ?? <UiIcon name="KeyboardArrowRight" />}
    </li>
  );
}

function BreadcrumbEllipsis({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cx(breadcrumbEllipsisStyles, className)}
      {...props}
    >
      <UiIcon name="MoreHoriz" className={ellipsisIconStyles} />
      <span className={srOnlyStyles}>More</span>
    </span>
  );
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
