import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { ToolbarButtonRow } from '@grafana/ui';

import { ColumnData } from '../types';

import { Column } from './Column';

export function DraggableColumns({
  columns,
  moveColumn,
  toggleColumn,
}: {
  columns: ColumnData[];
  moveColumn: (dragIndex: number, hoverIndex: number) => void;
  toggleColumn: (id: string) => void;
}) {
  return (
    <DndProvider backend={HTML5Backend}>
      <ToolbarButtonRow>
        {columns.map(({ id, name, show }, index) => (
          <Column
            key={id}
            id={id}
            name={name}
            index={index}
            moveColumn={moveColumn}
            onClick={toggleColumn}
            show={show}
          />
        ))}
      </ToolbarButtonRow>
    </DndProvider>
  );
}
