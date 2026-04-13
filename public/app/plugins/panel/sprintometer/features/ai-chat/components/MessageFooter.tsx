import { ChatFeedbackRequestValueEnum, ChatHistoryMessageRoleEnum } from '@architeq/core-api-client';
import { css } from '@emotion/css';
import { RotateCw } from 'lucide-react';
import React from 'react';

import { UiButton, UiVerticalGroup } from '../../../components/ui';
import { useClipboard } from '../../../hooks/useClipboard';
import { theme3 } from '../../../theme';
import { AiChatMessageVM, EAiChatStatus } from '../api/types';
import { useAiChatContext } from '../AiChatContext';
import { useCustomizationBanner } from '../hooks/useCustomizationBanner';
import { useAiChatStore } from '../store/aiChatStore';

import { CustomizationBanner } from './CustomizationBanner';
import { MessageButtons } from './MessageButtons';
import { SuggestedPrompts } from './SuggestedPrompts';

interface Props {
  message: AiChatMessageVM;
  isLast: boolean;
  isFirstAssistant: boolean;
  onSendMessage: (prompt: string) => void;
  onFeedback: (localId: string, value: ChatFeedbackRequestValueEnum) => void;
  onRetry: () => void;
}

const styles = {
  footerContainer: css`
    display: flex;
    justify-content: flex-end;
    margin-top: ${theme3.tailwind.spacing2};
  `,
  promptsContainer: css`
    display: flex;
    flex-direction: column;
    gap: ${theme3.tailwind.spacing2};
    margin-top: ${theme3.tailwind.spacing2};
    align-items: flex-start;
  `,
};

export const MessageFooter: React.FC<Props> = ({ message, isLast, isFirstAssistant, onSendMessage, onFeedback, onRetry }) => {
  const { instanceId, strings, userId, teamId, boardType, project, promptConfig } = useAiChatContext();
  const { hasCopied, copyToClipboard } = useClipboard();
  const messages = useAiChatStore((s) => s.chats[instanceId] || []);
  const banner = useCustomizationBanner(messages, userId, teamId, boardType, project, promptConfig);

  const isUser = message.role === ChatHistoryMessageRoleEnum.User;
  const isError = message.status === EAiChatStatus.Error;

  if (isError) {
    return (
      <div className={styles.footerContainer}>
        <UiButton variant="ghost" size="sm" onClick={onRetry} title={strings.retry}>
          <RotateCw />
        </UiButton>
      </div>
    );
  }

  const showFeedback = !isUser && message.messageId && message.status === EAiChatStatus.Ok;
  const showPrompts = !isUser && isLast && message.suggestedPrompts && message.suggestedPrompts.length > 0;
  const showBanner = isFirstAssistant && banner.isVisible;

  if (!showFeedback && !showPrompts && !showBanner) {
    return null;
  }

  return (
    <UiVerticalGroup gap="md" align="stretch">
      {showFeedback && (
        <div className={styles.footerContainer}>
          <MessageButtons
            onThumbsUp={() => onFeedback(message.localId, ChatFeedbackRequestValueEnum.Up)}
            onThumbsDown={() => onFeedback(message.localId, ChatFeedbackRequestValueEnum.Down)}
            onCopy={() => copyToClipboard(message.content)}
            isCopied={hasCopied}
            disabled={!!message.feedback}
          />
        </div>
      )}

      {showBanner && (
        <CustomizationBanner
          promptName={banner.promptName}
          hasCustomPrompt={banner.hasCustomPrompt}
          onCustomize={banner.customize}
          onDismiss={banner.dismiss}
        />
      )}

      {showPrompts && (
        <div className={styles.promptsContainer}>
          <SuggestedPrompts prompts={message.suggestedPrompts} onSendMessage={onSendMessage} />
        </div>
      )}
    </UiVerticalGroup>
  );
};
