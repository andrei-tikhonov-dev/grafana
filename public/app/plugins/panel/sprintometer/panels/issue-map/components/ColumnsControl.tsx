import React from 'react';

import { UiHorizontalGroup } from '../../../components/ui';
import { MColumnData } from '../types';

import { Column } from './Column';

export function ColumnsControl({
  columns,
  moveColumn,
  toggleColumn,
}: {
  columns: MColumnData[];
  moveColumn: (dragIndex: number, hoverIndex: number) => void;
  toggleColumn: (id: string) => void;
}) {
  const handleMoveLeft = (index: number) => {
    if (index > 0) {
      moveColumn(index, index - 1);
    }
  };

  const handleMoveRight = (index: number) => {
    if (index < columns.length - 1) {
      moveColumn(index, index + 1);
    }
  };

  return (
    <UiHorizontalGroup gap="xs">
      {columns.map(({ id, name, show }, index) => (
        <Column
          key={id}
          id={id}
          name={name}
          index={index}
          show={show}
          onToggle={toggleColumn}
          onMoveLeft={handleMoveLeft}
          onMoveRight={handleMoveRight}
          isFirst={index === 0}
          isLast={index === columns.length - 1}
        />
      ))}
    </UiHorizontalGroup>
  );
}
