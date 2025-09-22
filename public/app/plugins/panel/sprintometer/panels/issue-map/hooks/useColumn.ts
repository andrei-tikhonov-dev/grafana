import React from 'react';

import { Field } from '@grafana/data';

type UseColumnsOptions = {
  valueField: string;
  fields: Field[];
  initialOrder: string[];
  initialHidden: string[];
  onChange: (optionKey: 'hiddenFields' | 'fieldsOrder', value: string[]) => void;
};

function getInitialFields(fieldNames: string[], initialOrder: string[]) {
  const initialSet = new Set(initialOrder);
  const missingFields = fieldNames.filter((field) => !initialSet.has(field));
  return [...initialOrder, ...missingFields];
}

export function useColumns({ fields = [], valueField, initialOrder, initialHidden, onChange }: UseColumnsOptions) {
  const [columns, setColumns] = React.useState<any[]>([]);

  React.useEffect(() => {
    const fieldNames = fields.map(({ name }) => name);
    const names = getInitialFields(fieldNames, initialOrder);
    const newColumns = names
      .filter((name) => name !== valueField)
      .map((name) => ({
        name,
        id: name,
        show: !initialHidden.includes(name),
      }));
    setColumns(newColumns);
  }, [fields, valueField, initialOrder, initialHidden]);

  const moveColumn = (dragIndex: number, hoverIndex: number) => {
    const newColumns = Array.from(columns);
    const [movedColumn] = newColumns.splice(dragIndex, 1);
    newColumns.splice(hoverIndex, 0, movedColumn);
    onChange(
      'fieldsOrder',
      newColumns.map((column) => column.name)
    );
    setColumns(newColumns);
  };

  const toggleColumn = (columnId: string) => {
    const newColumns = columns.map((column) => (column.id === columnId ? { ...column, show: !column.show } : column));
    onChange(
      'hiddenFields',
      newColumns.filter((column) => !column.show).map((column) => column.name)
    );

    setColumns(newColumns);
  };

  return { columns, moveColumn, toggleColumn };
}
