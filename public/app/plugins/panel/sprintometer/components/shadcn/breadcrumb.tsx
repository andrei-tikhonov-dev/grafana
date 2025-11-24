import { css, cx } from '@emotion/css';
import { Slot } from '@radix-ui/react-slot';
import { ChevronRight, MoreHorizontal } from 'lucide-react';
import * as React from 'react';

import { theme3, typographyStyles } from '../../theme';

const breadcrumbListStyles = css`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${theme3.tailwind.spacing2};
  word-break: break-word;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const breadcrumbItemStyles = css`
  display: inline-flex;
  align-items: center;
  gap: ${theme3.tailwind.spacing};
`;

const breadcrumbLinkStyles = css`
  transition: color ${theme3.custom.transitionDurationNormal};
  color: ${theme3.custom.colorFontLight};
  &:hover {
    color: ${theme3.custom.colorFont};
  }

  ${typographyStyles.body}
`;

const breadcrumbPageStyles = css`
  ${typographyStyles.body}
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
      {children ?? <ChevronRight />}
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
      <MoreHorizontal className={ellipsisIconStyles} />
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
