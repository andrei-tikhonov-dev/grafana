import { css, cx } from '@emotion/css';
import * as React from 'react';

import { theme3 } from '../../../theme/theme';
import { Button } from '../../shadcn/button';
import { Popover, PopoverContent, PopoverTrigger } from '../../shadcn/popover';
import { Separator } from '../../shadcn/separator';
import { UiEllipsis, UiIcon } from '../index';

const styles = {
  triggerButton: css`
    display: flex;
    min-height: 40px;
    height: auto;
    align-items: center;
    justify-content: space-between;
    border: 1px solid ${theme3.shadcn.border};
    padding: ${theme3.tailwind.spacing} ${theme3.tailwind.spacing} ${theme3.tailwind.spacing}
      calc(${theme3.tailwind.spacing} * 4);
    max-width: ${theme3.tailwind.container2xl};

    &:hover {
      background-color: ${theme3.shadcn.background} !important;
    }

    & svg {
      pointer-events: auto;
    }
  `,

  selectedValuesContainer: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: auto;
    overflow: hidden;
  `,

  badgeWrapper: css`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    width: auto;
    overflow: hidden;
  `,

  actionIconsContainer: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,

  clearIcon: css`
    margin-left: 8px;
    margin-right: 8px;
    cursor: pointer;
    color: ${theme3.shadcn.mutedForeground};
  `,

  separator: css`
    display: flex;
    min-height: 24px;
    height: 100%;
  `,

  chevronIcon: css`
    margin-left: 8px;
    margin-right: 8px;
    cursor: pointer;
    color: ${theme3.shadcn.mutedForeground};
  `,

  placeholderContainer: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
  `,

  placeholderText: css`
    font-size: ${theme3.tailwind.textSm};
    color: ${theme3.shadcn.mutedForeground};
    margin-left: 12px;
    margin-right: 12px;
  `,

  chevronPlaceholder: css`
    height: 16px;
    cursor: pointer;
    color: ${theme3.shadcn.mutedForeground};
    margin-left: 8px;
    margin-right: 8px;
  `,

  popoverContent: css`
    width: 500px;
    padding: 0;
  `,

  columnsContainer: css`
    display: flex;
    height: 300px;
    overflow: hidden;
  `,

  column: css`
    flex: 1;
    display: flex;
    flex-direction: column;
    border-right: 1px solid ${theme3.shadcn.border};

    &:last-child {
      border-right: none;
    }
  `,

  columnHeader: css`
    padding: 12px;
    font-weight: 600;
    border-bottom: 1px solid ${theme3.shadcn.border};
    font-size: ${theme3.tailwind.textSm};
    color: ${theme3.shadcn.mutedForeground};
    text-align: center;
    flex-shrink: 0;
  `,

  columnContent: css`
    flex: 1;
    overflow-y: auto;
    padding: 4px 0;
  `,

  optionItem: css`
    cursor: pointer;
    margin: 0 4px;
    border-radius: 4px;
    padding: 8px 12px;
    font-size: ${theme3.tailwind.textSm};

    &:hover {
      background-color: ${theme3.shadcn.accent};
      color: ${theme3.shadcn.accentForeground};
    }
  `,

  selectedOptionItem: css`
    background-color: ${theme3.custom.colorPrimary};
    color: ${theme3.shadcn.primaryForeground};

    &:hover {
      background-color: ${theme3.custom.colorPrimary};
      color: ${theme3.shadcn.primaryForeground};
    }
  `,

  rangeOptionItem: css`
    background-color: #fef3c7;
    color: #92400e;

    &:hover {
      background-color: #fde68a;
      color: #92400e;
    }
  `,

  disabledOptionItem: css`
    text-decoration: line-through;
    cursor: not-allowed;
    margin: 0 4px;
    border-radius: 4px;
    padding: 8px 12px;
    font-size: ${theme3.tailwind.textSm};
    background-color: ${theme3.shadcn.muted};
    color: ${theme3.shadcn.mutedForeground};
    opacity: 0.5;

    &:hover {
      background-color: ${theme3.shadcn.muted};
      color: ${theme3.shadcn.mutedForeground};
    }
  `,

  actionButtonsContainer: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid ${theme3.shadcn.border};
  `,

  applyButton: css`
    flex: 1;
    justify-content: center;
    cursor: pointer;
    border-radius: 0;
    padding: 12px;
    border: none;
    background: none;
    font-size: ${theme3.tailwind.textSm};

    &:hover {
      background-color: ${theme3.shadcn.accent};
      color: ${theme3.shadcn.accentForeground};
    }
  `,

  closeButton: css`
    flex: 1;
    justify-content: center;
    cursor: pointer;
    border-radius: 0;
    padding: 12px;
    border: none;
    background: none;
    font-size: ${theme3.tailwind.textSm};

    &:hover {
      background-color: ${theme3.shadcn.accent};
      color: ${theme3.shadcn.accentForeground};
    }
  `,
};
interface PeriodSelectOption {
  label: string;
  value: string;
}

interface PeriodSelectState {
  startValue: string | null;
  endValue: string | null;
  tempStartValue: string | null;
  tempEndValue: string | null;
  isPopoverOpen: boolean;
}

interface UsePeriodSelectProps {
  options: PeriodSelectOption[];
  defaultValue?: string[];
  onValueChange: (value: string[]) => void;
}

const usePeriodSelect = ({ options, defaultValue = [], onValueChange }: UsePeriodSelectProps) => {
  const [state, setState] = React.useState<PeriodSelectState>({
    startValue: defaultValue[0] || null,
    endValue: defaultValue[1] || null,
    tempStartValue: defaultValue[0] || null,
    tempEndValue: defaultValue[1] || null,
    isPopoverOpen: false,
  });

  const getOptionLabel = React.useCallback(
    (value: string) => options.find((option) => option.value === value)?.label || value,
    [options]
  );

  const getOptionIndex = React.useCallback(
    (value: string) => options.findIndex((option) => option.value === value),
    [options]
  );

  const isOptionDisabled = React.useCallback(
    (optionValue: string, columnType: 'start' | 'end') => {
      const optionIndex = getOptionIndex(optionValue);

      if (columnType === 'start') {
        if (state.tempEndValue) {
          const tempEndIndex = getOptionIndex(state.tempEndValue);
          return optionIndex >= tempEndIndex;
        }
      } else {
        if (state.tempStartValue) {
          const tempStartIndex = getOptionIndex(state.tempStartValue);
          return optionIndex <= tempStartIndex;
        }
      }

      return false;
    },
    [state.tempStartValue, state.tempEndValue, getOptionIndex]
  );

  const isOptionInRange = React.useCallback(
    (optionValue: string) => {
      if (!state.tempStartValue || !state.tempEndValue) {
        return false;
      }

      const optionIndex = getOptionIndex(optionValue);
      const startIndex = getOptionIndex(state.tempStartValue);
      const endIndex = getOptionIndex(state.tempEndValue);

      return optionIndex >= startIndex && optionIndex <= endIndex;
    },
    [state.tempStartValue, state.tempEndValue, getOptionIndex]
  );

  const selectOption = React.useCallback(
    (optionValue: string, columnType: 'start' | 'end') => {
      if (isOptionDisabled(optionValue, columnType)) {
        return;
      }

      setState((prev) => {
        const { tempStartValue, tempEndValue } = prev;
        let newTempStartValue = tempStartValue;
        let newTempEndValue = tempEndValue;

        if (columnType === 'start') {
          if (optionValue === tempStartValue) {
            newTempStartValue = null;
          } else {
            newTempStartValue = optionValue;
          }
        } else {
          if (optionValue === tempEndValue) {
            newTempEndValue = null;
          } else {
            newTempEndValue = optionValue;
          }
        }

        return { ...prev, tempStartValue: newTempStartValue, tempEndValue: newTempEndValue };
      });
    },
    [isOptionDisabled]
  );

  const applySelection = React.useCallback(() => {
    setState((prev) => {
      let finalStartValue = prev.tempStartValue;
      let finalEndValue = prev.tempEndValue;

      if (finalStartValue && !finalEndValue) {
        finalEndValue = options[options.length - 1]?.value || null;
      } else if (!finalStartValue && finalEndValue) {
        finalStartValue = options[0]?.value || null;
      }

      const newSelectedValues = [finalStartValue, finalEndValue].filter(Boolean) as string[];
      onValueChange(newSelectedValues);

      return {
        ...prev,
        startValue: finalStartValue,
        endValue: finalEndValue,
        tempStartValue: finalStartValue,
        tempEndValue: finalEndValue,
        isPopoverOpen: false,
      };
    });
  }, [onValueChange, options]);

  const clearAll = React.useCallback(() => {
    setState((prev) => ({
      ...prev,
      startValue: null,
      endValue: null,
      tempStartValue: null,
      tempEndValue: null,
    }));
    onValueChange([]);
  }, [onValueChange]);

  const togglePopover = React.useCallback(() => {
    setState((prev) => ({ ...prev, isPopoverOpen: !prev.isPopoverOpen }));
  }, []);

  const setPopoverOpen = React.useCallback((open: boolean) => {
    setState((prev) => {
      if (open) {
        return {
          ...prev,
          isPopoverOpen: open,
          tempStartValue: prev.startValue,
          tempEndValue: prev.endValue,
        };
      }
      return { ...prev, isPopoverOpen: open };
    });
  }, []);

  return {
    state,
    selectOption,
    applySelection,
    clearAll,
    togglePopover,
    setPopoverOpen,
    getOptionLabel,
    isOptionDisabled,
    isOptionInRange,
  };
};

interface TriggerContentProps {
  startValue: string | null;
  endValue: string | null;
  placeholder: string;
  getOptionLabel: (value: string) => string;
  onClearAll: () => void;
}

const TriggerContent: React.FC<TriggerContentProps> = ({
  startValue,
  endValue,
  placeholder,
  getOptionLabel,
  onClearAll,
}) => {
  if (!startValue && !endValue) {
    return (
      <div className={styles.placeholderContainer}>
        <span className={styles.placeholderText}>{placeholder}</span>
        <UiIcon name="KeyboardArrowDown" className={styles.chevronPlaceholder} />
      </div>
    );
  }

  return (
    <div className={styles.selectedValuesContainer}>
      <div className={styles.badgeWrapper}>
        <UiEllipsis>
          {getOptionLabel(startValue!)} - {getOptionLabel(endValue!)}
        </UiEllipsis>
      </div>
      <div className={styles.actionIconsContainer}>
        <UiIcon
          name="CloseSmall"
          size="sm"
          className={styles.clearIcon}
          onClick={(event) => {
            event.stopPropagation();
            onClearAll();
          }}
          aria-label="Clear period selection"
        />
        <Separator orientation="vertical" className={styles.separator} />
        <UiIcon name="KeyboardArrowDown" size="sm" className={styles.chevronIcon} />
      </div>
    </div>
  );
};

interface OptionListProps {
  options: PeriodSelectOption[];
  tempStartValue: string | null;
  tempEndValue: string | null;
  onSelectOption: (value: string, columnType: 'start' | 'end') => void;
  onApply: () => void;
  onCancel: () => void;
  isOptionDisabled: (value: string, columnType: 'start' | 'end') => boolean;
  isOptionInRange: (value: string) => boolean;
}

const OptionList: React.FC<OptionListProps> = ({
  options,
  tempStartValue,
  tempEndValue,
  onSelectOption,
  onApply,
  onCancel,
  isOptionDisabled,
  isOptionInRange,
}) => {
  const hasSelection = tempStartValue || tempEndValue;

  return (
    <div>
      <div className={styles.columnsContainer}>
        <div className={styles.column}>
          <div className={styles.columnHeader}>From</div>
          <div className={styles.columnContent}>
            {options
              .filter((option) => !isOptionDisabled(option.value, 'start'))
              .map((option) => {
                const isSelectedAsStart = option.value === tempStartValue;
                const isInRange = isOptionInRange(option.value);

                return (
                  <div
                    key={`from-${option.value}`}
                    onClick={() => onSelectOption(option.value, 'start')}
                    className={cx(
                      styles.optionItem,
                      isSelectedAsStart && styles.selectedOptionItem,
                      isInRange && !isSelectedAsStart && styles.rangeOptionItem
                    )}
                  >
                    <span>{option.label}</span>
                  </div>
                );
              })}
          </div>
        </div>

        <div className={styles.column}>
          <div className={styles.columnHeader}>To</div>
          <div className={styles.columnContent}>
            {options
              .filter((option) => !isOptionDisabled(option.value, 'end'))
              .map((option) => {
                const isSelectedAsEnd = option.value === tempEndValue;
                const isInRange = isOptionInRange(option.value);

                return (
                  <div
                    key={`to-${option.value}`}
                    onClick={() => onSelectOption(option.value, 'end')}
                    className={cx(
                      styles.optionItem,
                      isSelectedAsEnd && styles.selectedOptionItem,
                      isInRange && !isSelectedAsEnd && styles.rangeOptionItem
                    )}
                  >
                    <span>{option.label}</span>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      <div className={styles.actionButtonsContainer}>
        {hasSelection && (
          <>
            <button onClick={onApply} className={styles.applyButton}>
              Apply
            </button>
            <Separator orientation="vertical" className={styles.separator} />
          </>
        )}
        <button onClick={onCancel} className={styles.closeButton}>
          Cancel
        </button>
      </div>
    </div>
  );
};

interface PeriodSelectProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  options: PeriodSelectOption[];
  onValueChange: (value: string[]) => void;
  defaultValue?: string[];
  placeholder?: string;
  modalPopover?: boolean;
  asChild?: boolean;
}

export const UiPeriodSelect = React.forwardRef<HTMLButtonElement, PeriodSelectProps>(
  (
    {
      options,
      onValueChange,
      defaultValue = [],
      placeholder = 'Select period',
      modalPopover = false,
      asChild = false,
      className,
      ...props
    },
    ref
  ) => {
    const periodSelect = usePeriodSelect({
      options,
      defaultValue,
      onValueChange,
    });

    return (
      <Popover open={periodSelect.state.isPopoverOpen} onOpenChange={periodSelect.setPopoverOpen} modal={modalPopover}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            {...props}
            onClick={periodSelect.togglePopover}
            className={cx(styles.triggerButton, className)}
            variant="outline"
          >
            <TriggerContent
              startValue={periodSelect.state.startValue}
              endValue={periodSelect.state.endValue}
              placeholder={placeholder}
              getOptionLabel={periodSelect.getOptionLabel}
              onClearAll={periodSelect.clearAll}
            />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className={styles.popoverContent}
          align="start"
          onEscapeKeyDown={() => periodSelect.setPopoverOpen(false)}
        >
          <OptionList
            options={options}
            tempStartValue={periodSelect.state.tempStartValue}
            tempEndValue={periodSelect.state.tempEndValue}
            onSelectOption={periodSelect.selectOption}
            onApply={periodSelect.applySelection}
            onCancel={() => periodSelect.setPopoverOpen(false)}
            isOptionDisabled={periodSelect.isOptionDisabled}
            isOptionInRange={periodSelect.isOptionInRange}
          />
        </PopoverContent>
      </Popover>
    );
  }
);

UiPeriodSelect.displayName = 'PeriodSelect';
