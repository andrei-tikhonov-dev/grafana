import { css, cx } from '@emotion/css';
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { DRAGGABLE_HEADERS_HEIGHT } from '../constants';

import { DraggableHeaderText } from './DraggableHeaderText';

interface HeaderProps {
  headerData: Array<{ name: string; show: boolean }>;
  width: number;
  className?: string;
  moveHeader: (dragIndex: number, hoverIndex: number) => void;
}

export const Headers: React.FC<HeaderProps> = ({ headerData, width, className, moveHeader }) => {
  const visibleHeaders = headerData.filter((h) => h.show).slice(0, -1);
  const colWidth = width / (visibleHeaders.length - 1);

  const getHeaderConfig = (visibleIndex: number) => {
    if (visibleIndex === 0) {
      return { translateX: 0, textAlign: 'left' as const };
    }
    if (visibleIndex === visibleHeaders.length - 1) {
      return { translateX: width, textAlign: 'right' as const };
    }
    return { translateX: colWidth * visibleIndex, textAlign: 'center' as const };
  };

  const draggableHeaderStyles = css`
    width: ${width}px;
    overflow: hidden;
    position: relative;
    padding: 0;
    min-height: ${DRAGGABLE_HEADERS_HEIGHT}px;
  `;

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ pointerEvents: 'none' }} className={cx(draggableHeaderStyles, className)}>
        {visibleHeaders.map((header, visibleIndex) => {
          const originalIndex = headerData.findIndex((h) => h.name === header.name);
          const { translateX, textAlign } = getHeaderConfig(visibleIndex);
          return (
            <div key={`header-${originalIndex}`} style={{ pointerEvents: 'auto' }}>
              <DraggableHeaderText
                index={originalIndex}
                left={translateX}
                textAlign={textAlign}
                moveHeader={moveHeader}
              >
                {header.name}
              </DraggableHeaderText>
            </div>
          );
        })}
      </div>
    </DndProvider>
  );
};
