import { css } from '@emotion/css';
import { ArrowRight } from 'lucide-react';
import React from 'react';

import { UiButton } from '../../../components/ui';
import { theme3 } from '../../../theme';
import { AI_CHAT_COLORS } from '../utils/defaults';

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const styles = {
  button: css`
    text-align: left;
    justify-content: flex-start;
    padding: ${theme3.tailwind.spacing4};
    background-color: ${AI_CHAT_COLORS.quickActionBg};
    display: flex;
    align-items: flex-start;
    white-space: normal;
    word-break: break-word;
    height: auto;
    width: 100%;
    &:hover:not(:disabled) {
      background-color: ${AI_CHAT_COLORS.quickActionHoverBg};
    }
  `,
  arrowIcon: css`
    color: ${AI_CHAT_COLORS.quickActionAccent};
    width: 20px;
    height: 20px;
    margin-right: ${theme3.tailwind.spacing2};
    margin-top: 2px;
    flex-shrink: 0;
  `,
};

export const QuickAction: React.FC<Props> = ({ children, onClick, className }) => {
  return (
    <UiButton variant="secondary" onClick={onClick} className={`${styles.button} ${className || ''}`}>
      <ArrowRight className={styles.arrowIcon} />
      {children}
    </UiButton>
  );
};
