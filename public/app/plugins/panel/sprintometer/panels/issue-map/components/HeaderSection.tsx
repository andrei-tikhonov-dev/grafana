import React from 'react';

import { UiAiViewer, UiHorizontalGroup, UiVerticalGroup } from '../../../components/ui';
import { TAiData } from '../../../types';

import { ColumnsControl } from './ColumnsControl';
import { Headers } from './Headers';

interface HeaderSectionProps {
  filtersComponent: React.ReactNode;
  ai: TAiData;
  columns: any[];
  moveColumn: (dragIndex: number, hoverIndex: number) => void;
  toggleColumn: (fieldName: string) => void;
  zoomComponent: React.ReactNode;
  headerData: any[];
  sankeyWidth: number;
}

export const HeaderSection: React.FC<HeaderSectionProps> = React.memo(
  ({ filtersComponent, ai, columns, moveColumn, toggleColumn, zoomComponent, headerData, sankeyWidth }) => {
    return (
      <>
        <UiVerticalGroup align="stretch" gap="sm">
          <UiHorizontalGroup justify="space-between">
            {filtersComponent}
            {ai && <UiAiViewer label="View AI analysis" content={ai.content} title={ai.title} />}
          </UiHorizontalGroup>
          <UiHorizontalGroup justify="space-between">
            <ColumnsControl columns={columns} moveColumn={moveColumn} toggleColumn={toggleColumn} />
            {zoomComponent}
          </UiHorizontalGroup>
        </UiVerticalGroup>
        <Headers headerData={headerData} width={sankeyWidth} moveHeader={moveColumn} />
      </>
    );
  }
);

HeaderSection.displayName = 'HeaderSection';
