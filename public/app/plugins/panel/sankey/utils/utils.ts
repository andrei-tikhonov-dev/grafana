import * as d3Sankey from 'd3-sankey';

import { DataFrame, Field } from '@grafana/data';

import { MARGIN } from '../constants';

export function getContainerSize({
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
    containerHeight: Math.max(minHeight, height - MARGIN.bottom),
    containerWidth: Math.max(minWidth, width - MARGIN.right),
  };
}

export function abbreviate(str: string): string {
  return str
    ?.split(' ')
    .map((w) => w[0].toUpperCase())
    .join('');
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

  // Построим маску из true/false для каждой строки
  const filterMask = Array.from({ length: data.length }, (_, rowIndex) => {
    // Начинаем с предположения, что строка нам подходит (true)
    let included = true;

    // Перебираем каждое поле, которое есть в selectedOptions
    for (const [fieldName, allowedValues] of Object.entries(selectedOptions)) {
      // Если у поля нет выбранных значений, пропустим (фильтра тут нет)
      if (!allowedValues || allowedValues.length === 0) {
        continue;
      }

      // Находим нужное поле в DataFrame
      const field = data.fields.find((f) => f.name === fieldName);
      // Если поля нет или в data нет значения — строку отфильтруем
      if (!field) {
        included = false;
        break;
      }

      // Берём значение ячейки (string или { name: string })
      const cellValue = field.values.get(rowIndex);
      const cellName = typeof cellValue === 'string' ? cellValue : cellValue?.name;

      // Если cellName отсутствует в списке разрешённых значений — строка не проходит
      if (!cellName || !allowedValues.includes(cellName)) {
        included = false;
        break;
      }
    }

    return included;
  });

  // Применяем filterMask для каждого поля
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
