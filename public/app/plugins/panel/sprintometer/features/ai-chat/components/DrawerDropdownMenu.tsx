import { css } from '@emotion/css';
import { Menu, Pencil } from 'lucide-react';
import React from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../../components/shadcn/dropdown-menu';
import { UiButton } from '../../../components/ui';
import { theme3 } from '../../../theme';

interface Props {
  presetQueries: string[];
  onEditPrompt: () => void;
  onPresetSelect: (query: string) => void;
}

const styles = {
  content: css`
    max-height: 300px;
    overflow-y: auto;
  `,
  presetItem: css`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 260px;
    font-size: ${theme3.tailwind.textSm};
  `,
};

export const DrawerDropdownMenu: React.FC<Props> = ({ presetQueries, onEditPrompt, onPresetSelect }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <UiButton variant="ghost" size="sm">
        <Menu size={16} />
      </UiButton>
    </DropdownMenuTrigger>
    <DropdownMenuContent className={styles.content} align="start">
      <DropdownMenuItem onClick={onEditPrompt}>
        <Pencil size={14} />
        Edit system prompt
      </DropdownMenuItem>
      {presetQueries.length > 0 && (
        <>
          <DropdownMenuSeparator />
          {presetQueries.map((query) => (
            <DropdownMenuItem key={query} onClick={() => onPresetSelect(query)}>
              <span className={styles.presetItem}>{query}</span>
            </DropdownMenuItem>
          ))}
        </>
      )}
    </DropdownMenuContent>
  </DropdownMenu>
);
