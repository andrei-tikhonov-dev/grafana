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

const initialData: IncomingDependenciesCustomData = {
  total: 0,
  columns: [],
  innerColumns: [],
  data: [],
};

export const IncomingDependencies: React.FC<Props> = ({ width, height, data: panelData }) => {
  const { total, columns, innerColumns, data } = getGrafanaCustomData<IncomingDependenciesCustomData>(
    panelData,
    initialData
  );
  const initialExpandedRows = data.reduce((acc, row) => ({ ...acc, [row.id]: row.hasChanges }), {});

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
      <Text>Issues that depend on other teams ({total})</Text>

      <div className={styles.content}>
        <ExpandableTable
          columns={columns}
          innerColumns={innerColumns}
          data={data}
          CellContent={DependenciesCellContent}
          initialExpandedRows={initialExpandedRows}
        />
      </div>
    </div>
  );
};
