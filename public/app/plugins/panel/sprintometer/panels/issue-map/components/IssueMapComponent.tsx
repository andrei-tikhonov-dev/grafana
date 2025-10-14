import { css } from '@emotion/css';
import React, { useMemo, useCallback } from 'react';

import { ScrollArea, ScrollBar } from '../../../components/shadcn/scroll-area';
import { usePluginState } from '../../../hooks/usePluginState';
import { useZoom } from '../../../hooks/useZoom';
import { getGrafanaCustomData } from '../../../utils/grafana';
import { IssueMapProps } from '../IssueMap';
import { DEFAULT_OPTIONS, DRAGGABLE_HEADERS_HEIGHT, LABEL_SIZE_CONSTRAINTS } from '../constants';
import { useColumns } from '../hooks/useColumns';
import { useFiltersComponent } from '../hooks/useFiltersComponent';
import { IssueMapCustomData } from '../types';
import { parseData } from '../utils/parseData';
import { clampValue, getSankeySize, getScrollAreaHeigh } from '../utils/utils';

import { HeaderSection } from './HeaderSection';
import { SankeyContent } from './SankeyContent';

interface IssueMapState {
  hiddenFields: string[];
  fieldsOrder: string[];
  filters: Record<string, string[]>;
}

const INITIAL_STATE: IssueMapState = {
  hiddenFields: [],
  fieldsOrder: [],
  filters: {},
};

const useIssueMapStyles = (width: number, height: number, sankeyWidth: number, hasFilters: boolean) => {
  return useMemo(
    () => ({
      panel: css`
        height: ${height}px;
        width: ${width}px;
        overflow: hidden;
      `,
      headerContainer: css`
        width: ${sankeyWidth}px;
        overflow: hidden;
      `,
      draggableHeader: css`
        padding: 20px;
        width: ${sankeyWidth}px;
        overflow: hidden;
        height: ${DRAGGABLE_HEADERS_HEIGHT}px;
      `,
      scrollArea: css`
        height: ${getScrollAreaHeigh(height, hasFilters)}px;
        width: ${sankeyWidth}px;
      `,
    }),
    [width, height, sankeyWidth, hasFilters]
  );
};

const useSankeyData = (dataFrame: any, columns: any[], valueField: string) => {
  return useMemo(() => {
    const parsed = parseData(dataFrame, columns, { valueField });
    return {
      pluginData: parsed.pluginData,
      headerData: parsed.headerData,
      rowsNumber: parsed.rowsNumber,
    };
  }, [dataFrame, columns, valueField]);
};

const useSankeyDimensions = (
  width: number,
  height: number,
  nodeWidth: number,
  nodePadding: number,
  rowsNumber: number,
  columnsNumber: number
) => {
  return useMemo(
    () =>
      getSankeySize({
        width,
        height,
        nodeWidth,
        nodePadding,
        rowsNumber,
        columnsNumber,
      }),
    [width, height, nodeWidth, nodePadding, rowsNumber, columnsNumber]
  );
};

const initialData: IssueMapCustomData = {
  ai: {
    title: '',
    content: '',
  },
  valueField: '',
};

export const IssueMapComponent: React.FC<IssueMapProps> = ({ options, onOptionsChange, data, width, height, id }) => {
  const series = data?.series[0];
  const issueMapOptions = options.sankey;
  const { filterFields = [] } = issueMapOptions;
  const { valueField } = getGrafanaCustomData<IssueMapCustomData>(data, initialData);

  const nodeWidth = DEFAULT_OPTIONS.NODE_WIDTH;
  const nodePadding = DEFAULT_OPTIONS.NODE_PADDING;
  const labelSize = DEFAULT_OPTIONS.LABEL_SIZE;
  const hasFilters = filterFields.length > 0;

  const [state, setState] = usePluginState<IssueMapState>(options, onOptionsChange, INITIAL_STATE);

  const { hiddenFields, fieldsOrder, filters } = state;

  const handleColumnsStateChange = useCallback(
    (optionKey: 'hiddenFields' | 'fieldsOrder', value: string[]) => {
      setState((prevState) => ({
        ...prevState,
        [optionKey]: value,
      }));
    },
    [setState]
  );

  const handleFilterChange = useCallback(
    (newFilters: Record<string, string[]>) => {
      setState((prevState) => ({
        ...prevState,
        filters: newFilters,
      }));
    },
    [setState]
  );

  const { columns, moveColumn, toggleColumn } = useColumns({
    fields: series?.fields,
    initialHidden: hiddenFields,
    initialOrder: fieldsOrder,
    onChange: handleColumnsStateChange,
    valueField,
  });

  const { dataFrame: filteredDataFrame, filtersComponent } = useFiltersComponent({
    dataFrame: series,
    filterFields,
    initialFilters: filters,
    onFilterChange: handleFilterChange,
  });

  const { pluginData, headerData, rowsNumber } = useSankeyData(filteredDataFrame, columns, valueField);
  const { component: zoomComponent, applyZoom } = useZoom();
  const visibleColumnsCount = useMemo(() => columns.filter((col) => col.show).length, [columns]);

  const { sankeyHeight, sankeyWidth } = useSankeyDimensions(
    width,
    height,
    nodeWidth,
    nodePadding,
    rowsNumber,
    headerData.length
  );

  const zoomedSankeyHeight = useMemo(() => applyZoom(sankeyHeight), [applyZoom, sankeyHeight]);

  const zoomedNodePadding = useMemo(() => applyZoom(nodePadding), [applyZoom, nodePadding]);

  const clampedLabelSize = useMemo(
    () => clampValue(applyZoom(labelSize), LABEL_SIZE_CONSTRAINTS.MIN, LABEL_SIZE_CONSTRAINTS.MAX),
    [applyZoom, labelSize]
  );

  const styles = useIssueMapStyles(width, height, sankeyWidth, hasFilters);

  return (
    <div className={styles.panel}>
      <div className={styles.headerContainer}>
        <HeaderSection
          filtersComponent={filtersComponent}
          columns={columns}
          moveColumn={moveColumn}
          toggleColumn={toggleColumn}
          zoomComponent={zoomComponent}
          headerData={headerData}
          sankeyWidth={sankeyWidth}
          draggableHeaderStyles={styles.draggableHeader}
        />
      </div>

      <ScrollArea className={styles.scrollArea}>
        <SankeyContent
          visibleColumnsCount={visibleColumnsCount}
          id={id}
          pluginData={pluginData}
          sankeyWidth={sankeyWidth}
          sankeyHeight={zoomedSankeyHeight}
          nodeWidth={nodeWidth}
          nodePadding={zoomedNodePadding}
          labelSize={clampedLabelSize}
        />
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </div>
  );
};

IssueMapComponent.displayName = 'IssueMapComponent';
