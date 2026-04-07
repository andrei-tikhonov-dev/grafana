import { DataFrame } from '@grafana/data';

import { Cells } from '../../constants';
import { configureDataFrame, getFieldConfig } from '../../utils';

import { PiNotesFields } from './constants';

export function configData(dataFrame: DataFrame, hiddenFields: string[]): DataFrame {
  const fieldConfigs = [{ fields: [PiNotesFields.Notes], config: getFieldConfig(Cells.TextArea, { align: 'left' }) }];

  return configureDataFrame(dataFrame, hiddenFields, null, fieldConfigs);
}

export function getRowPayloadData(
  dataFrame: DataFrame
): Array<{ id: number; configId: number }> {
  const idField = dataFrame.fields.find((f) => f.name === PiNotesFields.ID);
  const configIdField = dataFrame.fields.find((f) => f.name === PiNotesFields.ConfigId);

  return Array.from({ length: dataFrame.length }, (_, i) => ({
    id: Number(idField?.values[i]),
    configId: Number(configIdField?.values[i]),
  }));
}
