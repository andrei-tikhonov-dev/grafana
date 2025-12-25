import { css } from '@emotion/css';
import { ThumbsUp, ThumbsDown, Copy, Check } from 'lucide-react';
import React from 'react';

import { UiButton, UiHorizontalGroup } from '../../../components/ui';
import { theme3 } from '../../../theme';

interface Props {
  onThumbsUp: () => void;
  onThumbsDown: () => void;
  onCopy: () => void;
  isCopied?: boolean;
  disabled?: boolean;
}

const styles = {
  button: css`
    padding: ${theme3.tailwind.spacing};
    min-width: auto;
  `,
  icon: css`
    width: 16px;
    height: 16px;
  `,
};

export const MessageButtons: React.FC<Props> = ({ onThumbsUp, onThumbsDown, onCopy, isCopied, disabled }) => {
  return (
    <UiHorizontalGroup gap="xs">
      <UiButton variant="ghost" size="sm" onClick={onCopy} className={styles.button} title="Copy to clipboard">
        {isCopied ? <Check className={styles.icon} /> : <Copy className={styles.icon} />}
      </UiButton>
      <UiButton
        variant="ghost"
        size="sm"
        onClick={onThumbsDown}
        disabled={disabled}
        className={styles.button}
        title="Thumbs down"
      >
        <ThumbsDown className={styles.icon} />
      </UiButton>
      <UiButton
        variant="ghost"
        size="sm"
        onClick={onThumbsUp}
        disabled={disabled}
        className={styles.button}
        title="Thumbs up"
      >
        <ThumbsUp className={styles.icon} />
      </UiButton>
    </UiHorizontalGroup>
  );
};
