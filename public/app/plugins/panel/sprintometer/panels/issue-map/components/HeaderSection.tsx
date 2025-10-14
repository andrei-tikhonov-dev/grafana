import React from 'react';

import { UiHorizontalGroup, UiVerticalGroup } from '../../../components/ui';

import { ColumnsControl } from './ColumnsControl';
import { Headers } from './Headers';

interface HeaderSectionProps {
  filtersComponent: React.ReactNode;
  columns: any[];
  moveColumn: (dragIndex: number, hoverIndex: number) => void;
  toggleColumn: (fieldName: string) => void;
  zoomComponent: React.ReactNode;
  headerData: any[];
  sankeyWidth: number;
  draggableHeaderStyles: string;
}

export const HeaderSection: React.FC<HeaderSectionProps> = React.memo(
  ({
    filtersComponent,
    columns,
    moveColumn,
    toggleColumn,
    zoomComponent,
    headerData,
    sankeyWidth,
    draggableHeaderStyles,
  }) => (
    <>
      <UiVerticalGroup align="stretch" gap="sm">
        {filtersComponent}
        <UiHorizontalGroup justify="space-between">
          <ColumnsControl columns={columns} moveColumn={moveColumn} toggleColumn={toggleColumn} />
          {zoomComponent}
        </UiHorizontalGroup>
      </UiVerticalGroup>
      <Headers headerData={headerData} width={sankeyWidth} moveHeader={moveColumn} className={draggableHeaderStyles} />
    </>
  )
);

HeaderSection.displayName = 'HeaderSection';
