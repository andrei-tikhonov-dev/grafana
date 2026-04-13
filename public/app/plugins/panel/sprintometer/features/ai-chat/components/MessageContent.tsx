import { ChatHistoryMessageRoleEnum } from '@architeq/core-api-client';
import { css } from '@emotion/css';
import { AlertCircle } from 'lucide-react';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { UiHorizontalGroup, UiTypography } from '../../../components/ui';
import { theme3 } from '../../../theme';
import { AiChatMessageVM, EAiChatStatus } from '../api/types';

interface Props {
  message: AiChatMessageVM;
}

const styles = {
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
};

export const MessageContent: React.FC<Props> = ({ message }) => {
  const isUser = message.role === ChatHistoryMessageRoleEnum.User;
  const isError = message.status === EAiChatStatus.Error;

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
