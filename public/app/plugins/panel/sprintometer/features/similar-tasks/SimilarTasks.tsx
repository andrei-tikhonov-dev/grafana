import { css, cx } from '@emotion/css';
import React from 'react';

import { PanelProps } from '@grafana/data';

import { PanelTitle, Text, ExpandableTable } from '../../components/ui';
import { theme } from '../../theme';
import { PanelOptions } from '../../types';
import { getGrafanaCustomData } from '../../utils/grafana';

import { SimilarTasksCellContent } from './components/SimilarTasksCellContent';
import { SimilarTasksCustomData } from './types';

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

const initialData: SimilarTasksCustomData = {
  columns: [],
  innerColumns: [],
  data: [],
};

export const SimilarTasks: React.FC<Props> = ({ width, height, data: panelData }) => {
  const customData = getGrafanaCustomData<SimilarTasksCustomData>(panelData, initialData);

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
      <PanelTitle>Similar issues</PanelTitle>
      <Text>
        AI-powered suggestions of issues from across the organization that are similar to your team&apos;s work
      </Text>

      <div className={styles.content}>
        <ExpandableTable
          columns={customData.columns}
          innerColumns={customData.innerColumns}
          data={customData.data}
          CellContent={SimilarTasksCellContent}
          disableExpand
        />
      </div>
    </div>
  );
};
