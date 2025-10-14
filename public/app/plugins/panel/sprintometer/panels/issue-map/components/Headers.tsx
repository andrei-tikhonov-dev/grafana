import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { DraggableHeaderText } from './DraggableHeaderText';

interface HeaderProps {
  headerData: string[];
  width: number;
  className?: string;
  moveHeader: (dragIndex: number, hoverIndex: number) => void;
}

export const Headers: React.FC<HeaderProps> = ({ headerData, width, className, moveHeader }) => {
  const colWidth = width / (headerData.length - 2);

  const getHeaderConfig = (index: number) => {
    if (index === 0) {
      return { translateX: 10, textAlign: 'left' as const };
    }
    if (index === headerData.length - 2) {
      return { translateX: width, textAlign: 'right' as const };
    }
    return { translateX: colWidth * index, textAlign: 'center' as const };
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ pointerEvents: 'none' }} className={className}>
        {headerData.slice(0, -1).map((header, index) => {
          const { translateX, textAlign } = getHeaderConfig(index);
          return (
            <div key={`header-${index}`} style={{ pointerEvents: 'auto' }}>
              <DraggableHeaderText index={index} left={translateX} textAlign={textAlign} moveHeader={moveHeader}>
                {header}
              </DraggableHeaderText>
            </div>
          );
        })}
      </div>
    </DndProvider>
  );
};
