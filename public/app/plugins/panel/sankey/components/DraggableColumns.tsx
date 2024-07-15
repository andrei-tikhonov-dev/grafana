import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ToolbarButtonRow } from '@grafana/ui';
import { Column } from './Column';
import { ColumnData } from '../types';

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
    <div>
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
    </div>
  );
}
