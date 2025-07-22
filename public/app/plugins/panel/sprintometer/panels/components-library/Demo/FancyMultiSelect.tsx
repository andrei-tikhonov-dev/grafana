import { css, keyframes } from '@emotion/css';
import { Command as CommandPrimitive } from 'cmdk';
import * as React from 'react';

import { Badge } from '../../../components/shadcn/badge';
import { Command, CommandGroup, CommandItem, CommandList } from '../../../components/shadcn/command';
import { UiIcon } from '../../../components/ui';
import { theme2 } from '../../../theme/theme';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const commandStyles = css`
  overflow: visible;
  background-color: transparent;
`;

const inputWrapperStyles = css`
  border-radius: ${theme2.radii.md};
  border: 1px solid ${theme2.colors.border.default};
  padding: 8px 12px;
  font-size: ${theme2.typography.fontSize.sm};

  &:focus-within {
    outline: none;
  }
`;

const badgeContainerStyles = css`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;

const closeButtonStyles = css`
  margin-left: 4px;
  border-radius: ${theme2.radii.full};
  outline: none;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;

  &:focus {
    outline: none;
  }
`;

const closeIconStyles = css`
  height: 12px;
  width: 12px;
  color: ${theme2.colors.text.secondary};

  &:hover {
    color: ${theme2.colors.text.primary};
  }
`;

const inputStyles = css`
  margin-left: 8px;
  flex: 1;
  background-color: transparent;
  outline: none;
  border: none;

  &::placeholder {
    color: ${theme2.colors.text.secondary};
  }
`;

const dropdownContainerStyles = css`
  position: relative;
  margin-top: 8px;
`;

const dropdownStyles = css`
  position: absolute;
  top: 0;
  z-index: ${theme2.zIndices.dropdown};
  width: 100%;
  border-radius: ${theme2.radii.md};
  border: 1px solid ${theme2.colors.border.default};
  background-color: ${theme2.colors.background.surface};
  color: ${theme2.colors.text.primary};
  box-shadow: ${theme2.shadows.md};
  outline: none;
  animation: ${fadeIn} ${theme2.transitions.duration.normal} ${theme2.transitions.easing.out};
`;

const commandGroupStyles = css`
  height: 100%;
  overflow: auto;
`;

const commandItemStyles = css`
  cursor: pointer;
`;

type Options = Record<'value' | 'label', string>;

const Jira = [
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
] satisfies Options[];

export function FancyMultiSelect() {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Options[]>([Jira[1]]);
  const [inputValue, setInputValue] = React.useState('');

  const handleUnselect = React.useCallback((framework: Options) => {
    setSelected((prev) => prev.filter((s) => s.value !== framework.value));
  }, []);

  const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    const input = inputRef.current;
    if (input) {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (input.value === '') {
          setSelected((prev) => {
            const newSelected = [...prev];
            newSelected.pop();
            return newSelected;
          });
        }
      }
      if (e.key === 'Escape') {
        input.blur();
      }
    }
  }, []);

  const selectables = Jira.filter((framework) => !selected.includes(framework));

  return (
    <Command onKeyDown={handleKeyDown} className={commandStyles}>
      <div className={inputWrapperStyles}>
        <div className={badgeContainerStyles}>
          {selected.map((framework) => {
            return (
              <Badge key={framework.value} variant="secondary">
                {framework.label}
                <button
                  className={closeButtonStyles}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleUnselect(framework);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(framework)}
                >
                  <UiIcon name="CloseSmall" className={closeIconStyles} />
                </button>
              </Badge>
            );
          })}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder="Select..."
            className={inputStyles}
          />
        </div>
      </div>
      <div className={dropdownContainerStyles}>
        <CommandList>
          {open && selectables.length > 0 ? (
            <div className={dropdownStyles}>
              <CommandGroup className={commandGroupStyles}>
                {selectables.map((framework) => {
                  return (
                    <CommandItem
                      key={framework.value}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onSelect={() => {
                        setInputValue('');
                        setSelected((prev) => [...prev, framework]);
                      }}
                      className={commandItemStyles}
                    >
                      {framework.label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </div>
          ) : null}
        </CommandList>
      </div>
    </Command>
  );
}
