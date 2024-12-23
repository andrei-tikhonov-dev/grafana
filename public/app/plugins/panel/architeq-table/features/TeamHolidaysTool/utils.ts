import { DataFrame } from '@grafana/data';

import { Cells } from '../../constants';
import { CellCustomOptionsType, OptionType } from '../../types';
import { configureDataFrame, getFieldConfig } from '../../utils';

import { TeamHolidaysToolFields } from './constants';

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
    { fields: [TeamHolidaysToolFields.HolidayDescription], config: getFieldConfig(Cells.Input, { ...options }) },
    { fields: [TeamHolidaysToolFields.HolidayDate], config: getFieldConfig(Cells.Date, { ...options }) },
    { fields: [TeamHolidaysToolFields.TypeOfHoliday], config: getFieldConfig(Cells.Select, { ...typeFieldOptions }) },
  ];

  return configureDataFrame(dataFrame, hiddenFields, handleDelete, fieldConfigs);
}

export function getPayloadIDs(data: DataFrame): { [index: number]: { id?: string } } {
  const idField = data.fields.find((field) => field.name === TeamHolidaysToolFields.Id);

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
