import React from 'react';

import { DataFrame, Field, FieldType } from '@grafana/data';
import { CustomCellRendererProps, TableCellDisplayMode } from '@grafana/ui';

import { ActionsCell } from './ActionsCell';

export function addActionsColumn(data: DataFrame, handleDelete: (rowIndex: number) => void): DataFrame {
  const options = {
    type: TableCellDisplayMode.Custom,
    cellComponent: (props: CustomCellRendererProps) => {
      return <ActionsCell {...props} handleDelete={handleDelete} />;
    },
  };

  const actionsField: Field = {
    name: 'Actions',
    type: FieldType.other,
    values: [],
    config: {
      custom: {
        width: 80,
        align: 'center',
        cellOptions: options,
      },
    },
    display: () => ({ text: '', numeric: 0 }),
  };

  for (let i = 0; i < data.length; i++) {
    actionsField.values.add(null);
  }

  data.fields = [...data.fields, actionsField];

  return data;
}
