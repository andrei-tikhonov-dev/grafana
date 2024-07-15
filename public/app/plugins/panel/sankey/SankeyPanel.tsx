import React, { useMemo } from 'react';
import { PanelProps } from '@grafana/data';
import { SankeyOptions } from './types';
import { parseData, ParseDataOptions } from './utils/parseData';
import { useTheme2 } from '@grafana/ui';
import { Sankey } from './components/Sankey';
import { DraggableColumns } from './components/DraggableColumns';
import { DESCRIPTION_SEPARATOR } from './constants';
import { getContainerSize } from './utils/utils';
import { useColumns } from './hooks/useColumn';

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

  return (
    <div style={{ overflow: 'auto', height: '100%', width: '100%' }}>
      <DraggableColumns columns={columns} moveColumn={moveColumn} toggleColumn={toggleColumn} />

      <div style={{ height: containerHeight, width: containerWidth }}>
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
      </div>
    </div>
  );
};
