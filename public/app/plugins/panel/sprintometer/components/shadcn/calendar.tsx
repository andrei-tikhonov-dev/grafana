import { css, cx } from '@emotion/css';
import * as React from 'react';
import { DayButton, DayPicker, getDefaultClassNames } from 'react-day-picker';

import { theme2 } from '../../theme/theme';
import { UiIcon } from '../ui';

import { Button } from './button';

const calendarStyles = css`
  background-color: ${theme2.colors.background.surface};
  padding: ${theme2.spacing.md};

  [data-slot='card-content'] & {
    background-color: transparent;
  }

  [data-slot='popover-content'] & {
    background-color: transparent;
  }
`;

const rootStyles = css`
  width: fit-content;
`;

const monthsStyles = css`
  display: flex;
  gap: ${theme2.spacing.lg};
  flex-direction: column;
  position: relative;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const monthStyles = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${theme2.spacing.lg};
`;

const navStyles = css`
  display: flex;
  align-items: center;
  gap: ${theme2.spacing.xs};
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  justify-content: space-between;
`;

const navButtonStyles = css`
  width: ${theme2.spacing['4xl']};
  height: ${theme2.spacing['4xl']};
  padding: 0;
  user-select: none;

  &[aria-disabled='true'] {
    opacity: 0.5;
  }
`;

const monthCaptionStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${theme2.spacing['4xl']};
  width: 100%;
  padding-left: ${theme2.spacing['4xl']};
  padding-right: ${theme2.spacing['4xl']};
`;

const dropdownsStyles = css`
  width: 100%;
  display: flex;
  align-items: center;
  font-size: ${theme2.typography.fontSize.md};
  font-weight: ${theme2.typography.fontWeight.medium};
  justify-content: center;
  height: ${theme2.spacing['4xl']};
  gap: 6px;
`;

const dropdownRootStyles = css`
  position: relative;
  border: 1px solid ${theme2.colors.border.default};
  box-shadow: ${theme2.shadows.xs};
  border-radius: ${theme2.radii.md};

  &:focus-within {
    border-color: ${theme2.colors.brand.primary};
    box-shadow: 0 0 0 3px rgba(238, 82, 46, 0.5);
  }
`;

const dropdownStyles = css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0;
`;

const captionLabelStyles = css`
  user-select: none;
  font-weight: ${theme2.typography.fontWeight.medium};
  font-size: ${theme2.typography.fontSize.md};
`;

const tableStyles = css`
  width: 100%;
  border-collapse: collapse;
`;

const weekdaysStyles = css`
  display: flex;
`;

const weekdayStyles = css`
  color: ${theme2.colors.text.secondary};
  border-radius: ${theme2.radii.md};
  flex: 1;
  font-weight: ${theme2.typography.fontWeight.regular};
  font-size: 12.8px;
  user-select: none;
`;

const weekStyles = css`
  display: flex;
  width: 100%;
  margin-top: ${theme2.spacing.sm};
`;

const weekNumberHeaderStyles = css`
  user-select: none;
  width: ${theme2.spacing['4xl']};
`;

const weekNumberStyles = css`
  font-size: 12.8px;
  user-select: none;
  color: ${theme2.colors.text.secondary};
`;

const dayStyles = css`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0;
  text-align: center;
  aspect-ratio: 1;
  user-select: none;

  &:first-child[data-selected='true'] button {
    border-top-left-radius: ${theme2.radii.md};
    border-bottom-left-radius: ${theme2.radii.md};
  }

  &:last-child[data-selected='true'] button {
    border-top-right-radius: ${theme2.radii.md};
    border-bottom-right-radius: ${theme2.radii.md};
  }
`;

const rangeStartStyles = css`
  border-top-left-radius: ${theme2.radii.md};
  border-bottom-left-radius: ${theme2.radii.md};
  background-color: ${theme2.colors.palette.lightBlue}1A;
`;

const rangeMiddleStyles = css`
  border-radius: 0;
`;

const rangeEndStyles = css`
  border-top-right-radius: ${theme2.radii.md};
  border-bottom-right-radius: ${theme2.radii.md};
  background-color: ${theme2.colors.palette.lightBlue}1A;
`;

const todayStyles = css`
  background-color: ${theme2.colors.palette.lightBlue}1A;
  color: ${theme2.colors.text.primary};
  border-radius: ${theme2.radii.md};

  &[data-selected='true'] {
    border-radius: 0;
  }
`;

const outsideStyles = css`
  color: ${theme2.colors.text.secondary};

  &[aria-selected='true'] {
    color: ${theme2.colors.text.secondary};
  }
`;

