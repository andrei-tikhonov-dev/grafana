import { css } from '@emotion/css';
import React from 'react';

import { GrafanaTheme2 } from '@grafana/data';
import { PanelDataErrorView } from '@grafana/runtime';
import { useStyles2 } from '@grafana/ui';

import { TableType } from '../constants';
import { CurrentSprint } from '../features/CurrentSprint';
import { HistoricalData } from '../features/HistoricalData';
import { SprintPlaning } from '../features/SprintPlaning';
import { TeamAdminTool } from '../features/TeamAdminTool';
import { TeamHolidaysTool } from '../features/TeamHolidaysTool';
import { TablePanelProps } from '../types';

const TablePanels = {
  [TableType.HistoricalData]: HistoricalData,
  [TableType.CurrentSprint]: CurrentSprint,
  [TableType.SprintPlaning]: SprintPlaning,
  [TableType.TeamAdminTool]: TeamAdminTool,
  [TableType.TeamHolidaysTool]: TeamHolidaysTool,
};

export const TablePanel: React.FC<TablePanelProps> = (props) => {
  const { data, fieldConfig, id } = props;
  const getStyles = (_: GrafanaTheme2) => {
    return {
      container: css`
        overflow: hidden;
        max-width: ${props.width}px;
        max-height: ${props.height}px;
      `,
    };
  };
  const styles = useStyles2(getStyles);

  if (data.series.length === 0) {
    return <PanelDataErrorView fieldConfig={fieldConfig} panelId={id} data={data} />;
  }

  const TablePanel = TablePanels[props.options.tableType];

  return (
    <div className={styles.container}>
      <TablePanel {...props} />
    </div>
  );
};
