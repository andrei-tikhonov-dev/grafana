import { DataFrame, FieldConfig, FieldOverrideContext, getFieldDisplayName } from '@grafana/data';
import { TableCellDisplayMode } from '@grafana/ui';

import { addActionsColumn } from '../components/cells';
import { TableType } from '../constants';
import { Capacity, CapacityClass, CellCustomOptionsType, CellType, TeamMember, TeamMemberClass } from '../types';

export function getCircularReplacer() {
  const seen = new WeakSet();
  return (key: string, value: any) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
}

export function printJson(obj: any) {
  return JSON.stringify(obj, getCircularReplacer(), 2);
}

export const getRowIdentifiers = (fieldName: string, dataFrame: DataFrame) => {
  const idField = dataFrame.fields.filter((field) => field.name === fieldName);
  return idField[0]?.values || [];
};

export const getPanelSelectOptions = async (context: FieldOverrideContext) => {
  const options = [];
  if (context && context.data) {
    for (const frame of context.data) {
      for (const field of frame.fields) {
        const name = getFieldDisplayName(field, frame, context.data);
        const value = name;
        options.push({ value, label: name });
      }
    }
  }
  return Promise.resolve(options);
};

export const getTableTypeOptions = async () => {
  return Promise.resolve([
    { label: 'Historical Data', value: TableType.HistoricalData },
    { label: 'Current Sprint', value: TableType.CurrentSprint },
    { label: 'Sprint Planing', value: TableType.SprintPlaning },
    { label: 'Team Admin Tool', value: TableType.TeamAdminTool },
    { label: 'Team Holidays Tool', value: TableType.TeamHolidaysTool },
    { label: 'Total Budget Tool', value: TableType.TotalBudgetTool },
    { label: 'PI Admin Tool', value: TableType.PiAdminTool },
  ]);
};

export function updateFieldConfig(
  dataFrame: DataFrame,
  fieldNames: string[],
  newConfig: Partial<FieldConfig>
): DataFrame {
  const updatedFields = dataFrame.fields.map((field) => {
    if (fieldNames.includes(field.name)) {
      return {
        ...field,
        config: {
          ...field.config,
          ...newConfig,
        },
      };
    }
    return field;
  });

  return {
    ...dataFrame,
    fields: updatedFields,
  };
}

export function wrapTeamMemberField(data: DataFrame, fieldName = 'Team member'): DataFrame {
  return {
    ...data,
    fields: data.fields.map((field: DataFrame['fields'][number]) => {
      if (field.name === fieldName && field.type === 'other') {
        return {
          ...field,
          values: field.values.map((value: TeamMember) => new TeamMemberClass(value)),
        };
      }
      return field;
    }),
  };
}

export function wrapCapacityField(data: DataFrame, fieldName: string): DataFrame {
  return {
    ...data,
    fields: data.fields.map((field: DataFrame['fields'][number]) => {
      if (field.name === fieldName && field.type === 'other') {
        return {
          ...field,
          values: field.values.map((value: Capacity) => new CapacityClass(value)),
        };
      }
      return field;
    }),
  };
}

export function removeHiddenFields(dataFrame: DataFrame, hiddenFields?: string[]): DataFrame {
  return {
    ...dataFrame,
    fields: dataFrame.fields.filter((field) => !hiddenFields?.includes(field.name)),
  };
}

export function convertDateToUI(dateStr: string): string {
  if (!dateStr) {
    return 'No date';
  }
  const date = new Date(dateStr);
  const day = ('0' + date.getDate()).slice(-2);
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

export function convertDateToBE(dateStr?: string): string | null {
  if (!dateStr) {
    return null;
  }
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export const getFieldConfig = (cellComponent: CellType, customOptions: CellCustomOptionsType = {}) => {
  return {
    custom: {
      ...customOptions,
      cellOptions: {
        type: TableCellDisplayMode.Custom,
        cellComponent,
      },
    },
  };
};

export function configureDataFrame(
  dataFrame: DataFrame,
  hiddenFields: string[] | undefined,
  handleDelete: (rowIndex: number) => void,
  fieldConfigs: Array<{ fields: string[]; config: ReturnType<typeof getFieldConfig> }>
): DataFrame {
  const visibleDataFrame = removeHiddenFields(dataFrame, hiddenFields);
  const dataFrameWithActions = addActionsColumn(visibleDataFrame, handleDelete);

  return fieldConfigs.reduce((configuredData, { fields, config }) => {
    return updateFieldConfig(configuredData, fields, config);
  }, dataFrameWithActions);
}

export function generateYearOptions(years = 10) {
  const currentYear = new Date().getFullYear() + 1;

  return Array.from({ length: years }, (_, i) => {
    const year = (currentYear - i).toString();
    return { label: year, value: year };
  });
}

export function getFilterOptions(data: DataFrame, requestedFields: string[]): Record<string, string[]> {
  const result: Record<string, string[]> = {};

  for (const fieldName of requestedFields) {
    const field = data.fields.find((f) => f.name === fieldName);
    result[fieldName] = field ? Array.from(new Set(field.values)).map(String).sort() : [];
  }

  return result;
}

export function joinUrls(baseUrl: string, path: string): string {
  const url = new URL(path, baseUrl);
  return url.toString();
}
