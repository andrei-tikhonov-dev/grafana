import { css } from '@emotion/css';
import { Sparkles, X } from 'lucide-react';
import React from 'react';

import { UiButton } from '../../../components/ui';
import { theme3 } from '../../../theme';

interface Props {
  promptName: string;
  hasCustomPrompt: boolean;
  onCustomize: () => void;
  onDismiss: () => void;
}

const styles = {
  container: css`
    display: flex;
    align-items: center;
    gap: ${theme3.tailwind.spacing2};
    padding: ${theme3.tailwind.spacing3} ${theme3.tailwind.spacing4};
    background: ${theme3.shadcn.muted};
    border-radius: ${theme3.shadcn.radius};
  `,
  icon: css`
    flex-shrink: 0;
    color: ${theme3.shadcn.mutedForeground};
  `,
  text: css`
    flex: 1;
    font-size: ${theme3.tailwind.textSm};
    color: ${theme3.shadcn.foreground};
  `,
  actions: css`
    display: flex;
    align-items: center;
    gap: ${theme3.tailwind.spacing};
    flex-shrink: 0;
  `,
};

export const CustomizationBanner: React.FC<Props> = ({ promptName, hasCustomPrompt, onCustomize, onDismiss }) => {
  const message = hasCustomPrompt ? `Adjust your "${promptName}" prompt` : 'Customize AI to better suit your needs';

  return (
    <div className={styles.container}>
      <Sparkles size={16} className={styles.icon} />
      <span className={styles.text}>{message}</span>
      <div className={styles.actions}>
        <UiButton variant="outline" size="sm" onClick={onCustomize}>
          Customize
        </UiButton>
        <UiButton variant="ghost" size="sm" onClick={onDismiss}>
          <X size={14} />
        </UiButton>
      </div>
    </div>
  );
};
