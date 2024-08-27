import { SelectableValue } from '@grafana/data';

export const enum TableType {
  HistoricalData = 'HistoricalData',
  CurrentSprint = 'CurrentSprint',
  SprintPlaning = 'SprintPlaning',
}

export const enum RequestMethod {
  DELETE = 'DELETE',
  PATCH = 'PATCH',
  POST = 'POST',
  PUT = 'PUT',
}

export const enum LoadingMode {
  NONE = '',
  INITIAL = 'initial',
  UPDATE = 'update',
  RESET = 'reset',
}

export const UPDATE_REQUEST_METHOD_OPTIONS: SelectableValue[] = [
  {
    value: RequestMethod.DELETE,
    label: RequestMethod.DELETE,
  },
  {
    value: RequestMethod.PATCH,
    label: RequestMethod.PATCH,
  },
  {
    value: RequestMethod.POST,
    label: RequestMethod.POST,
  },
  {
    value: RequestMethod.PUT,
    label: RequestMethod.PUT,
  },
];
