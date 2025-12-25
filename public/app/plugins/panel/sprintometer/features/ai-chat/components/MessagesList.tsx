import { ChatFeedbackRequestValueEnum } from '@architeq/core-api-client';
import { css } from '@emotion/css';
import React, { useEffect, useRef } from 'react';

import { scrollbarStyles } from '../../../theme';
import { AiChatMessageVM } from '../api/types';

import { ChatMessage } from './ChatMessage';

interface Props {
  messages: AiChatMessageVM[];
  onPromptClick: (prompt: string) => void;
  onFeedback: (localId: string, value: ChatFeedbackRequestValueEnum) => void;
  onRetry: () => void;
}

const styles = {
  container: css`
    ${scrollbarStyles};
    padding: 16px;
    flex: 1;
    min-height: 0;
    width: 100%;
  `,
};

export const MessagesList: React.FC<Props> = ({ messages, onPromptClick, onFeedback, onRetry }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div ref={containerRef} className={styles.container}>
      {messages.map((message, index) => (
        <ChatMessage
          key={message.localId}
          message={message}
          onPromptClick={onPromptClick}
          onFeedback={onFeedback}
          onRetry={onRetry}
          isLast={index === messages.length - 1}
        />
      ))}
    </div>
  );
};
