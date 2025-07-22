import { css, cx } from '@emotion/css';
import * as React from 'react';

import { Button } from '../../../components/shadcn/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../../../components/shadcn/command';
import { Popover, PopoverContent, PopoverTrigger } from '../../../components/shadcn/popover';
import { UiIcon } from '../../../components/ui';

const triggerButtonStyles = css`
  width: 200px;
  justify-content: space-between;
`;

const chevronIconStyles = css`
  margin-left: 8px;
  height: 16px;
  width: 16px;
  flex-shrink: 0;
  opacity: 0.5;
`;

const popoverContentStyles = css`
  width: 200px;
  padding: 0;
`;

const checkIconStyles = css`
  margin-right: 8px;
  height: 16px;
  width: 16px;
`;

const checkIconVisibleStyles = css`
  opacity: 1;
`;

const checkIconHiddenStyles = css`
  opacity: 0;
`;

const jira = [
  {
    value: 'to-do',
    label: 'To Do',
  },
  {
    value: 'in-progress',
    label: 'In Progress',
  },
  {
    value: 'code-review',
    label: 'Code Review',
  },
  {
    value: 'testing',
    label: 'Testing',
  },
  {
    value: 'done',
    label: 'Done',
  },
  {
    value: 'backlog',
    label: 'Backlog',
  },
  {
    value: 'blocked',
    label: 'Blocked',
  },
  {
    value: 'ready-for-deploy',
    label: 'Ready for Deploy',
  },
  {
    value: 'deployed',
    label: 'Deployed',
  },
  {
    value: 'closed',
    label: 'Closed',
  },
];

export function ExampleCombobox() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button role="combobox" aria-expanded={open} className={triggerButtonStyles}>
          {value ? jira.find((framework) => framework.value === value)?.label : 'Select type...'}
          <UiIcon name="KeyboardArrowDown" className={chevronIconStyles} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={popoverContentStyles}>
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {jira.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue);
                    setOpen(false);
                  }}
                >
                  <UiIcon
                    name="Check"
                    className={cx(
                      checkIconStyles,
                      value === framework.value ? checkIconVisibleStyles : checkIconHiddenStyles
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
