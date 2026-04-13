import { ChatFeedbackRequestValueEnum } from '@architeq/core-api-client';
import { css } from '@emotion/css';
import React, { useState } from 'react';

import { Modal } from '@grafana/ui';

import { UiButton, UiTypography, UiVerticalGroup } from '../../../components/ui';
import { theme3 } from '../../../theme';
import { useAiChatContext } from '../AiChatContext';
import { useAiChatStore } from '../store/aiChatStore';

import { QuickAction } from './QuickAction';

interface Props {
  onSubmit: (comment: string) => void;
}

const styles = {
  modal: css`
    max-width: 500px;
  `,
  textArea: css`
    width: 100%;
    min-height: 100px;
    padding: ${theme3.tailwind.spacing4};
    border: 1px solid ${theme3.shadcn.border};
    border-radius: ${theme3.tailwind.radiusSm};
    font-family: ${theme3.tailwind.fontSans};
    font-size: ${theme3.tailwind.textSm};
    line-height: ${theme3.tailwind.leadingNormal};
    resize: vertical;
    outline: none;

    &:focus {
      border-color: ${theme3.custom.colorPrimary};
    }
  `,
  hint: css`
    font-size: ${theme3.tailwind.textXs};
    color: ${theme3.shadcn.mutedForeground};
  `,
  charCount: css`
    font-size: ${theme3.tailwind.textXs};
    color: ${theme3.shadcn.mutedForeground};
    text-align: right;
  `,
};

const MAX_COMMENT_LENGTH = 1000;

export const FeedbackModal: React.FC<Props> = ({ onSubmit }) => {
  const { strings, feedbackReasons } = useAiChatContext();
  const feedbackModal = useAiChatStore((s) => s.feedbackModal);
  const closeFeedbackModal = useAiChatStore((s) => s.closeFeedbackModal);

  const [showOther, setShowOther] = useState(false);
  const [otherText, setOtherText] = useState('');

  const isPositive = feedbackModal.value === ChatFeedbackRequestValueEnum.Up;
  const title = isPositive ? strings.feedbackTitleUp : strings.feedbackTitleDown;
  const reasons = isPositive ? feedbackReasons.up : feedbackReasons.down;

  const handleReasonClick = (reason: string) => {
    onSubmit(reason);
    handleClose();
  };

  const handleOtherClick = () => {
    setShowOther(true);
  };

  const handleSubmitOther = () => {
    const trimmed = otherText.trim();
    if (trimmed) {
      onSubmit(trimmed);
      handleClose();
    }
  };

  const handleClose = () => {
    setShowOther(false);
    setOtherText('');
    closeFeedbackModal();
  };

  if (!feedbackModal.isOpen) {
    return null;
  }

  return (
    <Modal title={title} isOpen={feedbackModal.isOpen} onDismiss={handleClose} className={styles.modal}>
      <UiVerticalGroup gap="md">
        {!showOther ? (
          <>
            {reasons.map((reason, index) => (
              <QuickAction key={index} onClick={() => handleReasonClick(reason)}>
                {reason}
              </QuickAction>
            ))}

            <QuickAction onClick={handleOtherClick}>{strings.other}</QuickAction>
          </>
        ) : (
          <>
            <UiTypography variant="body" className={styles.hint}>
              {strings.feedbackHintOther}
            </UiTypography>

            <textarea
              className={styles.textArea}
              value={otherText}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= MAX_COMMENT_LENGTH) {
                  setOtherText(value);
                }
              }}
              placeholder={strings.feedbackPlaceholder}
              autoFocus
            />

            <div className={styles.charCount}>
              {otherText.length} / {MAX_COMMENT_LENGTH}
            </div>

            <UiButton variant="default" onClick={handleSubmitOther} disabled={!otherText.trim()}>
              {strings.submit}
            </UiButton>
          </>
        )}
      </UiVerticalGroup>
    </Modal>
  );
};
