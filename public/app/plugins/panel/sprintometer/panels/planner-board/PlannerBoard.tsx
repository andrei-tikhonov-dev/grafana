import { css, cx } from '@emotion/css';
import React from 'react';

import { PanelProps } from '@grafana/data';

import { ScrollArea } from '../../components/shadcn/scroll-area';
import { UiPanelTitle } from '../../components/ui';
import { UiZeroState } from '../../components/ui/zero-state/UiZeroState';
import { TPanelOptions } from '../../types';
import { getGrafanaCustomData } from '../../utils/grafana';

import { DataTable } from './components/DataTable';
import { MPlannerBoardCustom } from './types';
import { convertToTableFormat } from './utils';

interface Props extends PanelProps<TPanelOptions> {}

const styles = {
  wrapper: css`
    padding: 10px;
    display: flex;
    flex-direction: column;
  `,
  content: css`
    flex: 1 1 auto;
    padding-right: 16px;
    padding-top: 16px;
    overflow-y: auto;
  `,
  headerInfo: css`
    display: flex;
    gap: 24px;
  `,
  headerInfoItem: css`
    display: flex;
    align-items: center;
    gap: 0.5rem;
  `,
};

const initialData: MPlannerBoardCustom = {
  teams: [],
  phases: [],
};

export const PlannerBoard: React.FC<Props> = ({ width, height, data }) => {
  const { zeroState, phases, teams } = getGrafanaCustomData<MPlannerBoardCustom>(data, initialData);

  const tableData = convertToTableFormat({ phases, teams });

  if (zeroState) {
    return <UiZeroState {...zeroState} />;
  }

  return (
    <ScrollArea
      className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
        `
      )}
    >
      <UiPanelTitle>Planner board</UiPanelTitle>
      <DataTable {...tableData} width={width} />
    </ScrollArea>
  );
};
