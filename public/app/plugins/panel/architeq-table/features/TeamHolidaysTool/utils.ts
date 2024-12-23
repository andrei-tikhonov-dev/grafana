import { DataFrame } from '@grafana/data';

import { Cells, getFieldConfig, addActionsColumn } from '../../components/cells';
import { removeHiddenFields, updateFieldConfig } from '../../utils';

import { TeamHolidaysToolFields } from './constants';
import { TeamHolidaysToolCreatePayload, TeamHolidaysToolCreateTableType } from './types';

interface ConfigTeamAdminToolData {
  dataFrame: DataFrame;
  handleDelete: (rowIndex: number) => void;
  hiddenFields?: string[];
}
export function configTeamHolidaysToolData({
  dataFrame,
  hiddenFields,
  handleDelete,
}: ConfigTeamAdminToolData): DataFrame {
  const options = {
    align: 'left',
  };

  const fieldConfigs = [
    { fields: [TeamHolidaysToolFields.HolidayDescription], config: getFieldConfig(Cells.Input, { ...options }) },
    { fields: [TeamHolidaysToolFields.HolidayDate], config: getFieldConfig(Cells.Date, { ...options }) },
  ];
  const visibleDataFrame = removeHiddenFields(dataFrame, hiddenFields);
  const dataFrameWithActions = addActionsColumn(visibleDataFrame, handleDelete);
  return fieldConfigs.reduce(
    (configuredData, { fields, config }) => updateFieldConfig(configuredData, fields, config),
    dataFrameWithActions
  );
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

export function mapTeamHolidayToolCreatePayload(
  data: TeamHolidaysToolCreateTableType,
  teamId: string
): TeamHolidaysToolCreatePayload {
  return {
    date: data.date,
    description: data.description,
    teamId,
  };
}
