import { ChatFeedbackRequestValueEnum, ChatHistoryMessageRoleEnum } from '@architeq/core-api-client';
import { css } from '@emotion/css';
import React from 'react';

import { useAiChatContext } from '../AiChatContext';
import { EAiChatMode, EAiChatStatus } from '../api/types';
import { useAiChatStore, EMPTY_REQUEST_STATE } from '../store/aiChatStore';

import { ChatInput } from './ChatInput';
import { MessagesList } from './MessagesList';
import { StartScreen } from './StartScreen';
import { ThinkingIndicator } from './ThinkingIndicator';

interface Props {
  thinkingStageText: string;
  restoredInputText?: string;
  onSendMessage: (message: string) => void;
  onCancel: () => void;
  onRetry: () => void;
  onFeedback: (localId: string, value: ChatFeedbackRequestValueEnum) => void;
}

const styles = {
  container: css`
    display: flex;
    flex-direction: column;
    height: 100%;
  `,
  content: css`
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  `,
};

export const AIChatView: React.FC<Props> = ({
  thinkingStageText,
  restoredInputText,
  onSendMessage,
  onCancel,
  onRetry,
  onFeedback,
}) => {
  const { instanceId } = useAiChatContext();
  const openMode = useAiChatStore((s) => s.openMode);
  const messages = useAiChatStore((s) => s.chats[instanceId] || []);
  const isLoading = useAiChatStore((s) => (s.requestStates[instanceId] || EMPTY_REQUEST_STATE).isLoading);

  const lastMessage = messages[messages.length - 1];
  const showStartScreen = openMode === EAiChatMode.General && messages.length === 0 && !isLoading;

  const visibleMessages = React.useMemo(() => {
    if (
      isLoading &&
      lastMessage?.role === ChatHistoryMessageRoleEnum.Assistant &&
      lastMessage?.status === EAiChatStatus.Pending &&
      !lastMessage.content
    ) {
      return messages.slice(0, -1);
    }
    return messages;
  }, [messages, isLoading, lastMessage]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {showStartScreen ? (
          <StartScreen onSendMessage={onSendMessage} />
        ) : (
          <>
            {visibleMessages.length > 0 && (
              <MessagesList
                messages={visibleMessages}
                onSendMessage={onSendMessage}
                onFeedback={onFeedback}
                onRetry={onRetry}
              />
            )}
            {isLoading && <ThinkingIndicator text={thinkingStageText} />}
          </>
        )}
      </div>

      <ChatInput value={restoredInputText} onSend={onSendMessage} onCancel={onCancel} />
    </div>
  );
};
