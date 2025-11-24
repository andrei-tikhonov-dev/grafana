import { css, cx } from '@emotion/css';
import * as React from 'react';

import { theme3 } from '../../../theme';
import { TPeriod, TPeriodVariant } from '../../../types';
import { formatFullDate, formatFullPeriod } from '../../../utils/dateTime';
import { Popover, PopoverContent, PopoverTrigger } from '../../shadcn/popover';
import { ScrollArea } from '../../shadcn/scroll-area';
import { UiButton, UiEllipsis, UiHorizontalGroup, UiTypography, UiVerticalGroup } from '../index';
import { Calendar, ChevronDown } from 'lucide-react';

const styles = {
  triggerButton: css`
    min-height: 40px;
    height: auto;
    padding: ${theme3.tailwind.spacing} ${theme3.tailwind.spacing4};
    max-width: ${theme3.tailwind.container2xl};
  `,

  displayContainer: css`
    min-height: 40px;
    height: auto;
    padding: ${theme3.tailwind.spacing} ${theme3.tailwind.spacing4};
    max-width: ${theme3.tailwind.container2xl};
    display: flex;
    align-items: center;
  `,

  popoverContent: css`
    width: ${theme3.tailwind.container4xl};
    padding: 0;
  `,

  popoverContentSingle: css`
    width: ${theme3.tailwind.containerLg};
    padding: 0;
  `,

  columnsContainer: css`
    display: flex;
    height: ${theme3.tailwind.containerSm};
    overflow: hidden;
  `,

  singleColumnContainer: css`
    display: flex;
    height: ${theme3.tailwind.containerSm};
    overflow: hidden;
  `,

  column: css`
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    padding-bottom: 60px;
    gap: ${theme3.tailwind.spacing};
    border-right: ${theme3.custom.border};

    &:last-child {
      border-right: none;
    }
  `,

  fullColumn: css`
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    padding-bottom: 60px;
    gap: ${theme3.tailwind.spacing};
  `,

  presetColumn: css`
    flex: 0.6;
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: ${theme3.tailwind.spacing};
    border-right: 1px solid ${theme3.shadcn.border};

    &:last-child {
      border-right: none;
    }
  `,

  columnHeader: css`
    padding: 12px;
    border-bottom: 1px solid ${theme3.shadcn.border};
    text-align: center;
    flex-shrink: 0;
  `,

  scrollContent: css`
    padding: 4px 0;
  `,

  scrollArea: css`
    flex: 1;
    height: 100%;
  `,

  button: css`
    flex: 1;
  `,

  optionItem: css`
    cursor: pointer;
    margin: 0 4px;
    border-radius: ${theme3.tailwind.radiusSm};
    padding: ${theme3.tailwind.spacing2};
    transition: all 0.2s ease-in-out;

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

  actionButtonsContainer: css`
    padding: ${theme3.tailwind.spacing2};
    border-top: 1px solid ${theme3.shadcn.border};
  `,
};

const overflowHiddenStyles = css`
  overflow: hidden;
`;

type ColumnType = 'start' | 'end';
type PeriodSelectVariant = TPeriodVariant; // 'range' | 'single';

export interface PeriodSelectOption {
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
  selectedValue: string | null;
  tempSelectedValue: string | null;
  isPopoverOpen: boolean;
}

interface UsePeriodSelectProps {
  variant: PeriodSelectVariant;
  options: PeriodSelectOption[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  presets?: number[];
}

interface TriggerContentProps {
  variant: PeriodSelectVariant;
  startValue: string | null;
  endValue: string | null;
  selectedValue: string | null;
  placeholder: string;
  getOptionLabel: (value: string) => string;
  formatOverallPeriod: (startValue: string, endValue: string) => string | null;
  formatSinglePeriod: (value: string) => string | null;
  showChevron?: boolean;
}

interface DisplayContentProps {
  variant: PeriodSelectVariant;
  startValue: string | null;
  endValue: string | null;
  selectedValue: string | null;
  placeholder: string;
  getOptionLabel: (value: string) => string;
  formatOverallPeriod: (startValue: string, endValue: string) => string | null;
  formatSinglePeriod: (value: string) => string | null;
  className?: string;
}

interface OptionListProps {
  variant: PeriodSelectVariant;
  options: PeriodSelectOption[];
  tempStartValue: string | null;
  tempEndValue: string | null;
  tempSelectedValue: string | null;
  onSelectOption: (value: string, columnType?: ColumnType) => void;
  onSelectPreset: (count: number | 'all') => void;
  onApply: () => void;
  onCancel: () => void;
  isOptionDisabled: (value: string, columnType: ColumnType) => boolean;
  isOptionInRange: (value: string) => boolean;
  formatPeriod: (period: TPeriod) => string;
  presets: number[];
}

interface PeriodSelectProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'defaultValue'> {
  variant?: PeriodSelectVariant;
  disabled?: boolean;
  options: PeriodSelectOption[];
  onValueChange?: (value: string | string[]) => void;
  defaultValue?: string | string[];
  placeholder?: string;
  modalPopover?: boolean;
  presets?: number[];
}

const createInitialState = (variant: PeriodSelectVariant, defaultValue: string | string[]): PeriodSelectState => {
  if (variant === 'single') {
    const value = typeof defaultValue === 'string' ? defaultValue : defaultValue[0] || null;
    return {
      startValue: null,
      endValue: null,
      tempStartValue: null,
      tempEndValue: null,
      selectedValue: value,
      tempSelectedValue: value,
      isPopoverOpen: false,
    };
  }

  const valueArray = Array.isArray(defaultValue) ? defaultValue : [defaultValue];
  return {
    startValue: valueArray[0] || null,
    endValue: valueArray[1] || null,
    tempStartValue: valueArray[0] || null,
    tempEndValue: valueArray[1] || null,
    selectedValue: null,
    tempSelectedValue: null,
    isPopoverOpen: false,
  };
};

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

const usePeriodSelect = ({
  variant,
  options,
  defaultValue = [],
  onValueChange,
  presets = [3, 5, 10],
}: UsePeriodSelectProps) => {
  const [state, setState] = React.useState<PeriodSelectState>(() => createInitialState(variant, defaultValue));

  const optionUtils = React.useMemo(() => {
    const getOptionLabel = (value: string): string => options.find((option) => option.value === value)?.label || value;

    const getOption = (value: string): PeriodSelectOption | undefined =>
      options.find((option) => option.value === value);

    const getOptionIndex = (value: string): number => options.findIndex((option) => option.value === value);

    return { getOptionLabel, getOption, getOptionIndex };
  }, [options]);

  const isOptionDisabled = React.useCallback(
    (optionValue: string, columnType: ColumnType): boolean => {
      if (variant === 'single') {
        return false;
      }

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
    [variant, state.tempStartValue, state.tempEndValue, optionUtils]
  );

  const isOptionInRange = React.useCallback(
    (optionValue: string): boolean => {
      if (variant === 'single' || !state.tempStartValue || !state.tempEndValue) {
        return false;
      }

      const optionIndex = optionUtils.getOptionIndex(optionValue);
      const startIndex = optionUtils.getOptionIndex(state.tempStartValue);
      const endIndex = optionUtils.getOptionIndex(state.tempEndValue);

      return optionIndex >= startIndex && optionIndex <= endIndex;
    },
    [variant, state.tempStartValue, state.tempEndValue, optionUtils]
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

  const formatSinglePeriod = React.useCallback(
    (value: string): string | null => {
      const option = optionUtils.getOption(value);

      if (option?.period) {
        return formatFullPeriod(option.period);
      }

      return null;
    },
    [optionUtils]
  );

  const formatPeriod = React.useCallback((period: TPeriod): string => {
    return formatFullPeriod(period);
  }, []);

  const selectOption = React.useCallback(
    (optionValue: string, columnType?: ColumnType): void => {
      if (variant === 'single') {
        setState((prev) => ({
          ...prev,
          tempSelectedValue: optionValue === prev.tempSelectedValue ? null : optionValue,
        }));
        return;
      }

      if (!columnType) {
        return;
      }

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
    [variant, isOptionDisabled]
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
      if (variant === 'single') {
        const finalValue = prev.tempSelectedValue || options[0]?.value || null;
        if (onValueChange && finalValue) {
          onValueChange(finalValue);
        }

        return {
          ...prev,
          selectedValue: finalValue,
          tempSelectedValue: finalValue,
          isPopoverOpen: false,
        };
      }

      // range variant
      let finalStartValue = prev.tempStartValue;
      let finalEndValue = prev.tempEndValue;

      if (finalStartValue && !finalEndValue) {
        finalEndValue = options[options.length - 1]?.value || null;
      } else if (!finalStartValue && finalEndValue) {
        finalStartValue = options[0]?.value || null;
      }

      const newSelectedValues = filterNonEmpty([finalStartValue, finalEndValue]);
      if (onValueChange) {
        onValueChange(newSelectedValues);
      }

      return {
        ...prev,
        startValue: finalStartValue,
        endValue: finalEndValue,
        tempStartValue: finalStartValue,
        tempEndValue: finalEndValue,
        isPopoverOpen: false,
      };
    });
  }, [variant, onValueChange, options]);

  const togglePopover = React.useCallback((): void => {
    setState((prev) => ({ ...prev, isPopoverOpen: !prev.isPopoverOpen }));
  }, []);

  const setPopoverOpen = React.useCallback(
    (open: boolean): void => {
      setState((prev) => {
        if (open) {
          if (variant === 'single') {
            return {
              ...prev,
              isPopoverOpen: open,
              tempSelectedValue: prev.selectedValue,
            };
          }
          return {
            ...prev,
            isPopoverOpen: open,
            tempStartValue: prev.startValue,
            tempEndValue: prev.endValue,
          };
        }
        return { ...prev, isPopoverOpen: open };
      });
    },
    [variant]
  );

  return {
    state,
    selectOption,
    selectPreset,
    applySelection,
    togglePopover,
    setPopoverOpen,
    isOptionDisabled,
    isOptionInRange,
    formatOverallPeriod,
    formatSinglePeriod,
    formatPeriod,
    presets,
    ...optionUtils,
  };
};

const TriggerContent: React.FC<TriggerContentProps> = React.memo(
  ({
    variant,
    startValue,
    endValue,
    selectedValue,
    placeholder,
    getOptionLabel,
    formatOverallPeriod,
    formatSinglePeriod,
    showChevron = true,
  }) => {
    if (variant === 'single') {
      if (!selectedValue) {
        return (
          <UiHorizontalGroup justify="space-between" gap="md">
            <UiTypography as="span" variant="body" color="light">
              {placeholder}
            </UiTypography>
            {showChevron && <ChevronDown />}
          </UiHorizontalGroup>
        );
      }

      const singlePeriod = formatSinglePeriod(selectedValue);

      return (
        <UiHorizontalGroup justify="space-between" gap="md" className={overflowHiddenStyles}>
          <UiHorizontalGroup align="center" gap="sm" className={overflowHiddenStyles}>
            <Calendar size={16} />
            <UiTypography as="span" variant="bodyBold">
              {singlePeriod}
            </UiTypography>
            <UiTypography as="div" variant="bodyBold" color="light" className={overflowHiddenStyles}>
              <UiEllipsis as="span">[{getOptionLabel(selectedValue)}]</UiEllipsis>
            </UiTypography>
          </UiHorizontalGroup>
          {showChevron && <ChevronDown />}
        </UiHorizontalGroup>
      );
    }

    // range variant
    if (!startValue && !endValue) {
      return (
        <UiHorizontalGroup justify="space-between" gap="md">
          <UiTypography as="span" variant="body" color="light">
            {placeholder}
          </UiTypography>
          {showChevron && <ChevronDown />}
        </UiHorizontalGroup>
      );
    }

    const overallPeriod = startValue && endValue ? formatOverallPeriod(startValue, endValue) : null;

    return (
      <UiHorizontalGroup justify="space-between" gap="md" className={overflowHiddenStyles}>
        <UiHorizontalGroup align="center" gap="sm" className={overflowHiddenStyles}>
          <Calendar size={16} />
          <UiTypography as="span" variant="bodyBold">
            {overallPeriod}
          </UiTypography>
          <UiTypography as="div" variant="bodyBold" color="light" className={overflowHiddenStyles}>
            <UiEllipsis as="span">
              [{getOptionLabel(startValue!)} - {getOptionLabel(endValue!)}]
            </UiEllipsis>
          </UiTypography>
        </UiHorizontalGroup>
        {showChevron && <ChevronDown />}
      </UiHorizontalGroup>
    );
  }
);

TriggerContent.displayName = 'TriggerContent';

const DisplayContent: React.FC<DisplayContentProps> = React.memo(
  ({
    variant,
    startValue,
    endValue,
    selectedValue,
    placeholder,
    getOptionLabel,
    formatOverallPeriod,
    formatSinglePeriod,
    className,
  }) => {
    if (variant === 'single') {
      if (!selectedValue) {
        return (
          <div className={cx(styles.displayContainer, className)}>
            <UiTypography as="span" variant="body" color="light">
              {placeholder}
            </UiTypography>
          </div>
        );
      }

      const singlePeriod = formatSinglePeriod(selectedValue);

      return (
        <div className={cx(styles.displayContainer, className)}>
          <UiHorizontalGroup align="center" gap="sm" className={overflowHiddenStyles}>
            <Calendar size={16} />
            <UiTypography as="span" variant="bodyBold">
              {singlePeriod}
            </UiTypography>
            <UiTypography as="div" variant="bodyBold" color="light" className={overflowHiddenStyles}>
              <UiEllipsis as="span">[{getOptionLabel(selectedValue)}]</UiEllipsis>
            </UiTypography>
          </UiHorizontalGroup>
        </div>
      );
    }

    if (!startValue && !endValue) {
      return (
        <div className={cx(styles.displayContainer, className)}>
          <UiTypography as="span" variant="body" color="light">
            {placeholder}
          </UiTypography>
        </div>
      );
    }

    const overallPeriod = startValue && endValue ? formatOverallPeriod(startValue, endValue) : null;

    return (
      <div className={cx(styles.displayContainer, className)}>
        <UiHorizontalGroup align="center" gap="sm" className={overflowHiddenStyles}>
          <Calendar size={16} />
          <UiTypography as="span" variant="bodyBold">
            {overallPeriod}
          </UiTypography>
          <UiTypography as="div" variant="bodyBold" color="light" className={overflowHiddenStyles}>
            <UiEllipsis as="span">
              [{getOptionLabel(startValue!)} - {getOptionLabel(endValue!)}]
            </UiEllipsis>
          </UiTypography>
        </UiHorizontalGroup>
      </div>
    );
  }
);

DisplayContent.displayName = 'DisplayContent';

const OptionList: React.FC<OptionListProps> = React.memo(
  ({
    variant,
    options,
    tempStartValue,
    tempEndValue,
    tempSelectedValue,
    onSelectOption,
    onSelectPreset,
    onApply,
    onCancel,
    isOptionDisabled,
    isOptionInRange,
    formatPeriod,
    presets,
  }) => {
    const hasSelection = variant === 'single' ? Boolean(tempSelectedValue) : Boolean(tempStartValue && tempEndValue);
    const presetOptions = React.useMemo(() => createPresetOptions(presets), [presets]);

    const renderSingleColumn = React.useCallback(() => {
      return (
        <div className={styles.fullColumn}>
          <UiTypography as="div" variant="bodyBold" color="light" className={styles.columnHeader}>
            Select Period
          </UiTypography>
          <ScrollArea className={styles.scrollArea}>
            <UiVerticalGroup align="stretch" justify="start" gap="xs" className={styles.scrollContent}>
              {options.map((option) => {
                const isSelected = option.value === tempSelectedValue;

                return (
                  <UiVerticalGroup
                    gap="xs"
                    align="start"
                    justify="center"
                    key={option.value}
                    onClick={() => onSelectOption(option.value)}
                    className={cx(styles.optionItem, isSelected && styles.selectedOptionItem)}
                  >
                    {option.period && (
                      <UiTypography as="span" color="inherit">
                        {formatPeriod(option.period)}
                      </UiTypography>
                    )}
                    <UiTypography as="span" color="inherit" variant="bodySmall">
                      [{option.label}]
                    </UiTypography>
                  </UiVerticalGroup>
                );
              })}
            </UiVerticalGroup>
          </ScrollArea>
        </div>
      );
    }, [options, tempSelectedValue, formatPeriod, onSelectOption]);

    const renderColumn = React.useCallback(
      (columnType: ColumnType, title: string) => {
        const filteredOptions = options.filter((option) => !isOptionDisabled(option.value, columnType));

        return (
          <div className={styles.column}>
            <UiTypography as="div" variant="bodyBold" color="light" className={styles.columnHeader}>
              {title}
            </UiTypography>
            <ScrollArea className={styles.scrollArea}>
              <UiVerticalGroup align="stretch" justify="start" gap="xs" className={styles.scrollContent}>
                {filteredOptions.map((option) => {
                  const isSelected = option.value === (columnType === 'start' ? tempStartValue : tempEndValue);
                  const isInRange = isOptionInRange(option.value);

                  return (
                    <UiVerticalGroup
                      gap="xs"
                      align="start"
                      justify="center"
                      key={`${columnType}-${option.value}`}
                      onClick={() => onSelectOption(option.value, columnType)}
                      className={cx(
                        styles.optionItem,
                        isSelected && styles.selectedOptionItem,
                        isInRange && !isSelected && styles.rangeOptionItem
                      )}
                    >
                      {option.period && (
                        <UiTypography as="span" color="inherit">
                          {formatPeriod(option.period)}
                        </UiTypography>
                      )}
                      <UiTypography as="span" color="inherit" variant="bodySmall">
                        [{option.label}]
                      </UiTypography>
                    </UiVerticalGroup>
                  );
                })}
              </UiVerticalGroup>
            </ScrollArea>
          </div>
        );
      },
      [options, tempStartValue, tempEndValue, isOptionDisabled, isOptionInRange, formatPeriod, onSelectOption]
    );

    const renderPresetColumn = React.useCallback(() => {
      return (
        <div className={styles.presetColumn}>
          <UiTypography as="div" variant="bodyBold" color="light" className={styles.columnHeader}>
            Presets
          </UiTypography>
          <ScrollArea className={styles.scrollArea}>
            <UiVerticalGroup align="stretch" justify="start" gap="xs" className={styles.scrollContent}>
              {presetOptions.map((preset) => (
                <div key={preset.label} onClick={() => onSelectPreset(preset.count)} className={styles.optionItem}>
                  {preset.label}
                </div>
              ))}
            </UiVerticalGroup>
          </ScrollArea>
        </div>
      );
    }, [presetOptions, onSelectPreset]);

    return (
      <UiVerticalGroup align="stretch" justify="start" gap="xs">
        {variant === 'single' ? (
          <div className={styles.singleColumnContainer}>{renderSingleColumn()}</div>
        ) : (
          <div className={styles.columnsContainer}>
            {renderPresetColumn()}
            {renderColumn('start', 'From')}
            {renderColumn('end', 'To')}
          </div>
        )}

        <UiHorizontalGroup align="center" justify="center" gap="sm" className={styles.actionButtonsContainer}>
          {hasSelection && (
            <UiButton variant="default" className={styles.button} onClick={onApply}>
              Apply
            </UiButton>
          )}
          <UiButton variant="secondary" className={styles.button} onClick={onCancel}>
            Cancel
          </UiButton>
        </UiHorizontalGroup>
      </UiVerticalGroup>
    );
  }
);

OptionList.displayName = 'OptionList';

export const UiPeriodSelect = React.forwardRef<HTMLButtonElement, PeriodSelectProps>(
  (
    {
      variant = 'range',
      disabled = false,
      options,
      onValueChange,
      defaultValue = [],
      placeholder = 'Select period',
      modalPopover = false,
      presets = [3, 5, 10],
      className,
      ...props
    },
    ref
  ) => {
    const periodSelect = usePeriodSelect({
      variant,
      options,
      defaultValue,
      onValueChange,
      presets,
    });

    const handleCancel = React.useCallback(() => {
      periodSelect.setPopoverOpen(false);
    }, [periodSelect]);

    if (disabled) {
      return (
        <DisplayContent
          variant={variant}
          startValue={periodSelect.state.startValue}
          endValue={periodSelect.state.endValue}
          selectedValue={periodSelect.state.selectedValue}
          placeholder={placeholder}
          getOptionLabel={periodSelect.getOptionLabel}
          formatOverallPeriod={periodSelect.formatOverallPeriod}
          formatSinglePeriod={periodSelect.formatSinglePeriod}
          className={className}
        />
      );
    }

    return (
      <Popover open={periodSelect.state.isPopoverOpen} onOpenChange={periodSelect.setPopoverOpen} modal={modalPopover}>
        <PopoverTrigger asChild>
          <UiButton
            ref={ref}
            {...props}
            onClick={periodSelect.togglePopover}
            className={cx(styles.triggerButton, className)}
            variant="outline"
          >
            <TriggerContent
              variant={variant}
              startValue={periodSelect.state.startValue}
              endValue={periodSelect.state.endValue}
              selectedValue={periodSelect.state.selectedValue}
              placeholder={placeholder}
              getOptionLabel={periodSelect.getOptionLabel}
              formatOverallPeriod={periodSelect.formatOverallPeriod}
              formatSinglePeriod={periodSelect.formatSinglePeriod}
            />
          </UiButton>
        </PopoverTrigger>

        <PopoverContent
          className={variant === 'single' ? styles.popoverContentSingle : styles.popoverContent}
          align="start"
          onEscapeKeyDown={handleCancel}
        >
          <OptionList
            variant={variant}
            options={options}
            tempStartValue={periodSelect.state.tempStartValue}
            tempEndValue={periodSelect.state.tempEndValue}
            tempSelectedValue={periodSelect.state.tempSelectedValue}
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
