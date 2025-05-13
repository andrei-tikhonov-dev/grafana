import { css, cx } from '@emotion/css';
import React from 'react';

import { PanelProps } from '@grafana/data';

import { PanelTitle, Text, ExpandableTable } from '../../components/ui';
import { theme } from '../../theme';
import { PanelOptions } from '../../types';
import { getGrafanaCustomData } from '../../utils/grafana';

import { DependenciesCellContent } from './components/DependenciesCellContent';
import { IncomingDependenciesCustomData } from './types';

interface Props extends PanelProps<PanelOptions> {}

const styles = {
  wrapper: css`
    padding: 10px;
    font-family: ${theme.typography.fontFamily};
    display: flex;
    flex-direction: column;
  `,
  content: css`
    flex: 1 1 auto;
    padding-right: 16px;
    padding-top: 16px;
    overflow-y: auto;
  `,
  header: css`
    flex: 0 0 auto;
    display: flex;
    gap: 10px;
  `,
  summaryContainer: css`
    flex: 0 0 auto;
    display: flex;
    gap: 10px;
    width: 100%;
  `,
  select: css`
    width: 200px;
  `,
};

export const IncomingDependencies: React.FC<Props> = ({ width, height, data: panelData }) => {
  // Initial expanded rows
  const initialExpandedRows = {};

  const customData = getGrafanaCustomData<IncomingDependenciesCustomData>(panelData);

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
      <PanelTitle>Incoming dependencies</PanelTitle>
      <Text>Tasks that depend on other teams ({customData.total})</Text>

      <div className={styles.content}>
        <ExpandableTable
          columns={customData.columns}
          innerColumns={customData.innerColumns}
          data={customData.data}
          CellContent={DependenciesCellContent}
          initialExpandedRows={initialExpandedRows}
        />
      </div>
    </div>
  );
};
