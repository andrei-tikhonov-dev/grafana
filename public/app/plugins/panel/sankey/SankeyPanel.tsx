import React, { useMemo } from 'react';

import { PanelProps } from '@grafana/data';
import { Alert, HorizontalGroup, useTheme2, VerticalGroup } from '@grafana/ui';

import { DraggableColumns } from './components/DraggableColumns';
import { Sankey } from './components/Sankey';
import { DATA_SEPARATOR } from './constants';
import { useColumns } from './hooks/useColumn';
import { useFiltersComponent } from './hooks/useFiltersComponent';
import { useZoom } from './hooks/useZoom';
import { SankeyOptions } from './types';
import { parseData, ParseDataOptions } from './utils/parseData';
import { clampValue, getContainerSize } from './utils/utils';

export const SankeyPanel = ({ options, onOptionsChange, data, width, height, id }: PanelProps<SankeyOptions>) => {
  const theme = useTheme2();

  const {
    valueField,
    baseUrl,
    nodeWidth = 30,
    nodePadding = 30,
    labelSize = 14,
    iteration,
    nodeColor,
    filterFields = [],
  } = options;

  const handleColumnsStateChange = (optionKey: 'hiddenFields' | 'fieldsOrder', value: string[]) => {
    onOptionsChange({ ...options, [optionKey]: value });
  };

  const series = data?.series[0];

  const { columns, moveColumn, toggleColumn } = useColumns({
    fields: series?.fields,
    initialHidden: options.hiddenFields,
    initialOrder: options.fieldsOrder,
    onChange: handleColumnsStateChange,
    valueField,
  });

  const { dataFrame: filteredDataFrame, filtersComponent } = useFiltersComponent({ dataFrame: series, filterFields });

  const memoizedParseData: any = useMemo(() => {
    const dataOptions: ParseDataOptions = { dataDelimiter: DATA_SEPARATOR, valueField, baseUrl };
    return () => parseData(filteredDataFrame, columns, dataOptions);
  }, [columns, valueField, baseUrl, filteredDataFrame]);

  const { pluginData, headerData, rowsNumber } = memoizedParseData();
  const { component: zoomComponent, applyZoom } = useZoom();

  const { containerHeight, containerWidth } = getContainerSize({
    width,
    height,
    nodeWidth,
    nodePadding,
    rowsNumber,
    columnsNumber: headerData.length,
  });
  const visibleColumnsCount = columns.filter((col) => col.show).length;

  return (
    <div style={{ overflow: 'auto', height: '100%', width: '100%' }}>
      {filtersComponent}
      <div>
        <HorizontalGroup justify="space-between">
          <DraggableColumns columns={columns} moveColumn={moveColumn} toggleColumn={toggleColumn} /> {zoomComponent}
        </HorizontalGroup>
      </div>
      <div style={{ height: containerHeight, width: containerWidth }}>
        {visibleColumnsCount > 1 ? (
          <g>
            <Sankey
              data={pluginData}
              headerData={headerData}
              width={containerWidth}
              height={applyZoom(containerHeight)}
              id={id}
              textColor={theme.colors.text.primary}
              nodeColor={nodeColor}
              nodeWidth={nodeWidth}
              nodePadding={applyZoom(nodePadding)}
              labelSize={clampValue(applyZoom(labelSize), 12, 20)}
              iteration={iteration}
            />
          </g>
        ) : (
          <div style={{ paddingTop: 20 }}>
            <Alert title="Warning" severity="warning">
              <VerticalGroup>
                <div>For the chart to function correctly, at least two columns must remain visible.</div>
              </VerticalGroup>
            </Alert>
          </div>
        )}
      </div>
    </div>
  );
};
