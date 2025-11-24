import * as React from 'react';

import { TBreadcrumbItem } from '../../../types';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../../shadcn/breadcrumb';
import { UiEllipsis } from '../ellipsis/UiEllipsis';

interface UiBreadcrumbsProps {
  items: TBreadcrumbItem[];
  maxDisplayItems?: number;
}

export function UiBreadcrumbs({ items, maxDisplayItems = 3 }: UiBreadcrumbsProps) {
  if (items.length === 0) {
    return null;
  }

  const [firstItem, ...restItems] = items;
  const visibleItems = restItems.slice(-(maxDisplayItems - 1));

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href={firstItem.url}>
            <UiEllipsis>{firstItem.label}</UiEllipsis>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {visibleItems.length > 0 && <BreadcrumbSeparator />}

        {visibleItems.map((item, index) => {
          const isLast = index === visibleItems.length - 1;

          return (
            <React.Fragment key={`${item.label}-${index}`}>
              <BreadcrumbItem>
                {item.url ? (
                  <BreadcrumbLink href={item.url}>
                    <UiEllipsis>{item.label}</UiEllipsis>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>
                    <UiEllipsis>{item.label}</UiEllipsis>
                  </BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
