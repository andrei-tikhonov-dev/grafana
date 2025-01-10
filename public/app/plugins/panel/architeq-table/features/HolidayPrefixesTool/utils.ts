import { DataFrame } from '@grafana/data';

import { Cells } from '../../constants';
import { CellCustomOptionsType, OptionType } from '../../types';
import { configureDataFrame, getFieldConfig } from '../../utils';

import { HolidayPrefixesFields } from './constants';

interface ConfigTeamAdminToolData {
  dataFrame: DataFrame;
  handleDelete: (rowIndex: number) => void;
  typeOptions: OptionType[];
  hiddenFields?: string[];
}

export function configTeamHolidaysToolData({
  dataFrame,
  hiddenFields,
  handleDelete,
  typeOptions,
}: ConfigTeamAdminToolData): DataFrame {
  const options: CellCustomOptionsType = {
    align: 'left',
  };
  const typeFieldOptions: CellCustomOptionsType = {
    ...options,
    options: typeOptions,
  };

  const fieldConfigs = [
    { fields: [HolidayPrefixesFields.Prefix], config: getFieldConfig(Cells.Input, { ...options }) },
    { fields: [HolidayPrefixesFields.RelevantForCapacity], config: getFieldConfig(Cells.Checkbox, { ...options }) },
    { fields: [HolidayPrefixesFields.ShowInCalendar], config: getFieldConfig(Cells.Checkbox, { ...options }) },
    { fields: [HolidayPrefixesFields.Type], config: getFieldConfig(Cells.Select, { ...typeFieldOptions }) },
  ];

  return configureDataFrame(dataFrame, hiddenFields, handleDelete, fieldConfigs);
}

export function getPayloadIDs(data: DataFrame): { [index: number]: { id?: string } } {
  const idField = data.fields.find((field) => field.name === HolidayPrefixesFields.Id);

  const length = data.length;

  return Object.fromEntries(
    Array.from({ length }, (_, index) => [
      index,
      {
        id: idField ? String(idField.values.get(index)) : undefined,
      },
    ])
  );
}
