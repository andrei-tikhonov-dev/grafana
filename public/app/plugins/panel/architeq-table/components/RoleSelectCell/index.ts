import { TableCellDisplayMode } from '@grafana/ui';

import { UpdateDataType } from '../../features/TeamAdminTool/types';

import { RoleSelectCell } from './RoleSelectCell';

interface InputCellOptions extends Record<string, any> {
  inputOptions?: { validation?: any; handleUpdate?: (data: UpdateDataType) => void };
}

export const getRoleSelectCellFieldConfig = (customOptions: InputCellOptions = {}) => {
  return {
    custom: {
      ...customOptions,
      cellOptions: {
        type: TableCellDisplayMode.Custom,
        cellComponent: RoleSelectCell,
      },
    },
  };
};
