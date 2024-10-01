import { TableCellDisplayMode } from '@grafana/ui';

import { FieldValidationType } from '../../types';

import { InputCell } from './InputCell';

interface InputCellOptions extends Record<string, any> {
  validation?: FieldValidationType[];
}

export const getInputCellFieldConfig = (customOptions: InputCellOptions = {}) => {
  return {
    custom: {
      ...customOptions,
      cellOptions: {
        type: TableCellDisplayMode.Custom,
        cellComponent: InputCell,
      },
    },
  };
};
