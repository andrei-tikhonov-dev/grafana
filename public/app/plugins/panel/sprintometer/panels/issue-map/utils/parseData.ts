import { DataFrame, DataFrameView, Field, getFieldDisplayName } from '@grafana/data';

import { COLOR_ARRAY } from '../constants';
import { MCol0, MColumnData, MPluginDataPath, MPluginDataNode, MRow } from '../types';

export function parseData(data: DataFrame, columnsControl: MColumnData[], { valueField }: { valueField: string }) {
  const columnsOrder = columnsControl.map((column) => column.name);
  const series = sortDataFrameFields(data, columnsOrder);
  const seriesFields = series.fields;
  const numFields = seriesFields.length - 1;
  const hiddenColumns = columnsControl.filter((column) => !column.show).map((column) => column.name);
  const columnNames = getColumnNames(seriesFields);
  const headerData = filterDisplayNames(columnNames, hiddenColumns);
  const valueFieldData = findValueField(data, valueField);
  const frame = new DataFrameView(series);

  const { pluginDataPaths, pluginDataNodes, rows } = processFrame({
    frame,
    seriesFields,
    numFields,
    hiddenColumns,
    valueFieldData,
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

function getDataPathsWithTooltips(pluginDataLinks: MPluginDataPath[], rows: MRow[]): MPluginDataPath[] {
  return pluginDataLinks.map((link) => {
    const row = rows.find((row) => row.name === link.id);
    if (row) {
      return { ...link, tooltip: `${row.display} | ${link.displayValue}` };
    }
    return link;
  });
}

function getColumnNames(fields: Field[]): string[] {
  return fields.map((field) => getFieldDisplayName(field));
}

function filterDisplayNames(displayNames: string[], hiddenColumns: string[]): string[] {
  return displayNames.filter((name) => !hiddenColumns.includes(name));
}

function findValueField(data: DataFrame, valueFieldOption: any): Field | undefined {
  let valueField = data.fields.find((field) => field.name === valueFieldOption);

  if (!valueField) {
    valueField = data.fields.find((field) => field.type === 'number');
  }

  return valueField;
}

function processFrame({
  frame,
  seriesFields,
  numFields,
  hiddenColumns,
  valueFieldData,
}: {
  frame: DataFrameView;
  seriesFields: Field[];
  numFields: number;
  hiddenColumns: string[];
  valueFieldData?: Field;
}) {
  const pluginDataPaths: MPluginDataPath[] = [];
  const pluginDataNodes: MPluginDataNode[] = [];
  const col0: MCol0[] = [];
  const rows: MRow[] = [];

  frame.forEach((row, rowId) => {
    const currentLink: number[] = [];
    let firstVisibleColumnId = 0;

    for (let columnId = 0; columnId < numFields; columnId++) {
      const columnName = getFieldDisplayName(seriesFields[columnId]);
      const value = row[columnId];

      if (hiddenColumns.includes(columnName)) {
        firstVisibleColumnId = columnId + 1;
        continue;
      }

      const { name, tooltip, link } = parseNodeValue(value);

      let index = findNodeIndex(pluginDataNodes, name, columnId);

      if (index === -1) {
        const node: MPluginDataNode = {
          name,
          id: name,
          rowIds: [rowId],
          columnId,
          tooltip,
          columnName,
          link,
        };
        index = addNode(pluginDataNodes, node);
        if (columnId === firstVisibleColumnId) {
          col0.push({ name: name, index, color: assignColor(col0) });
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
        pluginDataPaths,
        rowId,
        rowColor
      );
      rows.push({ name: String(rowId), display: rowDisplay });
    }
  });

  return { pluginDataPaths, pluginDataNodes, rows };
}

type NodeValueDataType = { name: string; tooltip: string; link?: string };

function parseNodeValue(nodeValue: string | NodeValueDataType): NodeValueDataType {
  if (typeof nodeValue === 'object') {
    return { ...nodeValue, link: nodeValue.link };
  }

  return { name: nodeValue, tooltip: nodeValue };
}

function findNodeIndex(pluginDataNodes: MPluginDataNode[], nodeValue: string, columnId: number): number {
  return pluginDataNodes.findIndex((e) => e.name === nodeValue && e.columnId === columnId);
}

function addNode(pluginDataNodes: MPluginDataNode[], node: MPluginDataNode): number {
  return pluginDataNodes.push(node) - 1;
}

function assignColor(col0: any[]): any {
  return COLOR_ARRAY[col0.length % COLOR_ARRAY.length];
}

function findRowColor(col0: any[], currentLink: number[]): any {
  return col0.find((e) => e.index === currentLink[0])?.color;
}

function buildRowDisplay(
  pluginDataNodes: MPluginDataNode[],
  currentLink: number[],
  valueField: Field,
  value: any,
  pluginDataPaths: MPluginDataPath[],
  rowId: number,
  rowColor: any
): string {
  let rowDisplay = `${pluginDataNodes[currentLink[0]]?.name}`;

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
