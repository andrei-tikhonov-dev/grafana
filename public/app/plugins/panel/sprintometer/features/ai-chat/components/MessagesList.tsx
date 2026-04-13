import { ChatFeedbackRequestValueEnum, ChatHistoryMessageRoleEnum } from '@architeq/core-api-client';
import { css } from '@emotion/css';
import React, { useEffect, useMemo, useRef } from 'react';

import { scrollbarStyles } from '../../../theme';
import { AiChatMessageVM, EAiChatStatus } from '../api/types';

import { ChatMessage } from './ChatMessage';

interface Props {
  messages: AiChatMessageVM[];
  onSendMessage: (message: string) => void;
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

export const MessagesList: React.FC<Props> = ({ messages, onSendMessage, onFeedback, onRetry }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  const firstAssistantIndex = useMemo(
    () =>
      messages.findIndex(
        (m) => m.role === ChatHistoryMessageRoleEnum.Assistant && m.status === EAiChatStatus.Ok
      ),
    [messages]
  );

  return (
    <div ref={containerRef} className={styles.container}>
      {messages.map((message, index) => (
        <ChatMessage
          key={message.localId}
          message={message}
          onSendMessage={onSendMessage}
          onFeedback={onFeedback}
          onRetry={onRetry}
          isLast={index === messages.length - 1}
          isFirstAssistant={index === firstAssistantIndex}
        />
      ))}
    </div>
  );
};
