import { css } from '@emotion/css';
import { Send, Square } from 'lucide-react';
import React, { useState, useRef, useEffect, useCallback, type KeyboardEvent, type ChangeEvent } from 'react';

import { scrollbarStyles, theme3 } from '../../../theme';
import { useAiChatContext } from '../AiChatContext';
import { useAiChatStore, EMPTY_REQUEST_STATE } from '../store/aiChatStore';

const MAX_HEIGHT_VIEWPORT_RATIO = 0.3;
const TEXTAREA_ROWS = 1;
const ICON_SIZE = 14;
const BUTTON_SIZE = 32;

interface Props {
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

const adjustTextareaHeight = (textarea: HTMLTextAreaElement): void => {
  textarea.style.height = 'auto';

  const scrollHeight = textarea.scrollHeight;
  const maxHeight = window.innerHeight * MAX_HEIGHT_VIEWPORT_RATIO;
  const newHeight = Math.min(scrollHeight, maxHeight);

  textarea.style.height = `${newHeight}px`;

  textarea.style.overflowY = scrollHeight > maxHeight ? 'auto' : 'hidden';
};

export const ChatInput: React.FC<Props> = ({
  value: controlledValue,
  onSend,
  onCancel,
}) => {
  const { instanceId, strings } = useAiChatContext();
  const isLoading = useAiChatStore((s) => (s.requestStates[instanceId] || EMPTY_REQUEST_STATE).isLoading);

  const [inputValue, setInputValue] = useState(controlledValue ?? '');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const trimmedValue = inputValue.trim();
  const canSend = trimmedValue.length > 0 && !isLoading;

  useEffect(() => {
    if (controlledValue !== undefined) {
      setInputValue(controlledValue);
    }
  }, [controlledValue]);

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
          placeholder={strings.inputPlaceholder}
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          rows={TEXTAREA_ROWS}
          aria-label={strings.inputPlaceholder}
        />

        <div className={styles.buttonWrapper}>
          {isLoading ? (
            <button
              type="button"
              className={styles.button}
              onClick={onCancel}
              title={strings.cancel}
              aria-label={strings.cancel}
            >
              <Square size={ICON_SIZE} fill="currentColor" />
            </button>
          ) : (
            <button
              type="button"
              className={styles.button}
              onClick={handleSend}
              disabled={!canSend}
              title={strings.send}
              aria-label={strings.send}
            >
              <Send size={ICON_SIZE} />
            </button>
          )}
        </div>
      </div>

      <p className={styles.disclaimer}>{strings.disclaimer}</p>
    </div>
  );
};
