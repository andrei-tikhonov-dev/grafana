import { css } from '@emotion/css';
import { ArrowRight } from 'lucide-react';
import React from 'react';

import { UiButton } from '../../../components/ui';
import { theme3 } from '../../../theme';

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
    background-color: #fef8f7;
    display: flex;
    align-items: center;
    width: 100%;
    &:hover:not(:disabled) {
      background-color: #fceceb;
    }
  `,
  arrowIcon: css`
    color: #ee522e;
    width: 20px;
    height: 20px;
    margin-right: ${theme3.tailwind.spacing2};
    flex-shrink: 0;
  `,
};

export const ActionArrowButton: React.FC<Props> = ({ children, onClick, className }) => {
  return (
    <UiButton variant="secondary" onClick={onClick} className={`${styles.button} ${className || ''}`}>
      <ArrowRight className={styles.arrowIcon} />
      {children}
    </UiButton>
  );
};
