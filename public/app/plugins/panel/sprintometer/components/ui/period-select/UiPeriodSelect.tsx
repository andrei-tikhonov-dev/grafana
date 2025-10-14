import { css, cx } from '@emotion/css';
import * as React from 'react';

import { theme3 } from '../../../theme/theme';
import { TPeriod } from '../../../types';
import { formatFullDate, formatFullPeriod } from '../../../utils/dateTime';
import { Button } from '../../shadcn/button';
import { Popover, PopoverContent, PopoverTrigger } from '../../shadcn/popover';
import { Separator } from '../../shadcn/separator';
import { UiButton, UiEllipsis, UiIcon, UiPeriodBadge } from '../index';

const styles = {
  triggerButton: css`
    display: flex;
    min-height: 40px;
    height: auto;
    align-items: center;
    justify-content: space-between;
    border: 1px solid ${theme3.shadcn.border};
    padding: ${theme3.tailwind.spacing} ${theme3.tailwind.spacing} ${theme3.tailwind.spacing}
      ${theme3.tailwind.spacing4};
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

  outputWrapper: css`
    display: flex;
    gap: ${theme3.tailwind.spacing2};
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
    margin: 0 8px;
    cursor: pointer;
    color: ${theme3.shadcn.mutedForeground};
  `,

  chevronIcon: css`
    margin: 0 8px;
    cursor: pointer;
    color: ${theme3.shadcn.mutedForeground};
  `,

  separator: css`
    display: flex;
    min-height: 24px;
    height: 100%;
  `,

  placeholderContainer: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin: 0 auto;
  `,

  placeholderText: css`
    font-size: ${theme3.tailwind.textSm};
    color: ${theme3.shadcn.mutedForeground};
    margin: 0 12px;
  `,

  popoverContent: css`
    width: 55rem;
    padding: 0;
  `,

  columnsContainer: css`
    display: flex;
    height: 25rem;
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

  presetColumn: css`
    flex: 0.6;
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
    display: flex;
    flex-direction: column;
    gap: ${theme3.tailwind.spacing};
    overflow-y: auto;
    padding: 4px 0;
  `,

  optionItem: css`
    display: flex;
    flex-direction: column;
    gap: ${theme3.tailwind.spacing2};
    cursor: pointer;
    margin: 0 4px;
    border-radius: 4px;
    padding: 8px 12px;
    font-size: ${theme3.tailwind.textSm};
    transition: all 0.2s ease-in-out;

    &:hover {
      background-color: ${theme3.shadcn.accent};
      color: ${theme3.shadcn.accentForeground};
    }
  `,

  presetItem: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4px;
    cursor: pointer;
    margin: 0 4px;
    border-radius: 4px;
    padding: 12px 8px;
    font-size: ${theme3.tailwind.textSm};
    transition: all 0.2s ease-in-out;
    text-align: center;

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
    padding: ${theme3.tailwind.spacing2};
    gap: ${theme3.tailwind.spacing4};
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid ${theme3.shadcn.border};
  `,

  applyButton: css`
    flex: 1;
  `,

  closeButton: css`
    flex: 1;
  `,
};

type ColumnType = 'start' | 'end';

interface PeriodSelectOption {
  label: string;
  value: string;
  period?: TPeriod;
}

interface PresetOption {
  label: string;
  count: number | 'all';
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
  presets?: number[];
}

interface TriggerContentProps {
  startValue: string | null;
  endValue: string | null;
  placeholder: string;
  getOptionLabel: (value: string) => string;
  formatOverallPeriod: (startValue: string, endValue: string) => string | null;
  onClearAll: () => void;
}

interface OptionListProps {
  options: PeriodSelectOption[];
  tempStartValue: string | null;
  tempEndValue: string | null;
  onSelectOption: (value: string, columnType: ColumnType) => void;
  onSelectPreset: (count: number | 'all') => void;
  onApply: () => void;
  onCancel: () => void;
  isOptionDisabled: (value: string, columnType: ColumnType) => boolean;
  isOptionInRange: (value: string) => boolean;
  formatPeriod: (period: TPeriod) => string;
  presets: number[];
}

