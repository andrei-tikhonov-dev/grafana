import * as d3Sankey from 'd3-sankey';

import { DataFrame, Field } from '@grafana/data';

import { DOUBLE_HEADER_HEIGHT, DRAGGABLE_HEADERS_HEIGHT, SINGLE_HEADER_HEIGHT } from '../constants';

export function getSankeySize({
  width,
  height,
  nodeWidth,
  nodePadding,
  rowsNumber,
  columnsNumber,
}: {
  width: number;
  height: number;
  nodeWidth: number;
  nodePadding: number;
  rowsNumber: number;
  columnsNumber: number;
}) {
  const minWidth = columnsNumber * (nodeWidth + 2 * nodePadding) * 1.5;
  const minHeight = rowsNumber * nodePadding * 1.5;

  return {
    sankeyHeight: Math.max(minHeight, height - 180),
    sankeyWidth: Math.max(minWidth, width - 20),
  };
}

export function getScrollAreaHeigh(panelHeight: number, hasFilters = false): number {
  const headerHeight = hasFilters ? DOUBLE_HEADER_HEIGHT : SINGLE_HEADER_HEIGHT;
  return panelHeight - headerHeight - DRAGGABLE_HEADERS_HEIGHT;
}

const d3Link = d3Sankey.sankeyLinkHorizontal();
export function createD3Link(data: any): string {
  return d3Link(data) as string;
}

export const clampValue = (num: number, lowerLimit: number, upperLimit: number) => {
  return Math.max(lowerLimit, Math.min(num, upperLimit));
};

export function getFilterOptions(field: Field): string[] {
  return Array.from(new Set(field.values.map((value) => (typeof value === 'string' ? value : value.name)))).sort();
}

export function filterData(data: DataFrame, selectedOptions: Record<string, string[]>): DataFrame {
  if (!selectedOptions || Object.keys(selectedOptions).length === 0) {
    return data;
  }

  const filterMask = Array.from({ length: data.length }, (_, rowIndex) => {
    let included = true;

    for (const [fieldName, allowedValues] of Object.entries(selectedOptions)) {
      if (!allowedValues || allowedValues.length === 0) {
        continue;
      }

      const field = data.fields.find((f) => f.name === fieldName);
      if (!field) {
        included = false;
        break;
      }

      const cellValue = field.values[rowIndex];
      const cellName = typeof cellValue === 'string' ? cellValue : cellValue?.name;

      if (!cellName || !allowedValues.includes(cellName)) {
        included = false;
        break;
      }
    }

    return included;
  });

  const filteredFields = data.fields.map((field) => ({
    ...field,
    values: Array.from(field.values).filter((_, index) => filterMask[index]),
  }));

  return {
    ...data,
    length: filterMask.filter(Boolean).length,
    fields: filteredFields,
  };
}

export function getAvailableFilterOptions(filterFields: string[], dataFrame: DataFrame) {
  return filterFields.reduce<Record<string, string[]>>((optionsMap, fieldName) => {
    const field = dataFrame.fields.find((f) => f.name === fieldName);
    optionsMap[fieldName] = field ? getFilterOptions(field) : [];
    return optionsMap;
  }, {});
}

export function getInitialSelectedOptions(
  availableFilterOptions: Record<string, string[]>,
  filterFields: string[],
  initialFilters?: Record<string, string[]>
) {
  if (!initialFilters) {
    return filterFields.reduce((acc, field) => {
      acc[field] = [];
      return acc;
    }, {} as Record<string, string[]>);
  }

  return filterFields.reduce((acc, field) => {
    const availableOptions = availableFilterOptions[field] || [];
    const initialSelectedOptions = initialFilters[field] || [];

    acc[field] = initialSelectedOptions.filter((option) => availableOptions.includes(option));

    return acc;
  }, {} as Record<string, string[]>);
}
