import { css, cx } from '@emotion/css';
import { Sparkles } from 'lucide-react';
import React from 'react';

import { PanelProps } from '@grafana/data';

import { UiAiViewer, UiButton, UiTypography } from '../../components/ui';
import { useAiChatDrawer } from '../../features/ai-chat';
import { useGrafanaVariables } from '../../hooks/useGrafanaVariables';
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

export const AI: React.FC<Props> = ({ width, height, data, options }) => {
  const { title, ai } = getGrafanaCustomData<AICustomData>(data, initialData);

  const grafanaVariables = useGrafanaVariables(['team', 'project']);

  // AI Chat Drawer
  const { openAutoSummary, drawer } = useAiChatDrawer({
    teamId: grafanaVariables.team as string,
    project: grafanaVariables.project as string,
    dashboard: options.ai?.dashboard,
    metric: options.ai?.metric,
    startScreen: {
      title: 'Your sprint, explained instantly',
      subtitle: 'Choose a question to get data-driven insights',
      prompts: [
        'Check the pulse of your sprint and spot problems early',
        'Understand how your team is doing & where improvement is possible',
        'Predict outcomes and understand "what-ifs"',
        'Learn from historical data and uncover recurring patterns',
      ],
    },
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
      {ai ? (
        <UiAiViewer title={ai?.title} content={ai?.content} label="AI data" />
      ) : (
        <UiButton onClick={openAutoSummary} variant="ai">
          <Sparkles />
          AI helper
        </UiButton>
      )}
      {drawer}
    </div>
  );
};