const disabledStyles = css`
  color: ${theme2.colors.text.secondary};
  opacity: 0.5;
`;

const hiddenStyles = css`
  visibility: hidden;
`;

const chevronStyles = css`
  width: 16px;
  height: 16px;
`;

const weekNumberCellStyles = css`
  display: flex;
  width: ${theme2.spacing['4xl']};
  height: ${theme2.spacing['4xl']};
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const dayButtonStyles = css`
  display: flex;
  aspect-ratio: 1;
  width: 100%;
  min-width: ${theme2.spacing['4xl']};
  flex-direction: column;
  gap: ${theme2.spacing.xs};
  line-height: 1;
  font-weight: ${theme2.typography.fontWeight.regular};

  &[data-selected-single='true'] {
    background-color: ${theme2.colors.brand.primary};
    color: ${theme2.colors.gray.white};
  }

  &[data-range-middle='true'] {
    background-color: ${theme2.colors.palette.lightBlue}1A;
    color: ${theme2.colors.text.primary};
  }

  &[data-range-start='true'] {
    background-color: ${theme2.colors.brand.primary};
    color: ${theme2.colors.gray.white};
    border-radius: ${theme2.radii.md};
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  &[data-range-end='true'] {
    background-color: ${theme2.colors.brand.primary};
    color: ${theme2.colors.gray.white};
    border-radius: ${theme2.radii.md};
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  .day[data-focused='true'] & {
    position: relative;
    z-index: 10;
    border-color: ${theme2.colors.brand.primary};
    box-shadow: 0 0 0 3px rgba(238, 82, 46, 0.5);
  }

  &:hover {
    color: ${theme2.colors.text.primary};
  }

  & > span {
    font-size: ${theme2.typography.fontSize.sm};
    opacity: 0.7;
  }
`;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = 'label',
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cx(calendarStyles, className)}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) => date.toLocaleString('default', { month: 'short' }),
        ...formatters,
      }}
      classNames={{
        root: cx(rootStyles, defaultClassNames.root),
        months: cx(monthsStyles, defaultClassNames.months),
        month: cx(monthStyles, defaultClassNames.month),
        nav: cx(navStyles, defaultClassNames.nav),
        button_previous: cx(navButtonStyles, defaultClassNames.button_previous),
        button_next: cx(navButtonStyles, defaultClassNames.button_next),
        month_caption: cx(monthCaptionStyles, defaultClassNames.month_caption),
        dropdowns: cx(dropdownsStyles, defaultClassNames.dropdowns),
        dropdown_root: cx(dropdownRootStyles, defaultClassNames.dropdown_root),
        dropdown: cx(dropdownStyles, defaultClassNames.dropdown),
        caption_label: cx(captionLabelStyles, defaultClassNames.caption_label),
        table: tableStyles,
        weekdays: cx(weekdaysStyles, defaultClassNames.weekdays),
        weekday: cx(weekdayStyles, defaultClassNames.weekday),
        week: cx(weekStyles, defaultClassNames.week),
        week_number_header: cx(weekNumberHeaderStyles, defaultClassNames.week_number_header),
        week_number: cx(weekNumberStyles, defaultClassNames.week_number),
        day: cx(dayStyles, defaultClassNames.day),
        range_start: cx(rangeStartStyles, defaultClassNames.range_start),
        range_middle: cx(rangeMiddleStyles, defaultClassNames.range_middle),
        range_end: cx(rangeEndStyles, defaultClassNames.range_end),
        today: cx(todayStyles, defaultClassNames.today),
        outside: cx(outsideStyles, defaultClassNames.outside),
        disabled: cx(disabledStyles, defaultClassNames.disabled),
        hidden: cx(hiddenStyles, defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return <div data-slot="calendar" ref={rootRef} className={cx(className)} {...props} />;
        },
        Chevron: ({ className, orientation, size, ...props }) => {
          if (orientation === 'left') {
            return <UiIcon name="ChevronLeft" className={cx(chevronStyles, className)} {...props} />;
          }

          if (orientation === 'right') {
            return <UiIcon name="ChevronRight" className={cx(chevronStyles, className)} {...props} />;
          }

          return <UiIcon name="KeyboardArrowDown" className={cx(chevronStyles, className)} {...props} />;
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className={weekNumberCellStyles}>{children}</div>
            </td>
          );
        },
        ...components,
      }}
      {...props}
    />
  );
}

function CalendarDayButton({ className, day, modifiers, ...props }: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames();

  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) {
      ref.current?.focus();
    }
  }, [modifiers.focused]);

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cx(dayButtonStyles, defaultClassNames.day, className)}
      {...props}
    />
  );
}

export { Calendar, CalendarDayButton };
