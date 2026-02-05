import { css } from '@emotion/css';
import React from 'react';

import { PanelProps } from '@grafana/data';

import { UiExpandableTable, UiFiltersContainer, UiTypography } from '../../components/ui';
import { UiPanelContainer } from '../../components/ui/panel-container/PanelContainer';
import { usePanelAiChat } from '../../features/ai-chat';
import { TPanelOptions } from '../../types';
import { getGrafanaCustomData } from '../../utils/grafana';

import { MData } from './types';

interface IncomingDependenciesProps extends PanelProps<TPanelOptions> {}

const styles = {
  content: css`
    overflow-y: auto;
  `,
};

const initialData: MData = {
  total: 0,
  columns: [],
  innerColumns: [],
  data: [],
};

export const IncomingDependencies: React.FC<IncomingDependenciesProps> = ({
  width,
  height,
  data: panelData,
  options,
  id,
}) => {
  const { ai, ...customData } = getGrafanaCustomData<MData>(panelData, initialData);
  const { total, columns, innerColumns, data } = customData;
  const initialExpandedRows = data.reduce((acc, row) => ({ ...acc, [row.id]: row.hasChanges }), {});

  const { toggle, drawer } = usePanelAiChat({
    panelId: id,
    aiEnabled: options.aiEnabled,
    dashboard: options.incomingDependencies?.dashboard,
    metric: options.incomingDependencies?.metric,
    aiData: ai,
    mockConfig: options.aiChatMock,
  });

  return (
    <UiPanelContainer width={width} height={height} title="Incoming dependencies">
      <UiFiltersContainer suffix={toggle}>
        <UiTypography color="light">Issues that depend on other teams ({total})</UiTypography>
      </UiFiltersContainer>

      <div className={styles.content}>
        <UiExpandableTable
          columns={columns}
          innerColumns={innerColumns}
          data={data}
          initialExpandedRows={initialExpandedRows}
        />
      </div>
      {drawer}
    </UiPanelContainer>
  );
};
