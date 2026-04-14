import { css, cx } from '@emotion/css';
import { Sparkles } from 'lucide-react';
import React from 'react';

import { PanelProps } from '@grafana/data';

import { UiButton, UiTypography } from '../../components/ui';
import { usePanelAiChat } from '../../features/ai-chat';
import { theme3 } from '../../theme';
import { TPanelOptions } from '../../types';
import { getGrafanaCustomData } from '../../utils/grafana';

interface Props extends PanelProps<TPanelOptions> {}

interface AICustomData {
  title: string;
}

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
};

export const AI: React.FC<Props> = ({ width, height, data, options, id }) => {
  const { title } = getGrafanaCustomData<AICustomData>(data, initialData);

  const { openGeneral, drawer } = usePanelAiChat({
    panelId: id,
    aiEnabled: options.aiEnabled,
    dashboard: options.aiDashboard,
    mockConfig: options.aiChatMock,
    panelIds: options.aiPanelIds,
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
      {options.aiEnabled && (
        <UiButton onClick={openGeneral} variant="ai">
          <Sparkles />
          AI helper
        </UiButton>
      )}
      {drawer}
    </div>
  );
};
