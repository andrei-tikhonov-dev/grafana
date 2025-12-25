import { css } from '@emotion/css';
import React from 'react';

import { UiButton } from '../../../components/ui';
import { theme3 } from '../../../theme';

interface Props {
  prompts?: string[];
  onPromptClick: (prompt: string) => void;
}

const styles = {
  container: css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: ${theme3.tailwind.spacing2};
  `,
  chip: css`
    font-size: ${theme3.tailwind.textXs};
    padding: ${theme3.tailwind.spacing2} ${theme3.tailwind.spacing4};
    background-color: #fee9d5;
    border: 1px solid #fdcdab;
    border-radius: ${theme3.tailwind.radius2xl};
    &:hover:not(:disabled) {
      background-color: #fdcdab;
    }
  `,
};

export const SuggestedPrompts: React.FC<Props> = ({ prompts, onPromptClick }) => {
  if (!prompts || prompts.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      {prompts.map((prompt, index) => (
        <UiButton
          key={index}
          variant="secondary"
          size="sm"
          onClick={() => onPromptClick(prompt)}
          className={styles.chip}
        >
          {prompt}
        </UiButton>
      ))}
    </div>
  );
};
