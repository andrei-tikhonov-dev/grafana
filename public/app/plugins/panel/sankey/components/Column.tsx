import { css } from '@emotion/css';
import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { ToolbarButton } from '@grafana/ui';

const ITEM_TYPE = 'COLUMN';

interface ColumnProps {
  id: string;
  name: string;
  index: number;
  show: boolean;
  moveColumn: (dragIndex: number, hoverIndex: number) => void;
  onClick: (id: string) => void;
}

export const Column: React.FC<ColumnProps> = ({ id, name, index, moveColumn, show, onClick }) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    hover(item: { index: number }) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      moveColumn(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE,
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const draggableStyle = css`
    opacity: ${isDragging ? 0.5 : 1};
    & svg {
      cursor: move !important;
    }
  `;

  return (
    <div ref={ref} className={draggableStyle}>
      <ToolbarButton variant={show ? 'active' : 'canvas'} icon="draggabledots" onClick={() => onClick(id)}>
        {name}
      </ToolbarButton>
    </div>
  );
};