interface PeriodSelectProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  options: PeriodSelectOption[];
  onValueChange: (value: string[]) => void;
  defaultValue?: string[];
  placeholder?: string;
  modalPopover?: boolean;
  asChild?: boolean;
  presets?: number[];
}

const createInitialState = (defaultValue: string[]): PeriodSelectState => ({
  startValue: defaultValue[0] || null,
  endValue: defaultValue[1] || null,
  tempStartValue: defaultValue[0] || null,
  tempEndValue: defaultValue[1] || null,
  isPopoverOpen: false,
});

const filterNonEmpty = <T,>(array: Array<T | null | undefined>): T[] => array.filter((item): item is T => item != null);

const createPresetOptions = (presets: number[]): PresetOption[] => {
  const presetOptions: PresetOption[] = presets.map((count) => ({
    label: `First ${count} periods`,
    count: count,
  }));

  presetOptions.push({
    label: 'All periods',
    count: 'all',
  });

  return presetOptions;
};

const usePeriodSelect = ({ options, defaultValue = [], onValueChange, presets = [3, 5, 10] }: UsePeriodSelectProps) => {
  const [state, setState] = React.useState<PeriodSelectState>(() => createInitialState(defaultValue));

  const optionUtils = React.useMemo(() => {
    const getOptionLabel = (value: string): string => options.find((option) => option.value === value)?.label || value;

    const getOption = (value: string): PeriodSelectOption | undefined =>
      options.find((option) => option.value === value);

    const getOptionIndex = (value: string): number => options.findIndex((option) => option.value === value);

    return { getOptionLabel, getOption, getOptionIndex };
  }, [options]);

  const isOptionDisabled = React.useCallback(
    (optionValue: string, columnType: ColumnType): boolean => {
      const optionIndex = optionUtils.getOptionIndex(optionValue);

      if (columnType === 'start' && state.tempEndValue) {
        const tempEndIndex = optionUtils.getOptionIndex(state.tempEndValue);
        return optionIndex >= tempEndIndex;
      }

      if (columnType === 'end' && state.tempStartValue) {
        const tempStartIndex = optionUtils.getOptionIndex(state.tempStartValue);
        return optionIndex <= tempStartIndex;
      }

      return false;
    },
    [state.tempStartValue, state.tempEndValue, optionUtils]
  );

  const isOptionInRange = React.useCallback(
    (optionValue: string): boolean => {
      if (!state.tempStartValue || !state.tempEndValue) {
        return false;
      }

      const optionIndex = optionUtils.getOptionIndex(optionValue);
      const startIndex = optionUtils.getOptionIndex(state.tempStartValue);
      const endIndex = optionUtils.getOptionIndex(state.tempEndValue);

      return optionIndex >= startIndex && optionIndex <= endIndex;
    },
    [state.tempStartValue, state.tempEndValue, optionUtils]
  );

  const formatOverallPeriod = React.useCallback(
    (startValue: string, endValue: string): string | null => {
      const startOption = optionUtils.getOption(startValue);
      const endOption = optionUtils.getOption(endValue);

      if (startOption?.period && endOption?.period) {
        const startDate = formatFullDate(startOption.period.startDate);
        const endDate = formatFullDate(endOption.period.endDate);
        return `${startDate} – ${endDate}`;
      }

      return null;
    },
    [optionUtils]
  );

  const formatPeriod = React.useCallback((period: TPeriod): string => {
    return formatFullPeriod(period);
  }, []);

  const selectOption = React.useCallback(
    (optionValue: string, columnType: ColumnType): void => {
      if (isOptionDisabled(optionValue, columnType)) {
        return;
      }

      setState((prev) => {
        const updates: Partial<PeriodSelectState> = {};

        if (columnType === 'start') {
          updates.tempStartValue = optionValue === prev.tempStartValue ? null : optionValue;
        } else {
          updates.tempEndValue = optionValue === prev.tempEndValue ? null : optionValue;
        }

        return { ...prev, ...updates };
      });
    },
    [isOptionDisabled]
  );

  const selectPreset = React.useCallback(
    (count: number | 'all'): void => {
      setState((prev) => {
        if (options.length === 0) {
          return prev;
        }

        const startValue = options[0].value;
        let endValue: string;

        if (count === 'all') {
          endValue = options[options.length - 1].value;
        } else {
          const endIndex = Math.min(count - 1, options.length - 1);
          endValue = options[endIndex].value;
        }

        return {
          ...prev,
          tempStartValue: startValue,
          tempEndValue: endValue,
        };
      });
    },
    [options]
  );

  const applySelection = React.useCallback((): void => {
    setState((prev) => {
      let finalStartValue = prev.tempStartValue;
      let finalEndValue = prev.tempEndValue;

      if (finalStartValue && !finalEndValue) {
        finalEndValue = options[options.length - 1]?.value || null;
      } else if (!finalStartValue && finalEndValue) {
        finalStartValue = options[0]?.value || null;
      }

      const newSelectedValues = filterNonEmpty([finalStartValue, finalEndValue]);
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

  const clearAll = React.useCallback((): void => {
    setState((prev) => ({
      ...prev,
      startValue: null,
      endValue: null,
      tempStartValue: null,
      tempEndValue: null,
    }));
    onValueChange([]);
  }, [onValueChange]);

  const togglePopover = React.useCallback((): void => {
    setState((prev) => ({ ...prev, isPopoverOpen: !prev.isPopoverOpen }));
  }, []);

  const setPopoverOpen = React.useCallback((open: boolean): void => {
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
    selectPreset,
    applySelection,
    clearAll,
    togglePopover,
    setPopoverOpen,
    isOptionDisabled,
    isOptionInRange,
    formatOverallPeriod,
    formatPeriod,
    presets,
    ...optionUtils,
  };
};

const TriggerContent: React.FC<TriggerContentProps> = React.memo(
  ({ startValue, endValue, placeholder, getOptionLabel, formatOverallPeriod, onClearAll }) => {
    const handleClearClick = React.useCallback(
      (event: React.MouseEvent) => {
        event.stopPropagation();
        onClearAll();
      },
      [onClearAll]
    );

    if (!startValue && !endValue) {
      return (
        <div className={styles.placeholderContainer}>
          <span className={styles.placeholderText}>{placeholder}</span>
          <UiIcon name="KeyboardArrowDown" className={styles.chevronIcon} />
        </div>
      );
    }

    const overallPeriod = startValue && endValue ? formatOverallPeriod(startValue, endValue) : null;

    return (
      <div className={styles.selectedValuesContainer}>
        <div className={styles.outputWrapper}>
          {overallPeriod && <UiPeriodBadge>{overallPeriod}</UiPeriodBadge>}
          <UiEllipsis>
            {getOptionLabel(startValue!)} - {getOptionLabel(endValue!)}
          </UiEllipsis>
        </div>
        <div className={styles.actionIconsContainer}>
          <UiIcon
            name="CloseSmall"
            size="sm"
            className={styles.clearIcon}
            onClick={handleClearClick}
            aria-label="Clear period selection"
          />
          <Separator orientation="vertical" className={styles.separator} />
          <UiIcon name="KeyboardArrowDown" size="sm" className={styles.chevronIcon} />
        </div>
      </div>
    );
  }
);

TriggerContent.displayName = 'TriggerContent';

const OptionList: React.FC<OptionListProps> = React.memo(
  ({
    options,
    tempStartValue,
    tempEndValue,
    onSelectOption,
    onSelectPreset,
    onApply,
    onCancel,
    isOptionDisabled,
    isOptionInRange,
    formatPeriod,
    presets,
  }) => {
    const hasSelection = Boolean(tempStartValue && tempEndValue);
    const presetOptions = React.useMemo(() => createPresetOptions(presets), [presets]);

    const renderColumn = React.useCallback(
      (columnType: ColumnType, title: string) => {
        const filteredOptions = options.filter((option) => !isOptionDisabled(option.value, columnType));

        return (
          <div className={styles.column}>
            <div className={styles.columnHeader}>{title}</div>
            <div className={styles.columnContent}>
              {filteredOptions.map((option) => {
                const isSelected = option.value === (columnType === 'start' ? tempStartValue : tempEndValue);
                const isInRange = isOptionInRange(option.value);

                const handleClick = () => onSelectOption(option.value, columnType);

                return (
                  <div
                    key={`${columnType}-${option.value}`}
                    onClick={handleClick}
                    className={cx(
                      styles.optionItem,
                      isSelected && styles.selectedOptionItem,
                      isInRange && !isSelected && styles.rangeOptionItem
                    )}
                  >
                    {option.period && <UiPeriodBadge>{formatPeriod(option.period)}</UiPeriodBadge>}
                    <span>{option.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      },
      [options, tempStartValue, tempEndValue, isOptionDisabled, isOptionInRange, formatPeriod, onSelectOption]
    );

    const renderPresetColumn = React.useCallback(() => {
      return (
        <div className={styles.presetColumn}>
          <div className={styles.columnHeader}>Presets</div>
          <div className={styles.columnContent}>
            {presetOptions.map((preset) => {
              const handleClick = () => onSelectPreset(preset.count);

              return (
                <div key={preset.label} onClick={handleClick} className={styles.optionItem}>
                  {preset.label}
                </div>
              );
            })}
          </div>
        </div>
      );
    }, [presetOptions, onSelectPreset]);

    return (
      <div>
        <div className={styles.columnsContainer}>
          {renderPresetColumn()}
          {renderColumn('start', 'From')}
          {renderColumn('end', 'To')}
        </div>

        <div className={styles.actionButtonsContainer}>
          {hasSelection && (
            <>
              <UiButton variant="default" onClick={onApply} className={styles.applyButton}>
                Apply
              </UiButton>
              <Separator orientation="vertical" className={styles.separator} />
            </>
          )}
          <UiButton variant="secondary" onClick={onCancel} className={styles.closeButton}>
            Cancel
          </UiButton>
        </div>
      </div>
    );
  }
);

OptionList.displayName = 'OptionList';

export const UiPeriodSelect = React.forwardRef<HTMLButtonElement, PeriodSelectProps>(
  (
    {
      options,
      onValueChange,
      defaultValue = [],
      placeholder = 'Select period',
      modalPopover = false,
      asChild = false,
      presets = [3, 5, 10],
      className,
      ...props
    },
    ref
  ) => {
    const periodSelect = usePeriodSelect({
      options,
      defaultValue,
      onValueChange,
      presets,
    });

    const handleEscapeKeyDown = React.useCallback(() => {
      periodSelect.setPopoverOpen(false);
    }, [periodSelect]);

    const handleCancel = React.useCallback(() => {
      periodSelect.setPopoverOpen(false);
    }, [periodSelect]);

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
              formatOverallPeriod={periodSelect.formatOverallPeriod}
              onClearAll={periodSelect.clearAll}
            />
          </Button>
        </PopoverTrigger>

        <PopoverContent className={styles.popoverContent} align="start" onEscapeKeyDown={handleEscapeKeyDown}>
          <OptionList
            options={options}
            tempStartValue={periodSelect.state.tempStartValue}
            tempEndValue={periodSelect.state.tempEndValue}
            onSelectOption={periodSelect.selectOption}
            onSelectPreset={periodSelect.selectPreset}
            onApply={periodSelect.applySelection}
            onCancel={handleCancel}
            isOptionDisabled={periodSelect.isOptionDisabled}
            isOptionInRange={periodSelect.isOptionInRange}
            formatPeriod={periodSelect.formatPeriod}
            presets={periodSelect.presets}
          />
        </PopoverContent>
      </Popover>
    );
  }
);

UiPeriodSelect.displayName = 'PeriodSelect';
