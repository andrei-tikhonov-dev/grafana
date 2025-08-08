import { css, cx } from '@emotion/css';
import React from 'react';

import { PanelProps } from '@grafana/data';

import { UiPanelTitle, UiText, UiExpandableTable, renderCellContent } from '../../components/ui';
import { theme } from '../../theme';
import { TPanelOptions } from '../../types';
import { getGrafanaCustomData } from '../../utils/grafana';

import { SimilarIssuesCustomData } from './types';

interface Props extends PanelProps<TPanelOptions> {}

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

const initialData: SimilarIssuesCustomData = {
  columns: [],
  innerColumns: [],
  data: [],
};

export const SimilarIssues: React.FC<Props> = ({ width, height, data }) => {
  const customData = getGrafanaCustomData<SimilarIssuesCustomData>(data, initialData);

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
      <UiPanelTitle>Similar issues</UiPanelTitle>
      <UiText>
        AI-powered suggestions of issues from across the organization that are similar to your team&apos;s work
      </UiText>

      <div className={styles.content}>
        <UiExpandableTable
          columns={customData.columns}
          innerColumns={customData.innerColumns}
          data={customData.data}
          renderCell={renderCellContent}
          disableExpand
        />
      </div>
    </div>
  );
};
