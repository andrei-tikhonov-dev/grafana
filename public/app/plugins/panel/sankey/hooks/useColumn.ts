import React from 'react';

import { Field } from '@grafana/data';

export function useColumns(fields: Field[] = [], valueField: string) {
  const [columns, setColumns] = React.useState<any[]>([]);
  React.useEffect(() => {
    const newColumns = fields
      .filter(({ name }) => name !== valueField)
      .map(({ name }) => ({
        name,
        id: name,
        show: true,
      }));
    setColumns(newColumns);
  }, [fields, valueField]);

  const moveColumn = (dragIndex: number, hoverIndex: number) => {
    const newColumns = Array.from(columns);
    const [movedColumn] = newColumns.splice(dragIndex, 1);
    newColumns.splice(hoverIndex, 0, movedColumn);
    setColumns(newColumns);
  };

  const toggleColumn = (columnId: string) => {
    setColumns(columns.map((column) => (column.id === columnId ? { ...column, show: !column.show } : column)));
  };

  return { columns, moveColumn, toggleColumn };
}
