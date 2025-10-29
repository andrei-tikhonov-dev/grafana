import { css, cx } from '@emotion/css';
import * as React from 'react';

import { theme3, roundedBordersStyles } from '../../../theme';
import { Badge } from '../../shadcn/badge';
import { Button } from '../../shadcn/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '../../shadcn/command';
import { Popover, PopoverContent, PopoverTrigger } from '../../shadcn/popover';
import { Separator } from '../../shadcn/separator';
import { UiEllipsis, UiIcon } from '../index';

const badgeStyles = css`
  max-width: 100px;
  margin: 4px;
`;

const triggerButtonStyles = css`
  display: flex;
  min-height: 40px;
  height: auto;
  align-items: center;
  justify-content: space-between;
  padding: ${theme3.tailwind.spacing};
  ${roundedBordersStyles}

  &:hover {
    background-color: ${theme3.shadcn.background} !important;
  }

  & svg {
    pointer-events: auto;
  }
`;

const selectedValuesContainerStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const badgeWrapperStyles = css`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
`;

const actionIconsContainerStyles = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const clearIconStyles = css`
  margin-left: 8px;
  margin-right: 8px;
  cursor: pointer;
  color: ${theme3.shadcn.mutedForeground};
`;

const separatorStyles = css`
  display: flex;
  min-height: 24px;
  height: 100%;
`;

const chevronIconStyles = css`
  margin-left: 8px;
  margin-right: 8px;
  cursor: pointer;
  color: ${theme3.shadcn.mutedForeground};
`;

const placeholderContainerStyles = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
`;

const placeholderTextStyles = css`
  font-size: ${theme3.tailwind.textSm};
  color: ${theme3.shadcn.mutedForeground};
  margin-left: 12px;
  margin-right: 12px;
`;

const chevronPlaceholderStyles = css`
  height: 16px;
  cursor: pointer;
  color: ${theme3.shadcn.mutedForeground};
  margin-left: 8px;
  margin-right: 8px;
`;

const popoverContentStyles = css`
  width: auto;
  padding: 0;
`;

const iconContainerStyles = css`
  margin-right: 8px;
  display: flex;
  height: 16px;
  width: 16px;
  align-items: center;
  justify-content: center;
  border-radius: ${theme3.tailwind.radiusSm};
  border: 1px solid ${theme3.custom.colorPrimary};
`;

const iconContainerSelectedStyles = css`
  background-color: ${theme3.custom.colorPrimary};
  color: ${theme3.shadcn.primaryForeground};
`;

const iconContainerUnselectedStyles = css`
  opacity: 0.5;

  & svg {
    visibility: hidden;
  }
`;

const optionIconStyles = css`
  margin-right: 8px;
  height: 16px;
  width: 16px;
  color: ${theme3.shadcn.mutedForeground};
`;

const commandItemStyles = css`
  cursor: pointer;
`;

const actionButtonsContainerStyles = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const clearButtonStyles = css`
  flex: 1;
  justify-content: center;
  cursor: pointer;
`;

const closeButtonStyles = css`
  flex: 1;
  justify-content: center;
  cursor: pointer;
  max-width: 100%;
`;

const extraBadgeStyles = css`
  background-color: transparent;
  color: ${theme3.shadcn.foreground};
  border-color: ${theme3.shadcn.border};

  &:hover {
    background-color: transparent;
  }
`;

const badgeIconStyles = css`
  margin-right: 8px;
`;

const badgeCloseIconStyles = css`
  height: 12px;
  width: 12px;
  color: ${theme3.shadcn.mutedForeground};

  &:hover {
    color: ${theme3.shadcn.foreground};
  }
  cursor: pointer;
`;

const badgeCloseButtonStyles = css`
  display: flex;
  outline: none;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;

  &:focus {
    outline: none;
  }
