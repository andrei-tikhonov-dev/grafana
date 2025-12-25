import { css, cx } from '@emotion/css';
import { Sparkles } from 'lucide-react';
import React, { useState } from 'react';

import { Drawer } from '@grafana/ui';

import { UiButton, UiTypography } from '../index';
import { UiMarkdown } from '../markdown/UiMarkdown';

interface Props {
  title?: string;
  content?: string;
  label: string;
  className?: string;
  onOpen?: () => void;
  isLoading?: boolean;
}

const styles = {
  drawer: css`
    padding: 20px;
  `,
  buttonWrapper: css``,
};

export const UiAiViewer: React.FC<Props> = ({ title, content, label, className, onOpen, isLoading }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => {
    setIsDrawerOpen(true);
    onOpen?.();
  };
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <>
      <div className={cx(styles.buttonWrapper, className)}>
        <UiButton onClick={openDrawer} variant="default">
          <Sparkles />
          {label}
        </UiButton>
      </div>

      {isDrawerOpen && (
        <Drawer title={title || 'AI Insights'} onClose={closeDrawer}>
          <div className={styles.drawer}>
            {isLoading ? <UiTypography>Loading...</UiTypography> : <UiMarkdown content={content || ''} />}
          </div>
        </Drawer>
      )}
    </>
  );
};
