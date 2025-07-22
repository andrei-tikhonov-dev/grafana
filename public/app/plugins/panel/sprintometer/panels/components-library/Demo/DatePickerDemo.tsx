import { css } from '@emotion/css';
import { format } from 'date-fns';
import * as React from 'react';

import { Button } from '../../../components/shadcn/button';
import { Calendar } from '../../../components/shadcn/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../../../components/shadcn/popover';
import { UiIcon } from '../../../components/ui';
import { theme2 } from '../../../theme/theme';

const buttonStyles = css`
  width: 280px;
  justify-content: flex-start;
  text-align: left;
  font-weight: ${theme2.typography.fontWeight.regular};

  &[data-empty='true'] {
    color: ${theme2.colors.gray.neutral};
  }
`;

const iconStyles = css`
  margin-right: ${theme2.spacing.sm};
  height: 16px;
  width: 16px;
`;

const popoverContentStyles = css`
  width: auto;
  padding: 0;
`;

export function DatePickerDemo() {
  const [date, setDate] = React.useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" data-empty={!date} className={buttonStyles}>
          <UiIcon name="CalendarMonth" className={iconStyles} />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className={popoverContentStyles}>
        <Calendar mode="single" selected={date} onSelect={setDate} />
      </PopoverContent>
    </Popover>
  );
}
