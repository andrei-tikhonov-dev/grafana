import React from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '../../shadcn/select';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface UiSelectGroup {
  label: string;
  options: SelectOption[];
  separator?: boolean;
}

interface UiSelectProps {
  groups: UiSelectGroup[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export const UiSelect: React.FC<UiSelectProps> = ({
  groups,
  value,
  onValueChange,
  placeholder = 'Select option',
  className,
  disabled = false,
}) => {
  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {groups.map((group, groupIndex) => (
          <React.Fragment key={groupIndex}>
            <SelectGroup>
              <SelectLabel>{group.label}</SelectLabel>
              {group.options.map((option) => (
                <SelectItem key={option.value} value={option.value} disabled={option.disabled}>
                  {option.label}
                </SelectItem>
              ))}
              {group.separator && groupIndex < groups.length - 1 && <SelectSeparator />}
            </SelectGroup>
          </React.Fragment>
        ))}
      </SelectContent>
    </Select>
  );
};
