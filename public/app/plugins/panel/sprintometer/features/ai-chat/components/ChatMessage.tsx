import { ChatFeedbackRequestValueEnum, ChatHistoryMessageRoleEnum } from '@architeq/core-api-client';
import { css, cx } from '@emotion/css';
import React, { useMemo } from 'react';

import { theme3 } from '../../../theme';
import { AiChatMessageVM } from '../api/types';
import { AI_CHAT_COLORS } from '../utils/defaults';

import { MessageContent } from './MessageContent';
import { MessageFooter } from './MessageFooter';

interface Props {
  message: AiChatMessageVM;
  isLast?: boolean;
  isFirstAssistant?: boolean;
  onSendMessage: (message: string) => void;
  onFeedback: (localId: string, value: ChatFeedbackRequestValueEnum) => void;
  onRetry: () => void;
}

const styles = {
  wrapper: css`
    display: flex;
    flex-direction: column;
    margin-bottom: ${theme3.tailwind.spacing4};
    max-width: 95%;
  `,
  userWrapper: css`
    align-self: flex-end;
    margin-left: auto;
  `,
  assistantWrapper: css`
    align-self: flex-start;
    margin-right: auto;
  `,
  messageContainer: css`
    padding: ${theme3.tailwind.spacing4};
    text-align: left;
  `,
  userMessage: css`
    background: ${AI_CHAT_COLORS.userMessageBg};
    border-radius: ${theme3.tailwind.radiusLg};
  `,
  assistantMessage: css`
    background: ${AI_CHAT_COLORS.assistantMessageBg};
    border-radius: ${theme3.tailwind.radiusLg};
  `,
};

export const ChatMessage: React.FC<Props> = React.memo(
  function ChatMessage({ message, isLast = false, isFirstAssistant = false, onSendMessage, onFeedback, onRetry }) {
    const isUser = message.role === ChatHistoryMessageRoleEnum.User;

    const wrapperClassName = useMemo(
      () => cx(styles.wrapper, isUser ? styles.userWrapper : styles.assistantWrapper),
      [isUser]
    );

    const containerClassName = useMemo(
      () => cx(styles.messageContainer, isUser ? styles.userMessage : styles.assistantMessage),
      [isUser]
    );

    return (
      <div className={wrapperClassName}>
        <div className={containerClassName}>
          <MessageContent message={message} />
        </div>

        <MessageFooter
          message={message}
          isLast={isLast}
          isFirstAssistant={isFirstAssistant}
          onSendMessage={onSendMessage}
          onFeedback={onFeedback}
          onRetry={onRetry}
        />
      </div>
    );
  }
);
