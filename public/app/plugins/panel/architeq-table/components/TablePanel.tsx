import { css } from '@emotion/css';
import React from 'react';

import { GrafanaTheme2 } from '@grafana/data';
import { PanelDataErrorView } from '@grafana/runtime';
import { useStyles2 } from '@grafana/ui';

import { TableType } from '../constants';
import { CurrentSprint } from '../features/CurrentSprint';
import { GenericTable } from '../features/GenericTable';
import { HistoricalData } from '../features/HistoricalData';
import { HolidayPrefixesTool } from '../features/HolidayPrefixesTool';
import { PiAdminTool } from '../features/PiAdminTool';
import { PiNamesTool } from '../features/PiNamesTool';
import { RolesTool } from '../features/RolesTool';
import { SprintPlaning } from '../features/SprintPlaning';
import { TeamAdminTool } from '../features/TeamAdminTool';
import { TeamHolidaysTool } from '../features/TeamHolidaysTool';
import { TotalBudgetTool } from '../features/TotlaBudgetTool';
import { TablePanelProps } from '../types';

const TablePanels = {
  [TableType.HistoricalData]: HistoricalData,
  [TableType.CurrentSprint]: CurrentSprint,
  [TableType.SprintPlaning]: SprintPlaning,
  [TableType.TeamAdminTool]: TeamAdminTool,
  [TableType.TeamHolidaysTool]: TeamHolidaysTool,
  [TableType.TotalBudgetTool]: TotalBudgetTool,
  [TableType.PiAdminTool]: PiAdminTool,
  [TableType.GenericTable]: GenericTable,
  [TableType.HolidayPrefixes]: HolidayPrefixesTool,
  [TableType.RolesTool]: RolesTool,
  [TableType.PiNamesTool]: PiNamesTool,
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
