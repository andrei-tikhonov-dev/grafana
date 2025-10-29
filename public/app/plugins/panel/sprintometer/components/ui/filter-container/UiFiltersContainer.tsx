import * as React from 'react';

import { UiHorizontalGroup } from '../group/UiHorizontalGroup';

interface UiFiltersContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  suffix?: React.ReactNode;
}

export function UiFiltersContainer({ children, suffix, className }: UiFiltersContainerProps) {
  return (
    <UiHorizontalGroup justify="space-between" className={className}>
      <UiHorizontalGroup>{children}</UiHorizontalGroup>
      <UiHorizontalGroup>{suffix}</UiHorizontalGroup>
    </UiHorizontalGroup>
  );
}
