import { css } from '@emotion/css';
import { Send, Square } from 'lucide-react';
import React, { useState, useRef, useEffect, useCallback, type KeyboardEvent, type ChangeEvent } from 'react';

import { scrollbarStyles, theme3 } from '../../../theme';

// Constants
const MAX_HEIGHT_VIEWPORT_RATIO = 0.3;
const TEXTAREA_ROWS = 1;
const ICON_SIZE = 14;
const BUTTON_SIZE = 32;

interface ChatInputProps {
  placeholder: string;
  sendLabel: string;
  cancelLabel: string;
  isLoading: boolean;
  value?: string;
  onSend: (message: string) => void;
  onCancel: () => void;
}

const createStyles = () => ({
  container: css`
    padding: ${theme3.tailwind.spacing4};
    border-top: 1px solid ${theme3.shadcn.border};
    background: ${theme3.shadcn.background};
  `,

  inputWrapper: css`
    position: relative;
    display: flex;
    align-items: flex-end;
  `,

  textArea: css`
    flex: 1;
    max-height: 30vh;
    padding: 14px 60px 14px 16px;
    border: 1px solid ${theme3.shadcn.border};
    border-radius: ${theme3.shadcn.radius};
    line-height: ${theme3.tailwind.leadingNormal};
    resize: none;
    outline: none;
    transition: border-color 150ms ${theme3.tailwind.easeInOut};

    ${scrollbarStyles};

    &:focus {
      border-color: ${theme3.custom.colorPrimary};
    }

    &::placeholder {
      color: ${theme3.shadcn.mutedForeground};
    }
  `,

  buttonWrapper: css`
    position: absolute;
    right: 14px;
    bottom: 8px;
  `,

  button: css`
    width: ${BUTTON_SIZE}px;
    height: ${BUTTON_SIZE}px;
    min-width: ${BUTTON_SIZE}px;
    border-radius: 50%;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    cursor: pointer;
    background: ${theme3.custom.colorPrimary};
    color: white;
    transition: opacity 150ms ${theme3.tailwind.easeInOut};

    &:hover:not(:disabled) {
      opacity: 0.9;
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  `,

  disclaimer: css`
    font-size: ${theme3.tailwind.textXs};
    color: ${theme3.shadcn.mutedForeground};
    text-align: center;
    margin-top: ${theme3.tailwind.spacing2};
  `,
});

const styles = createStyles();

/**
 * Calculates and applies the appropriate height for the textarea
 * based on its content, respecting the maximum height constraint.
 */
const adjustTextareaHeight = (textarea: HTMLTextAreaElement): void => {
  textarea.style.height = 'auto';

  const scrollHeight = textarea.scrollHeight;
  const maxHeight = window.innerHeight * MAX_HEIGHT_VIEWPORT_RATIO;
  const newHeight = Math.min(scrollHeight, maxHeight);

  textarea.style.height = `${newHeight}px`;

  textarea.style.overflowY = scrollHeight > maxHeight ? 'auto' : 'hidden';
};

export const ChatInput: React.FC<ChatInputProps> = ({
  placeholder,
  sendLabel,
  cancelLabel,
  isLoading,
  value: controlledValue,
  onSend,
  onCancel,
}) => {
  const [inputValue, setInputValue] = useState(controlledValue ?? '');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const trimmedValue = inputValue.trim();
  const canSend = trimmedValue.length > 0 && !isLoading;

  // Sync with controlled value
  useEffect(() => {
    if (controlledValue !== undefined) {
      setInputValue(controlledValue);
    }
  }, [controlledValue]);

  // Auto-resize textarea when content changes
  useEffect(() => {
    if (textAreaRef.current) {
      adjustTextareaHeight(textAreaRef.current);
    }
  }, [inputValue]);

  const resetTextarea = useCallback(() => {
    setInputValue('');
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.overflowY = 'hidden';
    }
  }, []);

  const handleSend = useCallback(() => {
    if (!canSend) {
      return;
    }

    onSend(trimmedValue);
    resetTextarea();
  }, [canSend, trimmedValue, onSend, resetTextarea]);

  const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      const isEnterWithoutShift = e.key === 'Enter' && !e.shiftKey;

      if (isEnterWithoutShift) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  return (
    <div className={styles.container}>
      <div className={styles.inputWrapper}>
        <textarea
          ref={textAreaRef}
          className={styles.textArea}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          rows={TEXTAREA_ROWS}
          aria-label={placeholder}
        />

        <div className={styles.buttonWrapper}>
          {isLoading ? (
            <button
              type="button"
              className={styles.button}
              onClick={onCancel}
              title={cancelLabel}
              aria-label={cancelLabel}
            >
              <Square size={ICON_SIZE} fill="currentColor" />
            </button>
          ) : (
            <button
              type="button"
              className={styles.button}
              onClick={handleSend}
              disabled={!canSend}
              title={sendLabel}
              aria-label={sendLabel}
            >
              <Send size={ICON_SIZE} />
            </button>
          )}
        </div>
      </div>

      <p className={styles.disclaimer}>Our chatbot can make mistakes. Trust answers with caution.</p>
    </div>
  );
};
