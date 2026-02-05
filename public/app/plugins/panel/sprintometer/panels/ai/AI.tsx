import { css, cx } from '@emotion/css';
import React from 'react';

import { PanelProps } from '@grafana/data';

import { UiTypography } from '../../components/ui';
import { usePanelAiChat } from '../../features/ai-chat';
import { theme3 } from '../../theme';
import { TPanelOptions } from '../../types';
import { getGrafanaCustomData } from '../../utils/grafana';

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
  title: css``,
};

const initialData: AICustomData = {
  title: '',
  ai: {
    title: '',
    content: '',
  },
};

export const AI: React.FC<Props> = ({ width, height, data, options, id }) => {
  const { title, ai } = getGrafanaCustomData<AICustomData>(data, initialData);

  const { toggle, drawer } = usePanelAiChat({
    panelId: id,
    aiEnabled: options.aiEnabled,
    dashboard: options.ai?.dashboard,
    metric: options.ai?.metric,
    aiData: ai,
    mockConfig: options.aiChatMock,
  });

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
      <UiTypography variant="panelTitle">{title}</UiTypography>
      {toggle}
      {drawer}
    </div>
  );
};