`;

interface MultiselectOptionsProps {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface MultiSelectProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  options: MultiselectOptionsProps[];
  onValueChange: (value: string[]) => void;
  defaultValue?: string[];
  placeholder?: string;
  maxCount?: number;
  modalPopover?: boolean;
  asChild?: boolean;
}

export const UiMultiSelect = React.forwardRef<HTMLButtonElement, MultiSelectProps>(
  (
    {
      options,
      onValueChange,
      defaultValue = [],
      placeholder = 'Select options',
      maxCount = 3,
      modalPopover = false,
      asChild = false,
      className,
      ...props
    },
    ref
  ) => {
    const valuesForBadges = React.useMemo(
      () => defaultValue.filter((value) => options.some((option) => option.value === value)),
      [defaultValue, options]
    );
    const [selectedValues, setSelectedValues] = React.useState<string[]>(defaultValue);
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

    const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        setIsPopoverOpen(true);
      } else if (event.key === 'Backspace' && !event.currentTarget.value) {
        const newSelectedValues = [...selectedValues];
        newSelectedValues.pop();
        setSelectedValues(newSelectedValues);
        onValueChange(newSelectedValues);
      }
    };

    const toggleOption = (option: string) => {
      const newSelectedValues = selectedValues.includes(option)
        ? selectedValues.filter((value) => value !== option)
        : [...selectedValues, option];
      setSelectedValues(newSelectedValues);
      onValueChange(newSelectedValues);
    };

    const handleClear = () => {
      setSelectedValues([]);
      onValueChange([]);
    };

    const handleTogglePopover = () => {
      setIsPopoverOpen((prev) => !prev);
    };

    const clearExtraOptions = () => {
      const newSelectedValues = selectedValues.slice(0, maxCount);
      setSelectedValues(newSelectedValues);
      onValueChange(newSelectedValues);
    };

    const toggleAll = () => {
      if (selectedValues.length === options.length) {
        handleClear();
      } else {
        const allValues = options.map((option) => option.value);
        setSelectedValues(allValues);
        onValueChange(allValues);
      }
    };

    return (
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen} modal={modalPopover}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            {...props}
            onClick={handleTogglePopover}
            className={cx(triggerButtonStyles, className)}
            variant="outline"
          >
            {valuesForBadges.length > 0 ? (
              <div className={selectedValuesContainerStyles}>
                <div className={badgeWrapperStyles}>
                  {valuesForBadges.slice(0, maxCount).map((value) => {
                    const option = options.find((o) => o.value === value);
                    const IconComponent = option?.icon;
                    return (
                      <Badge key={value} className={badgeStyles} variant="secondary">
                        {IconComponent && <IconComponent className={badgeIconStyles} />}
                        <UiEllipsis>{option?.label}</UiEllipsis>
                        <button
                          className={badgeCloseButtonStyles}
                          onClick={(event) => {
                            event.stopPropagation();
                            toggleOption(value);
                          }}
                        >
                          <UiIcon name="CloseSmall" className={badgeCloseIconStyles} />
                        </button>
                      </Badge>
                    );
                  })}
                  {valuesForBadges.length > maxCount && (
                    <Badge className={cx(badgeStyles, extraBadgeStyles)}>
                      {`+ ${valuesForBadges.length - maxCount} more`}
                      <button
                        className={badgeCloseButtonStyles}
                        onClick={(event) => {
                          event.stopPropagation();
                          clearExtraOptions();
                        }}
                      >
                        <UiIcon name="CloseSmall" className={badgeCloseIconStyles} />
                      </button>
                    </Badge>
                  )}
                </div>
                <div className={actionIconsContainerStyles}>
                  <UiIcon
                    name="CloseSmall"
                    size="sm"
                    className={clearIconStyles}
                    onClick={(event) => {
                      event.stopPropagation();
                      handleClear();
                    }}
                  />
                  <Separator orientation="vertical" className={separatorStyles} />
                  <UiIcon name="KeyboardArrowDown" size="sm" className={chevronIconStyles} />
                </div>
              </div>
            ) : (
              <div className={placeholderContainerStyles}>
                <span className={placeholderTextStyles}>{placeholder}</span>
                <UiIcon name="KeyboardArrowDown" className={chevronPlaceholderStyles} />
              </div>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent className={popoverContentStyles} align="start" onEscapeKeyDown={() => setIsPopoverOpen(false)}>
          <Command>
            <CommandInput placeholder="Search..." onKeyDown={handleInputKeyDown} />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                <CommandItem key="all" onSelect={toggleAll} className={commandItemStyles}>
                  <div
                    className={cx(
                      iconContainerStyles,
                      selectedValues.length === options.length
                        ? iconContainerSelectedStyles
                        : iconContainerUnselectedStyles
                    )}
                  >
                    <UiIcon name="Check" size="sm" />
                  </div>
                  <span>(Select All)</span>
                </CommandItem>
                {options.map((option) => {
                  const isSelected = selectedValues.includes(option.value);
                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => toggleOption(option.value)}
                      className={commandItemStyles}
                    >
                      <div
                        className={cx(
                          iconContainerStyles,
                          isSelected ? iconContainerSelectedStyles : iconContainerUnselectedStyles
                        )}
                      >
                        <UiIcon name="Check" size="sm" />
                      </div>
                      {option.icon && <option.icon className={optionIconStyles} />}
                      <span>{option.label}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup>
                <div className={actionButtonsContainerStyles}>
                  {selectedValues.length > 0 && (
                    <>
                      <CommandItem onSelect={handleClear} className={clearButtonStyles}>
                        Clear
                      </CommandItem>
                      <Separator orientation="vertical" className={separatorStyles} />
                    </>
                  )}
                  <CommandItem onSelect={() => setIsPopoverOpen(false)} className={closeButtonStyles}>
                    Close
                  </CommandItem>
                </div>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);

UiMultiSelect.displayName = 'MultiSelect';
