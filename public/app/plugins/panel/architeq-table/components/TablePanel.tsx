import React from 'react';

import { PanelDataErrorView } from '@grafana/runtime';

import { TableType } from '../constants';
import { CurrentSprint } from '../features/CurrentSprint';
import { HistoricalData } from '../features/HistoricalData';
import { SprintPlaning } from '../features/SprintPlaning';
import { TablePanelProps } from '../types';

const TablePanels = {
  [TableType.HistoricalData]: HistoricalData,
  [TableType.CurrentSprint]: CurrentSprint,
  [TableType.SprintPlaning]: SprintPlaning,
};

export const TablePanel: React.FC<TablePanelProps> = (props) => {
  const { data, fieldConfig, id } = props;

  if (data.series.length === 0) {
    return <PanelDataErrorView fieldConfig={fieldConfig} panelId={id} data={data} />;
  }

  const TablePanel = TablePanels[props.options.tableType];

  return <TablePanel {...props} />;
};
