import { css } from '@emotion/css';
import React from 'react';

import { PanelProps } from '@grafana/data';

import { UiExpandableTable, UiTypography } from '../../components/ui';
import { UiPanelContainer } from '../../components/ui/panel-container/PanelContainer';
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

export const IncomingDependencies: React.FC<IncomingDependenciesProps> = ({ width, height, data: panelData }) => {
  const { total, columns, innerColumns, data } = getGrafanaCustomData<MData>(panelData, initialData);
  const initialExpandedRows = data.reduce((acc, row) => ({ ...acc, [row.id]: row.hasChanges }), {});

  return (
    <UiPanelContainer width={width} height={height} title="Incoming dependencies">
      <UiTypography color="light">Issues that depend on other teams ({total})</UiTypography>

      <div className={styles.content}>
        <UiExpandableTable
          columns={columns}
          innerColumns={innerColumns}
          data={data}
          initialExpandedRows={initialExpandedRows}
        />
      </div>
    </UiPanelContainer>
  );
};
