import { GripVertical } from 'lucide-react';
import React, { useRef, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { UiHorizontalGroup, UiTitle } from '../../../components/ui';
import { theme3 } from '../../../theme/theme';

const HEADER_ITEM_TYPE = 'HEADER';

interface DraggableHeaderTextProps {
  index: number;
  left: number;
  textAlign: 'left' | 'center' | 'right';
  children: React.ReactNode;
  moveHeader: (dragIndex: number, hoverIndex: number) => void;
}

export const DraggableHeaderText: React.FC<DraggableHeaderTextProps> = ({
  index,
  left,
  textAlign,
  children,
  moveHeader,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: HEADER_ITEM_TYPE,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: () => {
      if (ref.current) {
        ref.current.style.cursor = 'grab';
      }
    },
  });

  const [, drop] = useDrop({
    accept: HEADER_ITEM_TYPE,
    hover(item: { index: number }) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      moveHeader(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (ref.current) {
        ref.current.style.cursor = 'grab';
      }
    };

    document.addEventListener('mouseup', handleGlobalMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, []);

  drag(drop(ref));

  return (
    <UiTitle
      ref={ref}
      style={{
        position: 'absolute',
        left: `${left}px`,
        transform: textAlign === 'center' ? 'translateX(-50%)' : textAlign === 'right' ? 'translateX(-100%)' : 'none',
        cursor: 'grab',
        opacity: isDragging ? 0.5 : 1,
        userSelect: 'none',
        fontSize: '14pt',
        fontWeight: 500,
        color: theme3.tailwind.colorGray700,
        whiteSpace: 'nowrap',
        zIndex: 10,
        transition: 'opacity 0.2s ease',
      }}
      onMouseDown={(e) => {
        if (e.currentTarget) {
          e.currentTarget.style.cursor = 'grabbing';
        }
      }}
    >
      <UiHorizontalGroup>
        <GripVertical />
        {children}
      </UiHorizontalGroup>
    </UiTitle>
  );
};
