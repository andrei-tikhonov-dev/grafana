import { css, cx } from '@emotion/css';
import React from 'react';

import { PanelProps } from '@grafana/data';

import { UiPanelTitle } from '../../components/ui';
import { theme3 } from '../../theme/theme';
import { TPanelOptions } from '../../types';
import { getGrafanaCustomData } from '../../utils/grafana';

import { MarkdownViewer } from './components/MarkdownViewer';
import { AICustomData } from './types';

interface Props extends PanelProps<TPanelOptions> {}

const styles = {
  wrapper: css`
    align-items: center;
    display: flex;
    justify-content: space-between;
    gap: ${theme3.tailwind.spacing2};
    padding: 10px;
  `,
  button: css``,
  title: css``,
};

const initialData: AICustomData = {
  title: '',
  ai: {
    title: '',
    content: '',
  },
};

export const AI: React.FC<Props> = ({ width, height, data }) => {
  const { title, ai } = getGrafanaCustomData<AICustomData>(data, initialData);

  return (
    <div
      className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
        `
      )}
    >
      <UiPanelTitle>{title}</UiPanelTitle>

      {ai && (
        <div className={styles.button}>
          <MarkdownViewer label="View AI analysis" content={ai.content} title={ai.title} />
        </div>
      )}
    </div>
  );
};
