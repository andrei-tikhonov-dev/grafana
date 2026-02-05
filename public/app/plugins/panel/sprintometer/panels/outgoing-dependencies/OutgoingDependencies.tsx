import { css } from '@emotion/css';
import React from 'react';

import { PanelProps } from '@grafana/data';

import { UiExpandableTable, UiFiltersContainer, renderCellContent, UiTypography } from '../../components/ui';
import { UiPanelContainer } from '../../components/ui/panel-container/PanelContainer';
import { usePanelAiChat } from '../../features/ai-chat';
import { TPanelOptions } from '../../types';
import { getGrafanaCustomData } from '../../utils/grafana';

import { OutgoingArtDependenciesCustomData } from './types';

interface Props extends PanelProps<TPanelOptions> {}

const styles = {
  content: css`
    flex: 1 1 auto;
    overflow-y: auto;
  `,
};

const initialData: OutgoingArtDependenciesCustomData = {
  columns: [],
  innerColumns: [],
  data: [],
  total: 0,
};

export const OutgoingDependencies: React.FC<Props> = ({ width, height, data: panelData, options, id }) => {
  const { ai, ...customData } = getGrafanaCustomData<OutgoingArtDependenciesCustomData>(panelData, initialData);
  const { total, columns, innerColumns, data } = customData;

  const { toggle, drawer } = usePanelAiChat({
    panelId: id,
    aiEnabled: options.aiEnabled,
    dashboard: options.outgoingDependencies?.dashboard,
    metric: options.outgoingDependencies?.metric,
    aiData: ai,
    mockConfig: options.aiChatMock,
  });

  return (
    <UiPanelContainer width={width} height={height} title="Outgoing dependencies">
      <UiFiltersContainer suffix={toggle}>
        <UiTypography color="light">Issues other teams depend on ({total})</UiTypography>
      </UiFiltersContainer>

      <div className={styles.content}>
        <UiExpandableTable
          columns={columns}
          innerColumns={innerColumns}
          data={data}
          renderCell={renderCellContent}
          disableExpand
        />
      </div>
      {drawer}
    </UiPanelContainer>
  );
};
