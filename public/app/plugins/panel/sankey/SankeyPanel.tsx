import React, { useMemo } from 'react';

import { PanelProps } from '@grafana/data';
import { Alert, useTheme2, VerticalGroup } from '@grafana/ui';

import { DraggableColumns } from './components/DraggableColumns';
import { Sankey } from './components/Sankey';
import { DESCRIPTION_SEPARATOR } from './constants';
import { useColumns } from './hooks/useColumn';
import { SankeyOptions } from './types';
import { parseData, ParseDataOptions } from './utils/parseData';
import { getContainerSize } from './utils/utils';

export const SankeyPanel = ({ options, data, width, height, id }: PanelProps<SankeyOptions>) => {
  const theme = useTheme2();

  const { valueField, baseUrl, nodeWidth, nodePadding, labelSize, iteration, nodeColor } = options;

  const { columns, moveColumn, toggleColumn } = useColumns(data?.series[0]?.fields, valueField);
  const memoizedParseData: any = useMemo(() => {
    const dataOptions: ParseDataOptions = { dataDelimiter: DESCRIPTION_SEPARATOR, valueField, baseUrl };
    return () => parseData(data, columns, dataOptions);
  }, [data, columns, valueField, baseUrl]);

  const { pluginData, headerData, rowsNumber } = memoizedParseData();

  const { containerHeight, containerWidth } = getContainerSize({
    width,
    height,
    nodeWidth,
    nodePadding,
    rowsNumber,
    columnsNumber: headerData.length,
  });
  const visibleColumnsCount = columns.filter((col) => col.show).length;

  // Value Field

  return (
    <div style={{ overflow: 'auto', height: '100%', width: '100%' }}>
      <DraggableColumns columns={columns} moveColumn={moveColumn} toggleColumn={toggleColumn} />

      <div style={{ height: containerHeight, width: containerWidth }}>
        {visibleColumnsCount > 1 ? (
          <g>
            <Sankey
              data={pluginData}
              headerData={headerData}
              width={containerWidth}
              height={containerHeight}
              id={id}
              textColor={theme.colors.text.primary}
              nodeColor={nodeColor}
              nodeWidth={nodeWidth}
              nodePadding={nodePadding}
              labelSize={labelSize}
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
