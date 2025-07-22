import { css } from '@emotion/css';
import * as React from 'react';

import { Button } from '../../../components/shadcn/button';
import { Calendar } from '../../../components/shadcn/calendar';
import { Input } from '../../../components/shadcn/input';
import { Label } from '../../../components/shadcn/label';
import { Popover, PopoverContent, PopoverTrigger } from '../../../components/shadcn/popover';
import { UiIcon } from '../../../components/ui';
import { theme2 } from '../../../theme/theme';

const containerStyles = css`
  display: flex;
  flex-direction: column;
  gap: ${theme2.spacing.md};
`;

const labelStyles = css`
  padding-left: ${theme2.spacing.xs};
  padding-right: ${theme2.spacing.xs};
`;

const inputWrapperStyles = css`
  position: relative;
  display: flex;
  gap: ${theme2.spacing.sm};
`;

const inputStyles = css`
  background-color: ${theme2.colors.background.surface};
  padding-right: ${theme2.spacing['5xl']};
`;

const buttonStyles = css`
  position: absolute;
  top: 50%;
  right: ${theme2.spacing.sm};
  width: ${theme2.spacing['2xl']};
  height: ${theme2.spacing['2xl']};
  transform: translateY(-50%);
`;

const iconStyles = css`
  width: 14px;
  height: 14px;
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
  border-width: 0;
`;

const popoverContentStyles = css`
  width: auto;
  overflow: hidden;
  padding: 0;
`;

function formatDate(date: Date | undefined) {
  if (!date) {
    return '';
  }
  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

function isValidDate(date: Date | undefined) {
  if (!date) {
    return false;
  }
  return !isNaN(date.getTime());
}

export function DatePickerExample() {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(new Date('2025-06-01'));
  const [month, setMonth] = React.useState<Date | undefined>(date);
  const [value, setValue] = React.useState(formatDate(date));

  return (
    <div className={containerStyles}>
      <Label htmlFor="date" className={labelStyles}>
        Subscription Date
      </Label>
      <div className={inputWrapperStyles}>
        <Input
          id="date"
          value={value}
          placeholder="June 01, 2025"
          className={inputStyles}
          onChange={(e) => {
            const date = new Date(e.target.value);
            setValue(e.target.value);
            if (isValidDate(date)) {
              setDate(date);
              setMonth(date);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              setOpen(true);
            }
          }}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button id="date-picker" variant="ghost" className={buttonStyles}>
              <UiIcon name="CalendarMonth" className={iconStyles} />
              <span className={srOnlyStyles}>Select date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className={popoverContentStyles} align="end" alignOffset={-8} sideOffset={10}>
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={(date) => {
                setDate(date);
                setValue(formatDate(date));
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
