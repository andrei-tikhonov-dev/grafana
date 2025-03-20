import React, { useMemo } from 'react';

import { DataFrame, PanelProps } from '@grafana/data';
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

function validateOptions(options: SankeyOptions, series: DataFrame) {
  const availableFields = series.fields.map((f) => f.name);

  return {
    ...options,
    fieldsOrder: options.fieldsOrder?.filter((f) => availableFields.includes(f)),
    filterFields: options.filterFields?.filter((f) => availableFields.includes(f)),
    hiddenFields: options.hiddenFields?.filter((f) => availableFields.includes(f)),
  };
}

export const SankeyPanel = ({ options, onOptionsChange, data, width, height, id }: PanelProps<SankeyOptions>) => {
  const theme = useTheme2();
  const series = data?.series[0];
  const validatedOptions = useMemo(() => validateOptions(options, series), [options, series]);

  const initialFilters = useMemo(() => {
    try {
      return options.initialFilters ? JSON.parse(options.initialFilters) : {};
    } catch (e) {
      console.error('Error parsing initialFilters', e);
      return {};
    }
  }, [options.initialFilters]);

  const {
    valueField,
    baseUrl,
    nodeWidth = 30,
    nodePadding = 30,
    labelSize = 14,
    iteration,
    nodeColor,
    filterFields = [],
  } = validatedOptions;

  const handleColumnsStateChange = (optionKey: 'hiddenFields' | 'fieldsOrder', value: string[]) => {
    onOptionsChange({ ...validatedOptions, [optionKey]: value });
  };

  const handleFilterChange = (filters: Record<string, string[]>) => {
    onOptionsChange({
      ...validatedOptions,
      initialFilters: JSON.stringify(filters),
    });
  };

  const { columns, moveColumn, toggleColumn } = useColumns({
    fields: series?.fields,
    initialHidden: validatedOptions.hiddenFields,
    initialOrder: validatedOptions.fieldsOrder,
    onChange: handleColumnsStateChange,
    valueField,
  });

  const { dataFrame: filteredDataFrame, filtersComponent } = useFiltersComponent({
    dataFrame: series,
    filterFields,
    initialFilters,
    onFilterChange: handleFilterChange,
  });

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
