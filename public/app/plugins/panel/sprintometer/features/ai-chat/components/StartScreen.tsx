import { css } from '@emotion/css';
import { Sparkles } from 'lucide-react';
import React from 'react';

import { UiTypography, UiVerticalGroup } from '../../../components/ui';
import { scrollbarStyles, theme3 } from '../../../theme';
import { useAiChatContext } from '../AiChatContext';

import { QuickAction } from './QuickAction';

interface Props {
  onSendMessage: (prompt: string) => void;
}

const styles = {
  container: css`
    padding: ${theme3.tailwind.spacing8};
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 100%;
    ${scrollbarStyles};
  `,
  iconWrapper: css`
    width: 80px;
    height: 80px;
    border-radius: 9999px;
    background: linear-gradient(135deg, ${theme3.custom.colorPrimary} 0%, ${theme3.custom.colorSecondary} 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: ${theme3.tailwind.spacing8};
  `,
  icon: css`
    color: ${theme3.shadcn.primaryForeground};
    width: 40px;
    height: 40px;
  `,
  titleWrapper: css`
    text-align: center;
    margin-bottom: ${theme3.tailwind.spacing8};
  `,
  promptsWrapper: css`
    display: flex;
    flex-direction: column;
    gap: ${theme3.tailwind.spacing4};
    width: 100%;
    max-width: 600px;
  `,
  innerWrapper: css`
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 100%;
  `,
};

export const StartScreen: React.FC<Props> = ({ onSendMessage }) => {
  const { strings, startPrompts } = useAiChatContext();

  return (
    <div className={styles.container}>
      <div className={styles.innerWrapper}>
        <div className={styles.iconWrapper}>
          <Sparkles className={styles.icon} />
        </div>

        <UiVerticalGroup align="center" gap="sm" className={styles.titleWrapper}>
          <UiTypography variant="h2">{strings.startTitle}</UiTypography>
          <UiTypography variant="body">{strings.startSubtitle}</UiTypography>
        </UiVerticalGroup>

        {startPrompts.length > 0 && (
          <div className={styles.promptsWrapper}>
            {startPrompts.map((prompt, index) => (
              <QuickAction key={index} onClick={() => onSendMessage(prompt)}>
                {prompt}
              </QuickAction>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
