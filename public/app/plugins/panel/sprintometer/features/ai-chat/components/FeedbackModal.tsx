import { css } from '@emotion/css';
import React, { useState } from 'react';

import { Modal } from '@grafana/ui';

import { UiButton, UiTypography, UiVerticalGroup } from '../../../components/ui';
import { theme3 } from '../../../theme';

import { ActionArrowButton } from './ActionArrowButton';

interface Props {
  isOpen: boolean;
  title: string;
  reasons: string[];
  otherLabel: string;
  submitLabel: string;
  otherHint: string;
  onSubmit: (comment: string) => void;
  onClose: () => void;
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

export const FeedbackModal: React.FC<Props> = ({
  isOpen,
  title,
  reasons,
  otherLabel,
  submitLabel,
  otherHint,
  onSubmit,
  onClose,
}) => {
  const [showOther, setShowOther] = useState(false);
  const [otherText, setOtherText] = useState('');

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
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Modal title={title} isOpen={isOpen} onDismiss={handleClose} className={styles.modal}>
      <UiVerticalGroup gap="md">
        {!showOther ? (
          <>
            {reasons.map((reason, index) => (
              <ActionArrowButton key={index} onClick={() => handleReasonClick(reason)}>
                {reason}
              </ActionArrowButton>
            ))}

            <ActionArrowButton onClick={handleOtherClick}>{otherLabel}</ActionArrowButton>
          </>
        ) : (
          <>
            <UiTypography variant="body" className={styles.hint}>
              {otherHint}
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
              placeholder="Type your feedback here..."
              autoFocus
            />

            <div className={styles.charCount}>
              {otherText.length} / {MAX_COMMENT_LENGTH}
            </div>

            <UiButton variant="default" onClick={handleSubmitOther} disabled={!otherText.trim()}>
              {submitLabel}
            </UiButton>
          </>
        )}
      </UiVerticalGroup>
    </Modal>
  );
};
