import { css, cx } from '@emotion/css';
import React, { useState } from 'react';

import { Drawer } from '@grafana/ui';

import { UiButton } from '../../../components/ui';

import { Markdown } from './Markdown';

interface Props {
  title: string;
  content: string;
  label: string;
  className?: string;
}

const styles = {
  drawer: css`
    padding: 20px;
  `,
  buttonWrapper: css``,
};

export const MarkdownViewer: React.FC<Props> = ({ title, content, label, className }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <>
      <div className={cx(styles.buttonWrapper, className)}>
        <UiButton onClick={openDrawer} variant="default">
          {label}
        </UiButton>
      </div>

      {isDrawerOpen && (
        <Drawer title={title} onClose={closeDrawer}>
          <div className={styles.drawer}>
            <Markdown content={content} />
          </div>
        </Drawer>
      )}
    </>
  );
};
