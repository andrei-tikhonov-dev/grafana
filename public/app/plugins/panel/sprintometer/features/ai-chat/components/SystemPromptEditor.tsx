import { css, cx } from '@emotion/css';
import { Loader2, RotateCcw, Sparkles } from 'lucide-react';
import React from 'react';

import { Input } from '../../../components/shadcn/input';
import { UiButton } from '../../../components/ui';
import { scrollbarStyles, theme3 } from '../../../theme';
import type { AiServiceClient } from '../api/aiServiceClient';
import type { AiServiceRequestContext } from '../api/aiServiceTypes';
import { usePromptEditor, MIN_TEXT_LENGTH } from '../hooks/usePromptEditor';
import { usePromptEditorStore } from '../store/promptEditorStore';

import { AiSafeguardsSection } from './AiSafeguardsSection';

interface Props {
  client: AiServiceClient;
  ctx: AiServiceRequestContext;
}

const styles = {
  container: css`
    display: flex;
    flex-direction: column;
    height: 100%;
  `,
  body: css`
    flex: 1;
    overflow-y: auto;
    padding: ${theme3.tailwind.spacing4};
    display: flex;
    flex-direction: column;
    gap: ${theme3.tailwind.spacing4};
    ${scrollbarStyles};
  `,
  loading: css`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  spinner: css`
    animation: spin 1s linear infinite;
    color: ${theme3.shadcn.mutedForeground};

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `,
  label: css`
    font-size: ${theme3.tailwind.textSm};
    font-weight: 500;
    color: ${theme3.shadcn.foreground};
    padding-bottom: ${theme3.tailwind.spacing2};
  `,
  labelRow: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${theme3.tailwind.spacing2};
  `,
  labelActions: css`
    display: flex;
    align-items: center;
    gap: ${theme3.tailwind.spacing};
    padding-bottom: ${theme3.tailwind.spacing2};
  `,
  textareaWrapper: css`
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
  `,
  textarea: css`
    flex: 1;
    min-height: 120px;
    width: 100%;
    padding: ${theme3.tailwind.spacing3};
    border: 1px solid ${theme3.shadcn.border};
    border-radius: ${theme3.shadcn.radius};
    font-size: ${theme3.tailwind.textSm};
    line-height: ${theme3.tailwind.leadingNormal};
    resize: none;
    outline: none;
    background: transparent;
    color: ${theme3.shadcn.foreground};
    ${scrollbarStyles};

    &:focus {
      border-color: ${theme3.custom.colorPrimary};
    }

    &:disabled {
      opacity: 0.5;
      pointer-events: none;
    }
  `,
  helperRow: css`
    display: flex;
    justify-content: space-between;
    margin-top: ${theme3.tailwind.spacing};
    font-size: ${theme3.tailwind.textXs};
    color: ${theme3.shadcn.mutedForeground};
  `,
  footer: css`
    display: flex;
    justify-content: flex-end;
    gap: ${theme3.tailwind.spacing2};
    padding: ${theme3.tailwind.spacing4};
    border-top: 1px solid ${theme3.shadcn.border};
  `,
};

const MAX_TEXT_LENGTH = 5000;
const MAX_NAME_LENGTH = 100;

export const SystemPromptEditor: React.FC<Props> = ({ client, ctx }) => {
  const promptConfig = usePromptEditorStore((s) => s.promptConfig);

  const {
    name,
    text,
    setName,
    setText,
    isValid,
    canSave,
    canImprove,
    showRestoreDefault,
    save,
    improve,
    restoreDefault,
    cancel,
    isSaving,
    isImproving,
    isConfigLoading,
  } = usePromptEditor(client, ctx);

  if (isConfigLoading) {
    return (
      <div className={cx(styles.container, styles.loading)}>
        <Loader2 size={24} className={styles.spinner} />
      </div>
    );
  }

  const busy = isSaving || isImproving;

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div>
          <label className={styles.label}>Template name</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={MAX_NAME_LENGTH}
            placeholder="Enter template name"
            disabled={busy}
          />
        </div>

        <div className={styles.textareaWrapper}>
          <div className={styles.labelRow}>
            <label className={styles.label}>System prompt</label>
            <div className={styles.labelActions}>
              {showRestoreDefault && (
                <UiButton variant="ghost" size="sm" onClick={restoreDefault} disabled={busy}>
                  <RotateCcw size={14} />
                  Restore default
                </UiButton>
              )}
              <UiButton variant="outline" size="sm" onClick={improve} disabled={!canImprove}>
                {isImproving ? <Loader2 size={14} className={styles.spinner} /> : <Sparkles size={14} />}
                Improve
              </UiButton>
            </div>
          </div>
          <textarea
            className={styles.textarea}
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={MAX_TEXT_LENGTH}
            disabled={busy}
          />
          <div className={styles.helperRow}>
            <span>{!isValid && text.length > 0 ? `Minimum ${MIN_TEXT_LENGTH} characters` : ''}</span>
            <span>
              {text.length} / {MAX_TEXT_LENGTH}
            </span>
          </div>
        </div>

        {promptConfig?.aiSafeguardsMarkdown && <AiSafeguardsSection markdown={promptConfig.aiSafeguardsMarkdown} />}
      </div>

      <div className={styles.footer}>
        <UiButton variant="outline" onClick={cancel} disabled={isSaving}>
          Cancel
        </UiButton>
        <UiButton onClick={save} disabled={!canSave}>
          {isSaving ? <Loader2 size={14} className={styles.spinner} /> : null}
          Save
        </UiButton>
      </div>
    </div>
  );
};
