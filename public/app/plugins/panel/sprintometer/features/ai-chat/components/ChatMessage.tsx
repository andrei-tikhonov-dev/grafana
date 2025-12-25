import { ChatFeedbackRequestValueEnum, ChatHistoryMessageRoleEnum } from '@architeq/core-api-client';
import { css, cx } from '@emotion/css';
import { AlertCircle, RotateCw } from 'lucide-react';
import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { UiButton, UiHorizontalGroup, UiTypography } from '../../../components/ui';
import { useClipboard } from '../../../hooks/useClipboard';
import { theme3 } from '../../../theme';
import { AiChatMessageVM, EAiChatStatus } from '../api/types';

import { MessageButtons } from './MessageButtons';
import { SuggestedPrompts } from './SuggestedPrompts';

interface ChatMessageProps {
  message: AiChatMessageVM;
  onPromptClick: (prompt: string) => void;
  onFeedback: (localId: string, value: ChatFeedbackRequestValueEnum) => void;
  onRetry: () => void;
  isLast?: boolean;
}

const createStyles = () => ({
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
    background: #f3efff;
    border-radius: ${theme3.tailwind.radiusLg};
  `,
  assistantMessage: css`
    background: #f6f1f0;
    border-radius: ${theme3.tailwind.radiusLg};
  `,
  errorMessage: css`
    background: ${theme3.shadcn.destructive}15;
    border-radius: ${theme3.tailwind.radiusLg};
    border-left: 3px solid ${theme3.shadcn.destructive};
  `,
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
  markdown: css`
    color: ${theme3.shadcn.foreground};
    font-size: ${theme3.tailwind.textBase};
    line-height: ${theme3.tailwind.leadingRelaxed};

    p {
      margin: ${theme3.tailwind.spacing2} 0;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin: ${theme3.tailwind.spacing4} 0 ${theme3.tailwind.spacing2} 0;
      font-weight: ${theme3.tailwind.fontWeightSemibold};
    }

    ul,
    ol {
      margin: ${theme3.tailwind.spacing2} 0;
      padding-left: ${theme3.tailwind.spacing8};
    }

    li {
      margin: ${theme3.tailwind.spacing} 0;
    }

    code {
      background: ${theme3.shadcn.muted};
      padding: 2px 6px;
      border-radius: ${theme3.tailwind.radiusSm};
      font-family: ${theme3.tailwind.fontMono};
      font-size: ${theme3.tailwind.textSm};
    }

    pre {
      background: ${theme3.shadcn.muted};
      padding: ${theme3.tailwind.spacing2};
      border-radius: ${theme3.tailwind.radiusMd};
      overflow-x: auto;
      margin: ${theme3.tailwind.spacing2} 0;

      code {
        background: none;
        padding: 0;
      }
    }

    blockquote {
      border-left: 3px solid ${theme3.shadcn.border};
      padding-left: ${theme3.tailwind.spacing2};
      margin: ${theme3.tailwind.spacing2} 0;
      color: ${theme3.shadcn.mutedForeground};
    }

    table {
      border-collapse: collapse;
      width: 100%;
      margin: ${theme3.tailwind.spacing2} 0;
    }

    th,
    td {
      border: 1px solid ${theme3.shadcn.border};
      padding: ${theme3.tailwind.spacing2};
      text-align: left;
    }

    th {
      background: ${theme3.shadcn.muted};
      font-weight: ${theme3.tailwind.fontWeightSemibold};
    }
  `,
});

const MessageContent: React.FC<{
  message: AiChatMessageVM;
  isUser: boolean;
  isError: boolean;
  styles: ReturnType<typeof createStyles>;
}> = ({ message, isUser, isError, styles }) => {
  if (isUser) {
    return (
      <UiTypography variant="body" as="span">
        {message.content}
      </UiTypography>
    );
  }

  if (isError) {
    return (
      <UiHorizontalGroup justify="start" gap="sm">
        <AlertCircle size={16} />
        <UiTypography variant="body" as="span">
          {message.errorMessage || 'An error occurred'}
        </UiTypography>
      </UiHorizontalGroup>
    );
  }

  return (
    <div className={styles.markdown}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
    </div>
  );
};

const MessageFooter: React.FC<{
  message: AiChatMessageVM;
  isUser: boolean;
  isError: boolean;
  isLast: boolean;
  onFeedback: (localId: string, value: ChatFeedbackRequestValueEnum) => void;
  onPromptClick: (prompt: string) => void;
  onRetry: () => void;
  styles: ReturnType<typeof createStyles>;
}> = ({ message, isUser, isError, isLast, onFeedback, onPromptClick, onRetry, styles }) => {
  const { hasCopied, copyToClipboard } = useClipboard();

  if (isError) {
    return (
      <div className={styles.footerContainer}>
        <UiButton variant="ghost" size="sm" onClick={onRetry} title="Retry">
          <RotateCw />
        </UiButton>
      </div>
    );
  }

  const showFeedback = !isUser && message.messageId && message.status === EAiChatStatus.Ok;
  const showPrompts = !isUser && isLast && message.suggestedPrompts && message.suggestedPrompts.length > 0;

  if (!showFeedback && !showPrompts) {
    return null;
  }

  return (
    <>
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

      {showPrompts && (
        <div className={styles.promptsContainer}>
          <SuggestedPrompts prompts={message.suggestedPrompts} onPromptClick={onPromptClick} />
        </div>
      )}
    </>
  );
};

export const ChatMessage: React.FC<ChatMessageProps> = React.memo(
  ({ message, onPromptClick, onFeedback, onRetry, isLast = false }) => {
    const styles = useMemo(() => createStyles(), []);

    const isUser = message.role === ChatHistoryMessageRoleEnum.User;
    const isError = message.status === EAiChatStatus.Error;

    const wrapperClassName = useMemo(
      () => cx(styles.wrapper, isUser ? styles.userWrapper : styles.assistantWrapper),
      [isUser, styles]
    );

    const containerClassName = useMemo(
      () => cx(styles.messageContainer, isUser ? styles.userMessage : styles.assistantMessage),
      [isUser, styles]
    );

    return (
      <div className={wrapperClassName}>
        <div className={containerClassName}>
          <MessageContent message={message} isUser={isUser} isError={isError} styles={styles} />
        </div>

        <MessageFooter
          message={message}
          isUser={isUser}
          isError={isError}
          isLast={isLast}
          onFeedback={onFeedback}
          onPromptClick={onPromptClick}
          onRetry={onRetry}
          styles={styles}
        />
      </div>
    );
  }
);
