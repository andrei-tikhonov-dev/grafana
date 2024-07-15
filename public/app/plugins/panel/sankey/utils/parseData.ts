import { DataFrame, DataFrameView, Field, getFieldDisplayName, PanelData } from '@grafana/data';
import { COLOR_ARRAY } from '../constants';
import { Col0, ColumnData, PluginDataPath, PluginDataNode, Row, SankeyOptions } from '../types';

function sortDataFrameFields(dataFrame: DataFrame, columnNames: string[]): DataFrame {
  const columnNameToIndex = new Map<string, number>();
  columnNames.forEach((name, index) => {
    columnNameToIndex.set(name, index);
  });

  const sortedFields = dataFrame.fields.map((field) => {
    const columnId = columnNameToIndex.get(field.name) ?? dataFrame.fields.length;
    return { ...field, columnId };
  });

  sortedFields.sort((a, b) => (a.columnId ?? 0) - (b.columnId ?? 0));

  return {
    ...dataFrame,
    fields: sortedFields,
  };
}

export type ParseDataOptions = Pick<SankeyOptions, 'valueField' | 'dataDelimiter' | 'baseUrl'>;
export function parseData(
  data: PanelData,
  columnsControl: ColumnData[],
  { valueField, dataDelimiter, baseUrl }: ParseDataOptions
) {
  const columnsOrder = columnsControl.map((column) => column.name);
  const series = sortDataFrameFields(data.series[0], columnsOrder);
  const seriesFields = series.fields;
  const numFields = seriesFields.length - 1;
  const hiddenColumns = columnsControl.filter((column) => !column.show).map((column) => column.name);
  const columnNames = getDisplayNames(seriesFields);
  const headerData = filterDisplayNames(columnNames, hiddenColumns);
  const valueFieldData = findValueField(data, valueField);
  const frame = new DataFrameView(series);

  const { pluginDataPaths, pluginDataNodes, rows } = processFrame({
    frame,
    seriesFields,
    numFields,
    hiddenColumns,
    dataDelimiter,
    valueFieldData,
    baseUrl,
  });

  return {
    pluginData: {
      links: getDataPathsWithTooltips(pluginDataPaths, rows),
      nodes: pluginDataNodes,
    },
    rowsNumber: rows.length,
    headerData,
  };
}

function getDataPathsWithTooltips(pluginDataLinks: PluginDataPath[], rows: Row[]): PluginDataPath[] {
  return pluginDataLinks.map((link) => {
    const row = rows.find((row) => row.name === link.id);
    if (row) {
      return { ...link, tooltip: `${row.display} | ${link.displayValue}` };
    }
    return link;
  });
}

function getDisplayNames(fields: Field[]): string[] {
  return fields.map((field) => getFieldDisplayName(field));
}

function filterDisplayNames(displayNames: string[], hiddenColumns: string[]): string[] {
  return displayNames.filter((name) => !hiddenColumns.includes(name));
}

function findValueField(data: PanelData, valueFieldOption: any): Field | undefined {
  let valueField = data.series.map((series) => series.fields.find((field) => field.name === valueFieldOption))[0];

  if (!valueField) {
    valueField = data.series.map((series) => series.fields.find((field) => field.type === 'number'))[0];
  }

  return valueField;
}

function processFrame({
  frame,
  seriesFields,
  numFields,
  hiddenColumns,
  dataDelimiter,
  valueFieldData,
  baseUrl,
}: {
  frame: DataFrameView;
  seriesFields: Field[];
  numFields: number;
  hiddenColumns: string[];
  dataDelimiter?: string;
  valueFieldData?: Field;
  baseUrl?: string;
}) {
  const pluginDataLinks: PluginDataPath[] = [];
  const pluginDataNodes: PluginDataNode[] = [];
  const col0: Col0[] = [];
  const rows: Row[] = [];

  let rowId = 0;
  let currentColor;

  frame.forEach((row) => {
    let currentLink: number[] = [];
    for (let columnId = 0; columnId < numFields; columnId++) {
      const columnName = getFieldDisplayName(seriesFields[columnId]);
      const value = row[columnId];

      if (hiddenColumns.includes(columnName)) {
        continue;
      }

      const { name, tooltip, link } = parseNodeValue(value, baseUrl, dataDelimiter);

      let index = findNodeIndex(pluginDataNodes, name, columnId);

      if (index === -1) {
        const node: PluginDataNode = {
          name,
          id: name,
          rowIds: [rowId],
          columnId,
          tooltip,
          columnName,
          link,
        };
        index = addNode(pluginDataNodes, node);
        if (columnId === 0) {
          currentColor = assignColor(col0);
          col0.push({ name: name, index, color: currentColor });
        }
      } else {
        pluginDataNodes[index].rowIds.push(rowId);
      }
      currentLink.push(index);
    }

    if (valueFieldData) {
      const rowColor = findRowColor(col0, currentLink);
      const rowDisplay = buildRowDisplay(
        pluginDataNodes,
        currentLink,
        valueFieldData,
        row[numFields],
        pluginDataLinks,
        rowId,
        rowColor
      );
      rows.push({ name: String(rowId), display: rowDisplay });
    }

    rowId++;
  });

  return { pluginDataPaths: pluginDataLinks, pluginDataNodes, rows };
}

function parseNodeValue(
  nodeValue: string,
  baseUrl = '',
  delimiter = ''
): { name: string; tooltip: string; link: string } {
  const parts = nodeValue.split(delimiter);
  const name = parts[0];
  const tooltip = parts.length > 1 ? parts[1] : name;
  const link = parts.length > 2 ? `${baseUrl}${parts[2]}` : '';

  return { name, tooltip, link };
}

function findNodeIndex(pluginDataNodes: PluginDataNode[], nodeValue: string, columnId: number): number {
  return pluginDataNodes.findIndex((e) => e.name === nodeValue && e.columnId === columnId);
}

function addNode(pluginDataNodes: PluginDataNode[], node: PluginDataNode): number {
  return pluginDataNodes.push(node) - 1;
}

function assignColor(col0: any[]): any {
  return COLOR_ARRAY[col0.length % COLOR_ARRAY.length];
}

function findRowColor(col0: any[], currentLink: number[]): any {
  return col0.find((e) => e.index === currentLink[0])?.color;
}

function buildRowDisplay(
  pluginDataNodes: PluginDataNode[],
  currentLink: number[],
  valueField: Field,
  value: any,
  pluginDataPaths: PluginDataPath[],
  rowId: number,
  rowColor: any
): string {
  let rowDisplay = `${pluginDataNodes[currentLink[0]].name}`;

  for (let i = 0; i < currentLink.length - 1; i++) {
    let displayValue = '';

    if (valueField && valueField.display) {
      const fieldValues = valueField.display(value);
      displayValue = fieldValues.suffix ? `${fieldValues.text} ${fieldValues.suffix}` : fieldValues.text;
    }
    pluginDataPaths.push({
      source: currentLink[i],
      target: currentLink[i + 1],
      value,
      displayValue,
      id: String(rowId),
      rowId,
      color: rowColor,
      node0: currentLink[0],
    });

    rowDisplay = `${rowDisplay} | ${pluginDataNodes[currentLink[i + 1]].name}`;
  }

  return rowDisplay;
}
