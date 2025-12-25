import { ChatFeedbackRequestValueEnum, ChatHistoryMessageRoleEnum } from '@architeq/core-api-client';
import { css } from '@emotion/css';
import React from 'react';

import { AiChatMessageVM, EAiChatMode, EAiChatStatus } from '../api/types';

import { ChatInput } from './ChatInput';
import { MessagesList } from './MessagesList';
import { StartScreen } from './StartScreen';
import { ThinkingIndicator } from './ThinkingIndicator';

interface Props {
  // State
  openMode: EAiChatMode;
  messages: AiChatMessageVM[];
  isLoading: boolean;
  thinkingStageText: string;
  pendingInputText?: string;

  // Config
  startTitle: string;
  startSubtitle: string;
  startPrompts: string[];
  inputPlaceholder: string;
  sendLabel: string;
  cancelLabel: string;
  retryLabel: string;

  // Handlers
  onSendMessage: (message: string) => void;
  onCancel: () => void;
  onRetry: () => void;
  onPromptClick: (prompt: string) => void;
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
  openMode,
  messages,
  isLoading,
  thinkingStageText,
  pendingInputText,
  startTitle,
  startSubtitle,
  startPrompts,
  inputPlaceholder,
  sendLabel,
  cancelLabel,
  retryLabel,
  onSendMessage,
  onCancel,
  onRetry,
  onPromptClick,
  onFeedback,
}) => {
  // Check for error state
  const lastMessage = messages[messages.length - 1];

  // Show start screen only for general mode with no messages
  const showStartScreen = openMode === EAiChatMode.General && messages.length === 0 && !isLoading;

  // Filter out empty pending assistant messages during loading
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
          <StartScreen
            title={startTitle}
            subtitle={startSubtitle}
            prompts={startPrompts}
            onPromptClick={onPromptClick}
          />
        ) : (
          <>
            {visibleMessages.length > 0 && (
              <MessagesList
                messages={visibleMessages}
                onPromptClick={onPromptClick}
                onFeedback={onFeedback}
                onRetry={onRetry}
              />
            )}
            {isLoading && <ThinkingIndicator stageText={thinkingStageText} />}
          </>
        )}
      </div>

      <ChatInput
        placeholder={inputPlaceholder}
        sendLabel={sendLabel}
        cancelLabel={cancelLabel}
        isLoading={isLoading}
        value={pendingInputText}
        onSend={onSendMessage}
        onCancel={onCancel}
      />
    </div>
  );
};
