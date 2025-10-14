import { CalendarArrowUp } from 'lucide-react';
import * as React from 'react';

import { UiPeriodBadge } from '../../../components/ui';

interface PlannedForBadgeProps {
  plannedFor: string;
  showIcon?: boolean;
  showLabel?: boolean;
  label?: string;
  className?: string;
}

export function PlannedForBadge({
  plannedFor,
  showIcon = true,
  showLabel = true,
  label = 'Planned for:',
  className,
}: PlannedForBadgeProps) {
  return (
    <UiPeriodBadge className={className}>
      {showIcon && <CalendarArrowUp size={12} />}
      {showLabel ? `${label} ${plannedFor}` : plannedFor}
    </UiPeriodBadge>
  );
}
