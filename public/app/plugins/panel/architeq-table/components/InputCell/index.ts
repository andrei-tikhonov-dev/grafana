import { TableCellDisplayMode } from '@grafana/ui';

import { UpdateDataType } from '../../features/TeamAdminTool/types';

import { InputCell } from './InputCell';

interface InputCellOptions extends Record<string, any> {
  inputOptions?: { validation?: any; handleUpdate?: (data: UpdateDataType) => void };
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
